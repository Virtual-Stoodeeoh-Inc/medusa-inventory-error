import { model } from "@medusajs/framework/utils";

export const Bundle = model.define("bundle", {
  id: model.id().primaryKey(),
  title: model.text(),
  sku: model.text(),
});
