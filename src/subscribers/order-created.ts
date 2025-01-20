import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import type { Order as BaseOrder } from ".medusa/types/query-entry-points";
import { ShipStationClient } from "src/modules/shipstation/client";

type ExtendedOrder = BaseOrder & {
  items: Array<{
    quantity: number;
    product_title: string;
    variant_sku: string;
    unit_price: number;
  }>;
};

type ShipStationItem = {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

const shipStationClient = new ShipStationClient({
  apiKey: process.env.SHIPSTATION_API_KEY,
});

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  // const query = container.resolve(ContainerRegistrationKeys.QUERY);
  // // Todo: showcase display ID on shipstation rather than actual ID
  // const { data: orders } = (await query.graph({
  //   entity: "order",
  //   fields: [
  //     "*",
  //     "items.*",
  //     "items.variant.product.title",
  //     "shipping_address.*",
  //     "billing_address.*",
  //   ],
  //   filters: {
  //     id: data.id,
  //   },
  // })) as { data: ExtendedOrder[] };
  // const order = orders[0];
  // const shipStationItems: ShipStationItem[] = [];
  // order.items.forEach((item) => {
  //   const shipStationItem: ShipStationItem = {
  //     sku: item.variant_sku,
  //     name: item.variant.product.title,
  //     quantity: item.quantity,
  //     unitPrice: item.unit_price,
  //   };
  //   shipStationItems.push(shipStationItem);
  // });
  // await shipStationClient.createOrder({
  //   orderNumber: `M-${order.id}`,
  //   orderDate: new Date().toISOString(),
  //   paymentDate: new Date().toISOString(),
  //   orderStatus: "awaiting_shipment",
  //   customerEmail: order.email,
  //   billTo: {
  //     name: order.billing_address.company,
  //     company: order.billing_address.company,
  //     street1: order.billing_address.address_1,
  //     street2: order.billing_address.address_2,
  //     city: order.billing_address.city,
  //     state: order.billing_address.province,
  //     postalCode: order.billing_address.postal_code,
  //     country: order.billing_address.country_code,
  //     phone: order.billing_address.phone,
  //     residential: true,
  //   },
  //   shipTo: {
  //     name: `${order.shipping_address.first_name} ${order.shipping_address.last_name}`,
  //     company: order.shipping_address.company,
  //     street1: order.shipping_address.address_1,
  //     street2: order.shipping_address.address_2,
  //     city: order.shipping_address.city,
  //     state: order.shipping_address.province,
  //     postalCode: order.shipping_address.postal_code,
  //     country: order.shipping_address.country_code,
  //     phone: order.shipping_address.phone,
  //     residential: false,
  //   },
  //   items: shipStationItems,
  //   amountPaid: order.total,
  //   shippingAmount: 15,
  //   taxAmount: order.tax_total,
  // });
}

export const config: SubscriberConfig = {
  event: `order.placed`,
};
