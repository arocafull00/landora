import { z } from "zod";
import { contactContentSchema } from "@/lib/schemas/company-details";

export const landingContentSchema = z.record(z.string().trim().min(1).max(80), z.unknown())
  .refine((value) => ["hero", "contact", "brand", "nav", "stats", "testimonials", "appearance", "enabledPages"].every((key) => key in value), "Missing landing content")
  .refine((value) => JSON.stringify(value).length <= 1_000_000, "Landing content too large")
  .transform((value, ctx): Record<string, unknown> | typeof z.NEVER => {
    const contact = contactContentSchema.safeParse(value.contact);
    if (!contact.success) {
      ctx.addIssue({ code: "custom", message: "Invalid company contact" });
      return z.NEVER;
    }
    return { ...value, contact: contact.data };
  });
