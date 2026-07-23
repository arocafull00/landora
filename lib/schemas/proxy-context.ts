import { z } from "zod";

const hostnameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1)
  .max(253)
  .regex(/^[a-z0-9.-]+$/);

const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const proxyLandingQuerySchema = z
  .strictObject({
    host: hostnameSchema.optional(),
    slug: slugSchema.optional(),
  })
  .refine(({ host, slug }) => Boolean(host) !== Boolean(slug));

export const proxyLandingResponseSchema = z.strictObject({
  landing: z
    .strictObject({
      slug: z.string().min(1).max(100),
      customDomain: z.string().min(1).max(253).nullable(),
    })
    .nullable(),
});
