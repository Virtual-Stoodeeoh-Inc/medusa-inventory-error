import {
  defineMiddlewares,
  validateAndTransformBody,
} from "@medusajs/framework/http";
import { PostTHOrderSchema } from "./admin/order/th/validators";
import { PostTHOrderMarkShippedSchema } from "./admin/order/th/mark-shipped/validators";

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/order/th",
      method: "POST",
      middlewares: [validateAndTransformBody(PostTHOrderSchema)],
    },
    {
      matcher: "/admin/order/th/mark-shipped",
      method: "POST",
      middlewares: [validateAndTransformBody(PostTHOrderMarkShippedSchema)],
    },
  ],
});
