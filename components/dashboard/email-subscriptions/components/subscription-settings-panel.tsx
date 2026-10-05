"use client";

import type { SubscriptionSettings } from "@/lib/schemas/subscription-settings";
import { useSubscriptionSettings } from "../hooks/use-subscription-settings";
import { SubscriptionSettingsForm } from "./subscription-settings-form";

export function SubscriptionSettingsPanel({ landingId, settings }: { landingId: string; settings: SubscriptionSettings }) {
  const { form, submit, restoreDefaults, previewHref, busy } = useSubscriptionSettings(landingId, settings);
  return <SubscriptionSettingsForm form={form} submit={submit} busy={busy} previewHref={previewHref} onRestore={restoreDefaults} />;
}
