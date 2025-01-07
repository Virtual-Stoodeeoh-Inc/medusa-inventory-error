import {
  defineMiddlewares,
  validateAndTransformBody,
} from "@medusajs/framework/http";
import { PostTHOrderSchema } from "./admin/order/th/validators";

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/order/th",
      method: "POST",
      middlewares: [validateAndTransformBody(PostTHOrderSchema)],
    },
  ],
});
