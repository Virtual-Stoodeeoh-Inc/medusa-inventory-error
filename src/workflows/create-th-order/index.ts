import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createThOrderStep } from "./steps/create-th-order";

export const createThOrderWorkflow = createWorkflow("create-th-order", () => {
  const order = createThOrderStep();

  return new WorkflowResponse(order);
});
