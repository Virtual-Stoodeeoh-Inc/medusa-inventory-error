import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { z } from "zod";
import {
  ContainerRegistrationKeys,
  Modules,
  QueryContext,
} from "@medusajs/framework/utils";
import { PostTHOrderSchema } from "./validators";
import {
  completeCartWorkflow,
  createPaymentCollectionForCartWorkflow,
  createPaymentSessionsWorkflow,
  updateTaxLinesWorkflow,
} from "@medusajs/core-flows";
import type { Cart, ProductVariant } from ".medusa/types/query-entry-points";

type ExtendedVariant = ProductVariant & {
  calculated_price: {
    calculated_amount: number;
  };
};

type ExtendedCart = Cart & {
  items: Array<{
    quantity: number;
    id: string;
    product_id: string;
    unit_price: number;
  }>;
};

type PostTHOrderType = z.infer<typeof PostTHOrderSchema>;

export async function POST(
  req: MedusaRequest<PostTHOrderType>,
  res: MedusaResponse
): Promise<void> {
  try {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

    const customerModuleService = req.scope.resolve(Modules.CUSTOMER);
    const cartModuleService = req.scope.resolve(Modules.CART);

    const {
      billing,
      shipping,
      items,
      customerEmail,
      region_id,
      sales_channel_id,
    } = req.validatedBody;

    let customerId = "";
    const customer = await customerModuleService.listCustomers({
      email: customerEmail,
    });

    if (customer.length === 0) {
      const customerData = {
        email: customerEmail,
        first_name: billing.first_name,
        last_name: billing.last_name,
        phone: billing.phone,
        company: billing.company,
      };

      const customer = await customerModuleService.createCustomers(
        customerData
      );
      customerId = customer.id;
    } else {
      customerId = customer[0].id;
    }

    const { data: variants } = (await query.graph({
      entity: "product_variant",
      fields: ["*", "calculated_price.*", "product.*"],
      filters: {
        sku: items.map((item) => item.sku),
      },
      context: {
        calculated_price: QueryContext({
          region_id: region_id,
          currency_code: "usd",
        }),
      },
    })) as { data: ExtendedVariant[] };

    if (variants.length !== items.length) {
      throw new Error("Variants and items length do not match");
    }

    const cart = await cartModuleService.createCarts({
      region_id: region_id,
      currency_code: "USD",
      items: items.map((item) => {
        const variant = variants.find((variant) => variant.sku === item.sku);

        return {
          quantity: item.quantity,
          title: variant.product.title,
          product_id: variant.product.id,
          product_title: variant.product.title,
          variant_sku: variant.sku,
          variant_title: variant.title,
          variant_id: variant.id,
          unit_price: variant.calculated_price.calculated_amount,
        };
      }),
      shipping_address: shipping,
      billing_address: billing,
      sales_channel_id: sales_channel_id,
      customer_id: customerId,
      email: customerEmail,
    });

    await updateTaxLinesWorkflow(req.scope).run({
      input: {
        cart_id: cart.id,
      },
    });

    await cartModuleService.addShippingMethods({
      name: "AccuHealth Free",
      cart_id: cart.id,
      amount: 0,
    });

    await createPaymentCollectionForCartWorkflow(req.scope).run({
      input: {
        cart_id: cart.id,
      },
    });

    const { data: updatedCarts } = (await query.graph({
      entity: "cart",
      fields: ["id", "payment_collection.id", "payment_collection.amount"],
      filters: {
        id: cart.id,
      },
    })) as { data: ExtendedCart[] };

    await createPaymentSessionsWorkflow(req.scope).run({
      input: {
        payment_collection_id: updatedCarts[0].payment_collection.id,
        provider_id: "pp_system_default",
      },
    });

    const { result: order } = await completeCartWorkflow(req.scope).run({
      input: {
        id: cart.id,
      },
    });

    res.json({
      order,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
