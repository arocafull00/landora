import Link from "next/link";
import type { BaseSyntheticEvent } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import { ExternalLink, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { SubscriptionSettings } from "@/lib/schemas/subscription-settings";
import { SUBSCRIPTION_SETTINGS_COPY as copy } from "../subscription-settings-copy";
import { SubscriptionSettingsField } from "./subscription-settings-field";

export function SubscriptionSettingsForm({ form, submit, busy, previewHref, onRestore }: {
  form: UseFormReturn<SubscriptionSettings>;
  submit: (event?: BaseSyntheticEvent) => Promise<void>;
  busy: boolean;
  previewHref: string;
  onRestore: () => void;
}) {
  const { errors } = form.formState;
  return (
    <form onSubmit={submit} noValidate>
      <fieldset disabled={busy} className="space-y-6">
        <section className="flex items-start justify-between gap-4" aria-labelledby="subscription-enabled-label">
          <div className="space-y-1">
            <Label id="subscription-enabled-label" htmlFor="subscription-enabled" className="text-ink">{copy.enabled}</Label>
            <p className="text-sm text-ink-secondary">{copy.enabledHelp}</p>
            {errors.enabled ? <p className="text-sm text-danger">{errors.enabled.message}</p> : null}
          </div>
          <Controller control={form.control} name="enabled" render={({ field }) => <Switch id="subscription-enabled" checked={field.value} onCheckedChange={field.onChange} />} />
        </section>
        <Separator />
        <section className="space-y-5" aria-labelledby="subscription-controller-title">
          <h2 id="subscription-controller-title" className="text-lg font-semibold text-ink">{copy.controllerTitle}</h2>
          <SubscriptionSettingsField id="subscription-controller-name" label={copy.controllerName} error={errors.controllerName?.message}>
            <Input id="subscription-controller-name" {...form.register("controllerName")} autoComplete="organization" className="bg-surface text-ink" aria-invalid={!!errors.controllerName} aria-describedby={errors.controllerName ? "subscription-controller-name-error" : undefined} />
          </SubscriptionSettingsField>
          <SubscriptionSettingsField id="subscription-controller-address" label={copy.controllerAddress} error={errors.controllerAddress?.message}>
            <Input id="subscription-controller-address" {...form.register("controllerAddress")} autoComplete="street-address" className="bg-surface text-ink" aria-invalid={!!errors.controllerAddress} aria-describedby={errors.controllerAddress ? "subscription-controller-address-error" : undefined} />
          </SubscriptionSettingsField>
          <SubscriptionSettingsField id="subscription-contact-email" label={copy.contactEmail} help={copy.contactEmailHelp} error={errors.contactEmail?.message}>
            <Input id="subscription-contact-email" {...form.register("contactEmail")} type="email" autoComplete="email" className="bg-surface text-ink" aria-invalid={!!errors.contactEmail} aria-describedby={errors.contactEmail ? "subscription-contact-email-error" : "subscription-contact-email-help"} />
          </SubscriptionSettingsField>
        </section>
        <Separator />
        <section className="space-y-5" aria-labelledby="subscription-consent-title">
          <h2 id="subscription-consent-title" className="text-lg font-semibold text-ink">{copy.consentTitle}</h2>
          <SubscriptionSettingsField id="subscription-consent-text" label={copy.consentText} help={copy.consentHelp} error={errors.consentText?.message}>
            <Textarea id="subscription-consent-text" {...form.register("consentText")} rows={3} className="bg-surface text-ink" aria-invalid={!!errors.consentText} aria-describedby={errors.consentText ? "subscription-consent-text-error" : "subscription-consent-text-help"} />
          </SubscriptionSettingsField>
        </section>
        <Separator />
        <section className="space-y-5" aria-labelledby="subscription-privacy-title">
          <h2 id="subscription-privacy-title" className="text-lg font-semibold text-ink">{copy.privacyTitleSection}</h2>
          <p className="text-sm text-ink-secondary">{copy.previewHelp}</p>
          <SubscriptionSettingsField id="subscription-privacy-heading" label={copy.privacyTitle} error={errors.privacyTitle?.message}>
            <Input id="subscription-privacy-heading" {...form.register("privacyTitle")} className="bg-surface text-ink" aria-invalid={!!errors.privacyTitle} aria-describedby={errors.privacyTitle ? "subscription-privacy-heading-error" : undefined} />
          </SubscriptionSettingsField>
          <SubscriptionSettingsField id="subscription-privacy-text" label={copy.privacyText} help={copy.privacyHelp} error={errors.privacyText?.message}>
            <Textarea id="subscription-privacy-text" {...form.register("privacyText")} rows={16} className="bg-surface font-mono text-ink" aria-invalid={!!errors.privacyText} aria-describedby={errors.privacyText ? "subscription-privacy-text-error" : "subscription-privacy-text-help"} />
          </SubscriptionSettingsField>
        </section>
        <Separator />
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={busy}><Save aria-hidden className="size-4" />{busy ? copy.saving : copy.save}</Button>
          <Button type="button" variant="outline" onClick={onRestore}><RotateCcw aria-hidden className="size-4" />{copy.restore}</Button>
          <Button variant="outline" asChild><Link href={previewHref} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden className="size-4" />{copy.preview}</Link></Button>
        </div>
      </fieldset>
    </form>
  );
}
