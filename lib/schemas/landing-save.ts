import { z } from "zod";

const contentSchema = z
  .record(z.string().trim().min(1).max(80), z.unknown())
  .refine(
    (value) =>
      ["hero", "contact", "brand", "nav", "stats", "testimonials", "appearance"].every(
        (key) => key in value,
      ),
    "Missing landing content",
  )
  .refine((value) => JSON.stringify(value).length <= 1_000_000, "Landing content too large");

export const heroVariantSchema = z.enum([
  "velar",
  "studio",
  "portfolio",
  "ristorante",
  "floristeria",
  "oficio-pro",
  "coffee-shop",
  "lumen",
  "offset",
  "mosaico",
]);

export const saveLandingSchema = z.strictObject({
  landingId: z.uuid(),
  mode: z.enum(["draft", "publish"]),
  meta: z.strictObject({
    name: z.string().trim().min(1).max(120),
    slug: z.string().trim().min(1).max(120),
    seoTitle: z.string().trim().max(200),
    seoDescription: z.string().trim().max(500),
    seoFavicon: z.union([z.url().max(2048), z.literal("")]),
  }),
  content: contentSchema,
  appearance: z.strictObject({
    paletteId: z.string().trim().min(1).max(40),
    typographyId: z.string().trim().min(1).max(40),
  }),
  heroVariant: heroVariantSchema,
});

export type SaveLandingInput = z.infer<typeof saveLandingSchema>;
