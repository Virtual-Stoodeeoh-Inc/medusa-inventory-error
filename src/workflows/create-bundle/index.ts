import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createBundleStep } from "./steps/create-bundle";

export type CreateBundleInput = {
  title: string;
};

export const createBundleWorkflow = createWorkflow(
  "create-bundle",
  (input: CreateBundleInput) => {
    const bundle = createBundleStep(input);

    return new WorkflowResponse(bundle);
  }
);
