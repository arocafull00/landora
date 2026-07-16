import { z } from "zod";

const optionalUrl = z.union([z.url().max(2048), z.literal("")]);

export const resourceIdSchema = z.uuid();

export const createAssetSchema = z.strictObject({
  publicId: z.string().trim().min(1).max(500),
  url: z.url().max(2048),
  name: z.string().trim().min(1).max(200).default("asset"),
  mimeType: z.string().trim().max(120).default(""),
  width: z.number().int().positive().max(20000).nullable().optional(),
  height: z.number().int().positive().max(20000).nullable().optional(),
});

export const updateAssetSchema = z.strictObject({
  name: z.string().trim().min(1).max(200),
});

export const updateLandingMetaSchema = z.strictObject({
  published: z.boolean().optional(),
  name: z.string().trim().min(1).max(120).optional(),
  slug: z.string().trim().min(1).max(120).optional(),
  seoTitle: z.string().trim().max(200).optional(),
  seoDescription: z.string().trim().max(500).optional(),
  seoFavicon: optionalUrl.optional(),
}).refine((value) => Object.keys(value).length > 0);

export const createBlogPostSchema = z.strictObject({
  title: z.string().trim().min(1).max(200).default("Nuevo post"),
  slug: z.string().trim().min(1).max(200).optional(),
  excerpt: z.string().max(1000).default(""),
  body: z.string().max(100000).default(""),
  heroImage: optionalUrl.default(""),
});

export const updateBlogPostSchema = z.strictObject({
  title: z.string().trim().min(1).max(200).optional(),
  slug: z.string().trim().min(1).max(200).optional(),
  excerpt: z.string().max(1000).optional(),
  body: z.string().max(100000).optional(),
  heroImage: optionalUrl.optional(),
  published: z.boolean().optional(),
}).refine((value) => Object.keys(value).length > 0);

export const updateBlogConfigSchema = z.strictObject({
  title: z.string().trim().max(200).optional(),
  description: z.string().trim().max(1000).optional(),
}).refine((value) => Object.keys(value).length > 0);
