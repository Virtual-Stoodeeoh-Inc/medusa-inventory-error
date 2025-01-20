// import { defineWidgetConfig } from "@medusajs/admin-sdk";
// import {
//   Button,
//   Container,
//   Heading,
//   Input,
//   Select,
//   Table,
//   clx,
// } from "@medusajs/ui";
// import { XMark } from "@medusajs/icons";
// import { useState } from "react";

// type OrderIMEI = {
//   imei: string;
//   sku: string;
// };

// const fakeData: OrderIMEI[] = [
//   {
//     imei: "355-09-2345678",
//     sku: "SHIRT-S-BLACK",
//   },
//   {
//     imei: "355-09-2345678",
//     sku: "SHIRT-S-BLACK",
//   },
// ];

// const skus = [
//   {
//     value: "BP01",
//     label: "BP01",
//   },
//   {
//     value: "U8029",
//     label: "U8029",
//   },
//   {
//     value: "G427B",
//     label: "G427B",
//   },
// ];

// const OrderIMEIWidget = () => {
//   const [imei, setImei] = useState("");
//   const [sku, setSku] = useState("");

//   const [imeiList, setImeiList] = useState<OrderIMEI[]>([]);

//   return (
//     <div className="flex flex-col gap-y-3">
//       <Container className={clx("flex flex-col p-0 overflow-hidden")}>
//         <div className="flex items-center justify-between py-4 pl-6 pr-4">
//           <div className="flex items-center gap-x-2">
//             <Heading level="h2">Associate IMEI(s)</Heading>
//             <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-md px-2 py-1">
//               2 / 4
//             </span>
//           </div>
//           <Button size="small" variant="secondary">
//             Export List
//           </Button>
//         </div>
//         <div>
//           <Table>
//             <Table.Header>
//               <Table.Row>
//                 <Table.HeaderCell>#</Table.HeaderCell>
//                 <Table.HeaderCell>IMEI</Table.HeaderCell>
//                 <Table.HeaderCell>SKU</Table.HeaderCell>
//                 <Table.HeaderCell className="text-right">
//                   Action
//                 </Table.HeaderCell>
//               </Table.Row>
//             </Table.Header>
//             <Table.Body>
//               {fakeData.map((order, i) => {
//                 return (
//                   <Table.Row
//                     key={order.imei}
//                     className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap"
//                   >
//                     <Table.Cell>{i + 1}</Table.Cell>
//                     <Table.Cell>{order.imei}</Table.Cell>
//                     <Table.Cell>{order.sku}</Table.Cell>
//                     <Table.Cell className="text-right">
//                       <div className="flex justify-end">
//                         <XMark />
//                       </div>
//                     </Table.Cell>
//                   </Table.Row>
//                 );
//               })}
//             </Table.Body>
//           </Table>
//           <div className="py-4 px-4 flex w-full gap-3">
//             <div className="w-2/6">
//               <Select>
//                 <Select.Trigger>
//                   <Select.Value placeholder="Select SKU" />
//                 </Select.Trigger>
//                 <Select.Content>
//                   {skus.map((item) => (
//                     <Select.Item key={item.value} value={item.value}>
//                       {item.label}
//                     </Select.Item>
//                   ))}
//                 </Select.Content>
//               </Select>
//             </div>
//             <div className="w-4/6">
//               <Input placeholder="Enter Or Scan IMEI" id="sales-channel-name" />
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export const config = defineWidgetConfig({
//   zone: "order.details.side.before",
// });

// export default OrderIMEIWidget;
