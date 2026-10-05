import { z } from "zod";

export const socialPlatformSchema = z.enum(["instagram", "facebook", "linkedin", "tiktok", "youtube", "x"]);
const socialUrlSchema = z.string().trim().max(2048).refine(
  (value) => !value || z.url({ protocol: /^https?$/ }).safeParse(value).success,
  "Introduce una URL completa, por ejemplo https://www.instagram.com/tuempresa",
);
const phoneSchema = z.string().trim().max(100).refine(
  (value) => !value || (/^\+?[\d\s().-]+$/.test(value) && /^\d{7,15}$/.test(value.replace(/\D/g, ""))),
  "Introduce un teléfono válido con prefijo internacional",
);
const companyFields = {
  phone: phoneSchema,
  email: z.union([z.email().max(254), z.literal("")]),
  address: z.string().trim().max(2000),
};

export const companyDetailsSchema = z.strictObject({
  ...companyFields,
  instagram: socialUrlSchema,
  facebook: socialUrlSchema,
  linkedin: socialUrlSchema,
  tiktok: socialUrlSchema,
  youtube: socialUrlSchema,
  x: socialUrlSchema,
});

export const contactContentSchema = z.strictObject({
  ...companyFields,
  ctaLabel: z.string().max(200).optional(),
  copyrightSuffix: z.string().max(2000).optional(),
  copyrightExtra: z.string().max(2000).optional(),
  whatsappEnabled: z.boolean().optional(),
  socialLinks: z.array(z.strictObject({ platform: socialPlatformSchema, url: socialUrlSchema }))
    .max(6)
    .refine((links) => new Set(links.map((link) => link.platform)).size === links.length, "Redes duplicadas")
    .optional(),
});

export type CompanyDetailsValues = z.infer<typeof companyDetailsSchema>;
