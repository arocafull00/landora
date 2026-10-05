import { z } from "zod";

export const emailSubscriptionSchema = z.strictObject({
  slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  email: z.email("Introduce un email válido").max(254).transform((value) => value.trim().toLowerCase()),
  consent: z.literal(true, { error: "Debes aceptar el aviso de consentimiento" }),
  honeypot: z.string().max(200),
  turnstileToken: z.string().min(1).max(2048),
});

export const subscriptionFormSchema = z.strictObject({
  email: z.string().trim().pipe(z.email("Introduce un email válido").max(254)),
  consent: z.boolean().refine((value) => value, "Debes aceptar el aviso de consentimiento"),
  honeypot: z.string().max(200),
});

export const subscriptionQuerySchema = z.strictObject({
  page: z.coerce.number().int().min(1).max(10000).default(1),
  q: z.string().trim().max(200).default(""),
});

export const deleteSubscriptionSchema = z.strictObject({ landingId: z.uuid(), email: z.email().max(254) });
export const exportSubscriptionsSchema = z.strictObject({ landingId: z.uuid(), q: z.string().trim().max(200) });
export type SubscriptionForm = z.infer<typeof subscriptionFormSchema>;
