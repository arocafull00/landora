import { z } from "zod";
import { landingContentSchema } from "@/lib/schemas/landing-content";
import { templateIdSchema } from "@/lib/schemas/template";
import { getTemplateContentSchema } from "@/lib/templates/content";
import {
  galleryVariantSchema,
  heroVariantSchema,
} from "@/lib/schemas/landing-save";

export const publishedLandingContentSchema = landingContentSchema;

export const publishedLandingSeoSchema = z.strictObject({
  title: z.string().trim().max(200),
  description: z.string().trim().max(500),
  favicon: z.union([z.url().max(2048), z.literal("")]),
  socialImage: z.union([z.url().max(2048), z.literal("")]),
});

export const publishedLandingSectionSelectionsSchema = z.strictObject({
  hero: heroVariantSchema,
  gallery: galleryVariantSchema.default("grid"),
});

export const publishLandingVersionSchema = z.strictObject({
  landingId: z.uuid(),
  userId: z.uuid(),
  createdBy: z.string().trim().min(1).max(255),
  template: templateIdSchema,
  name: z.string().trim().min(1).max(120),
  slug: z.string().trim().min(1).max(120),
  content: publishedLandingContentSchema,
  seo: publishedLandingSeoSchema,
  sectionSelections: publishedLandingSectionSelectionsSchema,
}).transform((value, ctx) => {
  const content = getTemplateContentSchema(value.template).safeParse(value.content);
  if (!content.success) {
    ctx.addIssue({ code: "custom", path: ["content"], message: "Invalid template content" });
    return z.NEVER;
  }
  return { ...value, content: content.data };
});

export const restoreLandingVersionSchema = z.strictObject({
  landingId: z.uuid(),
  versionId: z.uuid(),
});

export type PublishLandingVersionInput = z.input<
  typeof publishLandingVersionSchema
>;
export type PublishedLandingSeo = z.infer<typeof publishedLandingSeoSchema>;
export type PublishedLandingSectionSelections = z.infer<
  typeof publishedLandingSectionSelectionsSchema
>;
