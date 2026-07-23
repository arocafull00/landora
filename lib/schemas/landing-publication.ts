import { z } from "zod";
import { heroVariantSchema } from "@/lib/schemas/landing-save";

export const publishedLandingContentSchema = z
  .record(z.string().trim().min(1).max(80), z.unknown())
  .refine(
    (value) =>
      [
        "hero",
        "contact",
        "brand",
        "nav",
        "stats",
        "testimonials",
        "appearance",
        "enabledPages",
      ].every((key) => key in value),
    "Missing published landing content",
  )
  .refine(
    (value) => JSON.stringify(value).length <= 1_000_000,
    "Published landing content too large",
  );

export const publishedLandingSeoSchema = z.strictObject({
  title: z.string().trim().max(200),
  description: z.string().trim().max(500),
  favicon: z.union([z.url().max(2048), z.literal("")]),
  socialImage: z.union([z.url().max(2048), z.literal("")]),
});

export const publishedLandingSectionSelectionsSchema = z.strictObject({
  hero: heroVariantSchema,
});

export const publishLandingVersionSchema = z.strictObject({
  landingId: z.uuid(),
  userId: z.uuid(),
  createdBy: z.string().trim().min(1).max(255),
  template: z.enum([
    "velar",
    "studio",
    "portfolio",
    "ristorante",
    "floristeria",
    "oficio-pro",
    "coffee-shop",
  ]),
  name: z.string().trim().min(1).max(120),
  slug: z.string().trim().min(1).max(120),
  content: publishedLandingContentSchema,
  seo: publishedLandingSeoSchema,
  sectionSelections: publishedLandingSectionSelectionsSchema,
});

export const restoreLandingVersionSchema = z.strictObject({
  landingId: z.uuid(),
  versionId: z.uuid(),
});

export type PublishLandingVersionInput = z.infer<
  typeof publishLandingVersionSchema
>;
export type PublishedLandingSeo = z.infer<typeof publishedLandingSeoSchema>;
export type PublishedLandingSectionSelections = z.infer<
  typeof publishedLandingSectionSelectionsSchema
>;
