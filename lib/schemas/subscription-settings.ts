import { z } from "zod";

const requiredText = (max: number) => z.string().trim().max(max);

export const subscriptionSettingsSchema = z.strictObject({
  enabled: z.boolean(),
  controllerName: requiredText(200),
  controllerAddress: requiredText(500),
  contactEmail: z.union([z.literal(""), z.email("Introduce un email de contacto válido").max(254)]),
  consentText: requiredText(2000),
  privacyTitle: requiredText(200),
  privacyText: requiredText(20000),
});

export const readySubscriptionSettingsSchema = subscriptionSettingsSchema.extend({
  controllerName: requiredText(200).min(1, "Introduce el responsable del tratamiento"),
  controllerAddress: requiredText(500).min(1, "Introduce la dirección del responsable"),
  contactEmail: z.email("Introduce un email de contacto válido").max(254),
  consentText: requiredText(2000).min(1, "Introduce el aviso de consentimiento"),
  privacyTitle: requiredText(200).min(1, "Introduce el título de privacidad"),
  privacyText: requiredText(20000).min(1, "Introduce el texto de privacidad"),
});

export const subscriptionSettingsFormSchema = subscriptionSettingsSchema.superRefine((value, ctx) => {
  if (!value.enabled) return;
  const parsed = readySubscriptionSettingsSchema.safeParse(value);
  if (parsed.success) return;
  for (const issue of parsed.error.issues) ctx.addIssue({ code: "custom", path: issue.path, message: issue.message });
});

export const saveSubscriptionSettingsSchema = z.strictObject({ landingId: z.uuid(), settings: subscriptionSettingsFormSchema });
export const subscriptionPrivacyParamsSchema = z.strictObject({ slug: z.string().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) });
export const subscriptionPrivacyPreviewParamsSchema = z.strictObject({ id: z.uuid() });
export type SubscriptionSettings = z.infer<typeof subscriptionSettingsSchema>;
