import { landingContentSchema } from "@/lib/schemas/landing-content";
import { z } from "zod";
import { nuvoletsContentSchema } from "@/lib/schemas/nuvolets";
import { LANDING_SECTION_KEYS } from "@/lib/landing-save-payload";
import { contactContentSchema } from "@/lib/schemas/company-details";

export const heroVariantSchema = z.enum([
  "nuvolets",
  "velar",
  "studio",
  "portfolio",
  "floristeria",
  "oficio-pro",
  "coffee-shop",
  "ristorante",
  "signal",
  "lumen",
  "offset",
  "mosaico",
  "editorial",
  "bento",
  "brutal",
  "immersive",
  "futuristic",
]);

export const galleryVariantSchema = z.enum([
  "grid",
  "polaroid",
  "cinematic",
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

const textSizePresetSchema = z.enum([
  "xsmall",
  "small",
  "default",
  "large",
  "xlarge",
]);

const appearanceSchema = z.strictObject({
  paletteId: z.string().trim().min(1).max(40),
  typographyId: z.string().trim().min(1).max(40),
  buttonTextSize: textSizePresetSchema,
  chipTextSize: textSizePresetSchema,
  titleTextSize: textSizePresetSchema,
  subtitleTextSize: textSizePresetSchema,
  contentTextSize: textSizePresetSchema,
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
  )
  .refine((value) => value.nuvolets === undefined || nuvoletsContentSchema.safeParse(value.nuvolets).success, "Invalid Nuvolets section")
  .refine((value) => value.cta === undefined || contactContentSchema.safeParse(value.cta).success, "Invalid company contact");

const changesSchema = z.strictObject({
  meta: metaSchema.optional(),
  seo: seoSchema.optional(),
  appearance: appearanceSchema.optional(),
  galleryVariant: galleryVariantSchema.optional(),
  heroVariant: heroVariantSchema.optional(),
  sections: sectionPayloadsSchema.optional(),
});

const changedScopesSchema = z.strictObject({
  meta: z.literal(true).optional(),
  seo: z.literal(true).optional(),
  appearance: z.literal(true).optional(),
  galleryVariant: z.literal(true).optional(),
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
  content: landingContentSchema,
  appearance: appearanceSchema,
  galleryVariant: galleryVariantSchema,
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
