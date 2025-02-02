// import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
// import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { deleteReservationsWorkflow } from "@medusajs/medusa/core-flows";

// export default async function orderFulfillmentCreatedHandler({
//   event: { data },
//   container,
// }: SubscriberArgs<{ order_id: string }>) {
//   const query = container.resolve(ContainerRegistrationKeys.QUERY);
//   const inventoryModuleService = container.resolve(Modules.INVENTORY);

//   const { data: orders } = await query.graph({
//     entity: "order",
//     fields: [
//       "id",
//       "items.id",
//       "items.quantity",
//       "items.variant.id",
//       "items.variant.inventory_items.id",
//     ],
//     filters: {
//       id: data.order_id,
//     },
//   });

//   const order = orders[0];
//   if (!order) {
//     return;
//   }

//   for (const item of order.items) {
//     const reservations = await inventoryModuleService.listReservationItems({
//       line_item_id: item.id,
//     });

//     const reservationIds = reservations.map((reservation) => reservation.id);

//     await deleteReservationsWorkflow(container).run({
//       input: {
//         ids: reservationIds,
//       },
//     });
//   }
// }

// export const config: SubscriberConfig = {
//   event: `order.fulfillment_created`,
// };
