import BundleModule from "../modules/bundle";
import ProductModule from "@medusajs/medusa/product";
import { defineLink } from "@medusajs/framework/utils";

export default defineLink(
  {
    linkable: ProductModule.linkable.product,
    isList: true,
  },
  BundleModule.linkable.bundle,
  {
    database: {
      extraColumns: {
        metadata: {
          type: "json",
        },
      },
    },
  }
);
