import { z } from "zod";

export const heroFormSchema = z.object({
  eyebrow: z.string(),
  title: z.string().min(1, "El título es requerido"),
  subtitle: z.string(),
  description: z.string(),
  image: z.string(),
  houseImage: z.string(),
});

export type HeroFormValues = z.infer<typeof heroFormSchema>;
