import type { LandingContent } from "@/lib/dashboard-data";
import { readySubscriptionSettingsSchema, type SubscriptionSettings } from "@/lib/schemas/subscription-settings";

export const SUBSCRIPTION_PRIVACY_PATH = "/suscripciones/privacidad";

export type PrivacyBlock = { type: "heading" | "paragraph"; text: string };

export function isSubscriptionConfigured(settings: SubscriptionSettings) {
  return readySubscriptionSettingsSchema.safeParse(settings).success;
}

export function applySubscriptionSettings(content: LandingContent, settings: SubscriptionSettings, privacyUrl: string): LandingContent {
  if (!content.nuvolets) return content;
  const configured = isSubscriptionConfigured(settings);
  return { ...content, nuvolets: { ...content.nuvolets, newsletter: {
    ...content.nuvolets.newsletter,
    enabled: configured && settings.enabled,
    consentText: settings.consentText,
    privacyUrl: configured ? privacyUrl : "",
  } } };
}

export function resolveSubscriptionPrivacyText(settings: SubscriptionSettings) {
  const replacements: Record<string, string> = { responsable: settings.controllerName, direccion: settings.controllerAddress, email: settings.contactEmail };
  return settings.privacyText.replace(/\{\{(responsable|direccion|email)\}\}/g, (_, key: string) => replacements[key]);
}

export function parsePrivacyBlocks(text: string): PrivacyBlock[] {
  const blocks: PrivacyBlock[] = [];
  let paragraph: string[] = [];
  const flush = () => {
    if (paragraph.length === 0) return;
    blocks.push({ type: "paragraph", text: paragraph.join("\n") });
    paragraph = [];
  };
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) { flush(); continue; }
    if (trimmed.startsWith("## ")) {
      flush();
      blocks.push({ type: "heading", text: trimmed.slice(3).trim() });
      continue;
    }
    paragraph.push(trimmed);
  }
  flush();
  return blocks;
}
