import { z } from "zod";

const imageReferenceSchema = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => {
    if (!value || value.startsWith("/")) return true;

    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  }, "Selecciona una imagen válida");

export const portfolioAboutPageSchema = z.strictObject({
  title: z.string().trim().min(1, "Escribe un título").max(120),
  intro: z.string().trim().max(1200),
  image: imageReferenceSchema,
  storyTitle: z.string().trim().min(1, "Escribe un título").max(120),
  storyBody: z.string().trim().max(5000),
  storyImage: imageReferenceSchema,
});
