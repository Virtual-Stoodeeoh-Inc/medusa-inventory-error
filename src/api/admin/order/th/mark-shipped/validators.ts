import { z } from "zod";

export const PostTHOrderMarkShippedSchema = z.object({
  order_id: z.string().max(255),
  tracking_number: z.string().max(255),
  tracking_url: z.string().max(255),
  label_url: z.string().max(255),
  location_id: z.string().max(255),
});
