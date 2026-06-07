import { z } from "zod";

function objectField<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return z.preprocess(
    (value) => (value && typeof value === "object" && !Array.isArray(value) ? value : {}),
    schema
  );
}

function arrayField<T extends z.ZodTypeAny>(schema: z.ZodArray<T>) {
  return z.preprocess((value) => (Array.isArray(value) ? value : []), schema);
}

function stringField() {
  return z.preprocess((value) => (typeof value === "string" ? value : ""), z.string());
}

export const HeroSchema = z.object({
  eyebrow: z.string().default(""),
  title: z.string().default(""),
  subtitle: z.string().default(""),
  description: z.string().default(""),
  image: z.string().default(""),
  houseImage: z.string().default(""),
});

export const StorySchema = z.object({
  statement: z.string().default(""),
});

export const StatSchema = z.object({
  id: z.string(),
  value: z.string(),
  label: z.string(),
  countTo: z.number().optional(),
  suffix: z.string().optional(),
});

export const GalleryItemSchema = z.object({
  id: z.string(),
  video: z.string(),
});

export const NavLinkSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
});

export const SpaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
});

export const ServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  label: z.string(),
  image: z.string(),
});

export const WorkflowStepSchema = z.object({
  id: z.string(),
  number: z.string(),
  title: z.string(),
  description: z.string(),
});

export const TestimonialSchema = z.object({
  id: z.string(),
  author: z.string(),
  date: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  verified: z.boolean(),
});

export const ContactSchema = z.object({
  phone: stringField(),
  email: stringField(),
  address: stringField(),
});

export const LandingContentSchema = z.object({
  brand: z.string().default(""),
  hero: objectField(HeroSchema),
  story: objectField(StorySchema),
  stats: arrayField(z.array(StatSchema)),
  gallery: arrayField(z.array(GalleryItemSchema)),
  nav: arrayField(z.array(NavLinkSchema)),
  spaces: arrayField(z.array(SpaceSchema)),
  services: arrayField(z.array(ServiceSchema)),
  workflow: arrayField(z.array(WorkflowStepSchema)),
  testimonials: arrayField(z.array(TestimonialSchema)),
  contact: objectField(ContactSchema),
});

export function parseLandingContent(data: unknown) {
  return LandingContentSchema.parse(data ?? {});
}

export const PatchLandingSchema = z.object({
  contentJson: LandingContentSchema.optional(),
  published: z.boolean().optional(),
});
