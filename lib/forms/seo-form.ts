import { z } from "zod";

export const seoFormSchema = z.object({
  title: z.string().max(60, "Máximo 60 caracteres"),
  description: z.string().max(160, "Máximo 160 caracteres"),
});

export type SeoFormValues = z.infer<typeof seoFormSchema>;
