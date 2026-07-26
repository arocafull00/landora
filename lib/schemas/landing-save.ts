import { z } from "zod";
import { LANDING_SECTION_KEYS } from "@/lib/landing-save-payload";

const contentSchema = z
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
      ].every(
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

const metaSchema = z.strictObject({
  name: z.string().trim().min(1).max(120),
  slug: z.string().trim().min(1).max(120),
});

const seoSchema = z.strictObject({
  title: z.string().trim().max(200),
  description: z.string().trim().max(500),
  favicon: z.union([z.url().max(2048), z.literal("")]),
  socialImage: z.union([z.url().max(2048), z.literal("")]),
});

const appearanceSchema = z.strictObject({
  paletteId: z.string().trim().min(1).max(40),
  typographyId: z.string().trim().min(1).max(40),
});

const sectionKeySchema = z.enum(LANDING_SECTION_KEYS);
const sectionBodySchema = z.record(
  z.string().trim().min(1).max(80),
  z.unknown(),
);
const sectionPayloadsSchema = z
  .partialRecord(sectionKeySchema, sectionBodySchema)
  .refine(
    (value) => JSON.stringify(value).length <= 1_000_000,
    "Landing sections too large",
  );

const changesSchema = z.strictObject({
  meta: metaSchema.optional(),
  seo: seoSchema.optional(),
  appearance: appearanceSchema.optional(),
  heroVariant: heroVariantSchema.optional(),
  sections: sectionPayloadsSchema.optional(),
});

const changedScopesSchema = z.strictObject({
  meta: z.literal(true).optional(),
  seo: z.literal(true).optional(),
  appearance: z.literal(true).optional(),
  heroVariant: z.literal(true).optional(),
  sections: z
    .array(sectionKeySchema)
    .max(LANDING_SECTION_KEYS.length)
    .refine(
      (sections) => new Set(sections).size === sections.length,
      "Duplicate landing sections",
    )
    .optional(),
});

const publicationSchema = z.strictObject({
  meta: metaSchema,
  seo: seoSchema,
  content: contentSchema,
  appearance: appearanceSchema,
  heroVariant: heroVariantSchema,
});

const saveDraftSchema = z.strictObject({
  landingId: z.uuid(),
  mode: z.literal("draft"),
  changes: changesSchema,
});

const publishSchema = z.strictObject({
  landingId: z.uuid(),
  mode: z.literal("publish"),
  changes: changedScopesSchema,
  publication: publicationSchema,
});

export const saveLandingSchema = z.discriminatedUnion("mode", [
  saveDraftSchema,
  publishSchema,
]);

export type SaveLandingInput = z.infer<typeof saveLandingSchema>;
