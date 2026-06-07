import { z } from "zod";

export const ctaFormSchema = z.object({
  phone: z.string(),
  email: z.string().email("Email inválido").or(z.literal("")),
  address: z.string(),
});

export type CtaFormValues = z.infer<typeof ctaFormSchema>;
