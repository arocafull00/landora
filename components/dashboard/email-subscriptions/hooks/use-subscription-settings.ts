"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveSubscriptionSettingsAction } from "@/app/actions/subscription-settings";
import { DEFAULT_CONSENT_TEXT, DEFAULT_SUBSCRIPTION_SETTINGS } from "@/lib/email-subscriptions/defaults";
import { SUBSCRIPTION_PRIVACY_PATH } from "@/lib/email-subscriptions/settings";
import { getPreviewLandingPath } from "@/lib/public-site-url";
import { subscriptionSettingsFormSchema, type SubscriptionSettings } from "@/lib/schemas/subscription-settings";
import { SUBSCRIPTION_SETTINGS_COPY as copy } from "../subscription-settings-copy";

export function useSubscriptionSettings(landingId: string, settings: SubscriptionSettings) {
  const router = useRouter();
  const form = useForm<SubscriptionSettings>({ resolver: zodResolver(subscriptionSettingsFormSchema), defaultValues: settings });
  const previewHref = getPreviewLandingPath(landingId, SUBSCRIPTION_PRIVACY_PATH);
  const submit = form.handleSubmit(async (values) => {
    try {
      const result = await saveSubscriptionSettingsAction({ landingId, settings: values });
      if ("error" in result) { toast.error(result.error); return; }
      toast.success(copy.saved);
      form.reset(values);
      router.refresh();
    } catch {
      toast.error(copy.failed);
    }
  }, () => toast.error(copy.invalid));
  const restoreDefaults = () => {
    const options = { shouldDirty: true };
    form.setValue("consentText", DEFAULT_CONSENT_TEXT, options);
    form.setValue("privacyTitle", DEFAULT_SUBSCRIPTION_SETTINGS.privacyTitle, options);
    form.setValue("privacyText", DEFAULT_SUBSCRIPTION_SETTINGS.privacyText, options);
  };
  return { form, submit, restoreDefaults, previewHref, busy: form.formState.isSubmitting };
}
