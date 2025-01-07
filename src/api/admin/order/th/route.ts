import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { z } from "zod";
import { Modules } from "@medusajs/framework/utils";
import { PostTHOrderSchema } from "./validators";

type PostTHOrderType = z.infer<typeof PostTHOrderSchema>;

export async function POST(
  req: MedusaRequest<PostTHOrderType>,
  res: MedusaResponse
): Promise<void> {
  const orderModuleService = req.scope.resolve(Modules.ORDER);
  // const productModuleService = req.scope.resolve(Modules.PRODUCT);
  const customerModuleService = req.scope.resolve(Modules.CUSTOMER);

  const { billing, shipping, items, customerEmail } = req.validatedBody;

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

    const customer = await customerModuleService.createCustomers(customerData);
    customerId = customer.id;
  } else {
    customerId = customer[0].id;
  }

  const order = await orderModuleService.createOrders({
    currency_code: "USD",
    email: customerEmail,
    items: [
      {
        quantity: items[0].quantity,
        title: "BP01 - Blood Pressure Monitor",
        product_id: "prod_01JGPM7QQC5MJYFD5X50F9JGFF",
        product_title: "BP01 - Blood Pressure Monitor",
        variant_sku: "bp01-bundle",
        variant_title: "BP01 - Bundle",
        variant_id: "variant_01JGPM7R0KRMM2M3Q4X0A2ZGZB",
        unit_price: 70,
      },
    ],
    customer_id: customerId,
    sales_channel_id: "sc_01JDJ2MV25C0XSPM15QY56T9SA",
    shipping_methods: [
      {
        name: "Express Shipping",
        shipping_option_id: "so_01JDTGH4BJ47D1212NKH4XPB07",
        amount: 12,
      },
    ],
    shipping_address: shipping,
    billing_address: billing,
  });

  res.json(order);
}

// export async function DELETE(
//   req: MedusaRequest,
//   res: MedusaResponse
// ): Promise<void> {
//   const orderModuleService = req.scope.resolve(Modules.ORDER);

//   const order = await orderModuleService.deleteOrders([
//     "order_01JDTFCV24Y55S7D4H0G423B9F",
//   ]);

//   res.json(order);
// }
