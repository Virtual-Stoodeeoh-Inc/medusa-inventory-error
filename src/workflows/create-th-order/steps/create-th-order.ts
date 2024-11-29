import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules } from "@medusajs/framework/utils";

export const createThOrderStep = createStep(
  "create-th-order-step",
  async ({ container }) => {
    const orderModuleService = container.resolve(Modules.ORDER);

    const order = await orderModuleService.createOrders({
      email: "sifatdipta@gmail.com",
      currency_code: "USD",
      items: [
        {
          variant_sku: "bp01",
          quantity: 1,
          title: "BP01",
          unit_price: 70,
        },
      ],
    });

    return new StepResponse("order", order);
  }
);
