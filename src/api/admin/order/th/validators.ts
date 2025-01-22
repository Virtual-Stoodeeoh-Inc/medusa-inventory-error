import { z } from "zod";

export const PostTHOrderSchema = z.object({
  customerEmail: z.string().email().max(255),
  billing: z.object({
    company: z.string().max(60).min(2),
    first_name: z.string().max(60).min(2),
    last_name: z.string().max(60).min(2),
    address_1: z.string().max(50).min(2),
    address_2: z.string().optional(),
    city: z.string().max(50).min(2),
    province: z.string(),
    postal_code: z.string().max(6).min(5),
    country_code: z.string().max(2).min(2),
    phone: z.string().max(20).min(2),
    email: z.string().email().max(255),
  }),
  shipping: z.object({
    first_name: z.string().max(60).min(2),
    last_name: z.string().max(60).min(2),
    address_1: z.string().max(50).min(2),
    address_2: z.string().optional(),
    city: z.string().max(50).min(2),
    province: z.string(),
    postal_code: z.string().max(6).min(5),
    country_code: z.string().max(2).min(2),
  }),
  items: z
    .array(
      z.object({
        quantity: z.number(),
        sku: z.string(),
      })
    )
    .superRefine((items, ctx) => {
      const seen = new Set();
      for (const item of items) {
        if (seen.has(item.sku)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Duplicate SKU found: ${item.sku}`,
          });
        }
        seen.add(item.sku);
      }
    }),
});
