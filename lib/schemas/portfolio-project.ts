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

const externalLinkSchema = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => {
    if (!value) return true;

    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  }, "Introduce una URL válida");

const projectSlugSchema = z
  .string()
  .trim()
  .max(80)
  .refine(
    (value) => !value || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value),
    "Usa minúsculas, números y guiones",
  );

export const projectLinkTypeSchema = z.enum([
  "none",
  "internal",
  "external",
]);

export function createPortfolioProjectPageSchema(
  usedSlugs: readonly string[] = [],
) {
  return z
    .strictObject({
      image: imageReferenceSchema,
      title: z.string().trim().min(1, "Escribe un título").max(120),
      description: z.string().trim().max(500),
      tags: z.array(z.string().trim().min(1).max(40)).max(10),
      projectSlug: projectSlugSchema.min(1, "Escribe una URL"),
      projectBody: z.string().trim().max(10_000),
      projectGallery: z.array(imageReferenceSchema).max(12),
    })
    .superRefine((value, context) => {
      if (!usedSlugs.includes(value.projectSlug)) return;
      context.addIssue({
        code: "custom",
        message: "La URL del proyecto ya está en uso",
        path: ["projectSlug"],
      });
    });
}

export const portfolioProjectPageSchema = createPortfolioProjectPageSchema();

const portfolioGalleryItemSchema = z
  .strictObject({
    id: z.string().optional(),
    image: imageReferenceSchema.optional().default(""),
    video: imageReferenceSchema.optional().default(""),
    title: z.string().trim().max(120).optional().default(""),
    description: z.string().trim().max(500).optional().default(""),
    tags: z.array(z.string().trim().min(1).max(40)).max(10).optional().default([]),
    link: externalLinkSchema.optional().default(""),
    linkType: projectLinkTypeSchema.optional(),
    projectSlug: projectSlugSchema.optional().default(""),
    projectBody: z.string().trim().max(10_000).optional().default(""),
    projectGallery: z.array(imageReferenceSchema).max(12).optional().default([]),
  })
  .transform((item) => ({
    ...item,
    linkType: item.linkType ?? (item.link ? "external" as const : "none" as const),
  }))
  .superRefine((item, context) => {
    if (item.linkType === "internal" && !item.title) {
      context.addIssue({
        code: "custom",
        message: "Los proyectos internos necesitan un título",
        path: ["title"],
      });
    }
    if (item.linkType === "internal" && !item.projectSlug) {
      context.addIssue({
        code: "custom",
        message: "Los proyectos internos necesitan una URL",
        path: ["projectSlug"],
      });
    }
    if (item.linkType === "external" && !item.link) {
      context.addIssue({
        code: "custom",
        message: "Los enlaces externos necesitan una URL",
        path: ["link"],
      });
    }
  });

export const portfolioGallerySchema = z
  .array(portfolioGalleryItemSchema)
  .max(50)
  .superRefine((items, context) => {
    const seen = new Set<string>();
    items.forEach((item, index) => {
      if (item.linkType !== "internal") return;
      if (seen.has(item.projectSlug)) {
        context.addIssue({
          code: "custom",
          message: "La URL del proyecto ya está en uso",
          path: [index, "projectSlug"],
        });
      }
      seen.add(item.projectSlug);
    });
  });

export type PortfolioProjectPageFormValues = z.infer<
  typeof portfolioProjectPageSchema
>;
