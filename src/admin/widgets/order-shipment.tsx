// import { defineWidgetConfig } from "@medusajs/admin-sdk";
// import { Button, Container, Select, clx } from "@medusajs/ui";
// import { ArrowPath } from "@medusajs/icons";

// const OrderShipmentWidget = () => {
//   return (
//     <div className="flex flex-col gap-y-3">
//       <Container className={clx("p-0 overflow-hidden border border-blue-400")}>
//         <div className="py-4 px-4 flex w-full gap-3">
//           <Select value="FedEx Express Saver">
//             <Select.Trigger>
//               <Select.Value placeholder="Select Service" />
//             </Select.Trigger>
//             <Select.Content>
//               <Select.Item value="FedEx Express Saver">
//                 FedEx Express Saver
//               </Select.Item>
//             </Select.Content>
//           </Select>
//           <Select value="FedEx One Rate Pak">
//             <Select.Trigger>
//               <Select.Value placeholder="Select Package" />
//             </Select.Trigger>
//             <Select.Content>
//               <Select.Item value="FedEx One Rate Pak">
//                 FedEx One Rate Pak
//               </Select.Item>
//             </Select.Content>
//           </Select>
//         </div>
//         <div className="flex flex-col bg-gray-100">
//           <div className="flex justify-between p-4 items-center">
//             <div className="flex items-center gap-x-4">
//               <span>
//                 <img
//                   className="bg-white rounded-md"
//                   width={50}
//                   height={50}
//                   src="https://logos.shipstation.com/ipaas/carriers/fedex/icon.svg"
//                   alt=""
//                 />
//               </span>
//               <div className="flex flex-col gap-y-1/2">
//                 <span className="flex gap-x-2 items-center">
//                   <span className="font-semibold text-lg">$13.99</span>
//                   <ArrowPath className="mb-0.5 cursor-pointer" />
//                 </span>
//                 <span className="text-sm font-medium cursor-pointer text-blue-400">
//                   View Cost Review
//                 </span>
//               </div>
//             </div>
//             <Button variant="secondary" size="large">
//               Create + Print Label
//             </Button>
//           </div>
//           <div className="flex justify-between px-4 py-2 border-t border-gray-300 text-sm">
//             <span className="font-semibold">Estimated Delivery:</span>
//             <span>Friday, 12th Feb, 2024 at 12:00 PM</span>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export const config = defineWidgetConfig({
//   zone: "order.details.side.before",
// });

// export default OrderShipmentWidget;
