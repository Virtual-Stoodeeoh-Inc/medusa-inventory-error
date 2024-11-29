import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { BUNDLE_MODULE } from "../../../modules/bundle";
import BundleModuleService from "../../../modules/bundle/service";

export type CreateBundleStepInput = {
  title: string;
};

export const createBundleStep = createStep(
  "create-bundle-step",
  async (input: CreateBundleStepInput, { container }) => {
    const bundleModuleService: BundleModuleService =
      container.resolve(BUNDLE_MODULE);

    const bundle = await bundleModuleService.createBundles(input);

    return new StepResponse(bundle, bundle.id);
  },
  async (id: string, { container }) => {
    const brandModuleService: BundleModuleService =
      container.resolve(BUNDLE_MODULE);

    await brandModuleService.deleteBundles(id);
  }
);
