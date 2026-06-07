import { z } from "zod";

export const HeroSchema = z.object({
  eyebrow: z.string().default(""),
  title: z.string().default(""),
  subtitle: z.string().default(""),
  description: z.string().default(""),
  image: z.string().default(""),
});

export const StorySchema = z.object({
  statement: z.string().default(""),
});

export const StatSchema = z.object({
  id: z.string(),
  value: z.string(),
  label: z.string(),
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
  phone: z.string().default(""),
  email: z.string().default(""),
  address: z.string().default(""),
});

export const LandingContentSchema = z.object({
  hero: HeroSchema,
  story: StorySchema,
  stats: z.array(StatSchema).default([]),
  spaces: z.array(SpaceSchema).default([]),
  services: z.array(ServiceSchema).default([]),
  workflow: z.array(WorkflowStepSchema).default([]),
  testimonials: z.array(TestimonialSchema).default([]),
  contact: ContactSchema,
});

export const PatchLandingSchema = z.object({
  contentJson: LandingContentSchema.optional(),
  published: z.boolean().optional(),
});
