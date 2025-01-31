import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import {
  createOrderFulfillmentWorkflow,
  createOrderShipmentWorkflow,
} from "@medusajs/medusa/core-flows";
import { z } from "zod";
import { PostTHOrderMarkShippedSchema } from "./validators";

type PostTHOrderMarkShippedType = z.infer<typeof PostTHOrderMarkShippedSchema>;

export async function POST(
  req: MedusaRequest<PostTHOrderMarkShippedType>,
  res: MedusaResponse
): Promise<void> {
  try {
    const { order_id, tracking_number, tracking_url, label_url, location_id } =
      req.body;

    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

    const { data: orders } = await query.graph({
      entity: "order",
      fields: ["*", "items.*", "shipping_address.*"],
      filters: {
        id: order_id,
      },
    });

    const order = orders[0];

    const items = order.items.map((item) => {
      return {
        id: item.id,
        title: item.variant_title,
        sku: item.variant_sku,
        barcode: item.variant_barcode || "",
        quantity: item.quantity,
        variant_id: item.variant_id,
        line_item_id: item.id,
      };
    });

    await createOrderFulfillmentWorkflow(req.scope).run({
      input: {
        location_id,
        items,
        order_id: order.id,
      },
    });

    const { data: updatedOrders } = await query.graph({
      entity: "order",
      fields: ["fulfillments.*"],
      filters: {
        id: order_id,
      },
    });

    const updatedOrder = updatedOrders[0];

    const { result: shipment } = await createOrderShipmentWorkflow(
      req.scope
    ).run({
      input: {
        order_id: updatedOrder.id,
        fulfillment_id: updatedOrder.fulfillments[0].id,
        items: updatedOrder.items,
        labels: [
          {
            tracking_number,
            tracking_url: tracking_url || "",
            label_url: label_url || "",
          },
        ],
      },
    });

    res.json({
      shipment,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
