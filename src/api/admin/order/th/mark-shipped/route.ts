// import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
// import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
// import { createFulfillmentWorkflow } from "@medusajs/medusa/core-flows";

// export async function POST(
//   req: MedusaRequest,
//   res: MedusaResponse
// ): Promise<void> {
//   try {
//     const { order_id } = req.body;

//     const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
//     const fulfillmentModuleService = req.scope.resolve(Modules.FULFILLMENT);
//     const orderModuleService = req.scope.resolve(Modules.ORDER);

//     fulfillmentModuleService.createFulfillment;

//     const { data: orders } = await query.graph({
//       entity: "order",
//       fields: ["*", "items.*", "shipping_address.*"],
//       filters: {
//         id: order_id,
//       },
//     });

//     const order = orders[0];

//     const items = order.items.map((item) => {
//       return {
//         id: item.id,
//         title: item.variant_title,
//         sku: item.variant_sku,
//         barcode: item.variant_barcode || "",
//         quantity: item.quantity,
//         variant_id: item.variant_id,
//         line_item_id: item.id,
//       };
//     });

//     const { result } = await createFulfillmentWorkflow(req.scope).run({
//       input: {
//         location_id: "sloc_01JDMXVBHNTXBEJX4344AQM32X",
//         provider_id: "manual_manual",
//         delivery_address: order.shipping_address,
//         items,
//         order: {
//           id: order.id,
//         },
//       },
//     });

//     orderModuleService.registerFulfillment({
//       order_id: order.id,
//       items,
//     });

//     res.json({
//       order,
//       items,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// }
