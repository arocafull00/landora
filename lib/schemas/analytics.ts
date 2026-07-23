import { z } from "zod";

export const analyticsSearchParamsSchema = z.strictObject({
  range: z.enum(["7d", "30d", "90d", "custom"]).default("30d"),
  from: z.iso.date().optional(),
  to: z.iso.date().optional(),
});
