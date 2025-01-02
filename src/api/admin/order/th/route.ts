import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
// import { Modules } from "@medusajs/framework/utils";

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  //   const order = await orderModuleService.createOrders({
  //     currency_code: "USD",
  //     items: [
  //       {
  //         quantity: 1,
  //         title: "BP01",
  //         unit_price: 70,
  //       },
  //     ],
  //     shipping_methods: [
  //       {
  //         name: "Express shipping",
  //         amount: 35,
  //       },
  //     ],
  //   });

  console.log(req.body);

  res.json({ done: req.body });
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
