"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { SUBSCRIPTIONS_COPY as copy } from "@/lib/email-subscriptions/copy";
import { newsletterSiteKey, useNuvoletsNewsletter } from "../hooks/use-nuvolets-newsletter";
import { NuvoletsLink } from "./nuvolets-link";

export function NuvoletsNewsletterForm({ config, slug, preview }: { config: NuvoletsContent["newsletter"]; slug: string; preview: boolean }) {
  const disabled = preview || !config.enabled || !newsletterSiteKey;
  const { form, token, setToken, widgetRef, submit } = useNuvoletsNewsletter(slug, disabled);
  return <form onSubmit={submit} className="space-y-5 text-left">
    <div className="flex flex-col gap-3 sm:flex-row"><label className="flex-1"><span className="sr-only">{copy.email}</span><input {...form.register("email")} type="email" autoComplete="email" maxLength={254} placeholder={config.placeholder} disabled={disabled} aria-invalid={!!form.formState.errors.email} aria-describedby={form.formState.errors.email ? "nuvolets-email-error" : undefined} className="w-full rounded-full border border-nuvolets-border bg-nuvolets-surface px-6 py-3.5 text-base" /></label><button type="submit" className="nuvolets-button gap-2" disabled={disabled || !token || form.formState.isSubmitting}><Mail aria-hidden size={18} className="shrink-0" />{form.formState.isSubmitting ? copy.loading : config.buttonLabel}</button></div>
    {form.formState.errors.email ? <p id="nuvolets-email-error" className="text-sm text-danger">{form.formState.errors.email.message}</p> : null}
    {config.consentText ? <label className="flex items-start gap-3 text-sm"><input {...form.register("consent")} type="checkbox" disabled={disabled} className="mt-1" aria-invalid={!!form.formState.errors.consent} /><span>{config.consentText} <NuvoletsLink href={config.privacyUrl} className="underline">{copy.privacy}</NuvoletsLink></span></label> : null}
    {form.formState.errors.consent ? <p className="text-sm text-danger">{form.formState.errors.consent.message}</p> : null}
    <div aria-hidden className="absolute -left-[10000px]"><label>{copy.honeypot}<input {...form.register("honeypot")} tabIndex={-1} autoComplete="off" /></label></div>
    {!disabled && newsletterSiteKey ? <Turnstile ref={widgetRef} siteKey={newsletterSiteKey} options={{ action: "newsletter" }} onSuccess={setToken} onExpire={() => setToken("")} onError={() => { setToken(""); toast.error(copy.verification); }} /> : null}
    {disabled ? <p className="text-center text-sm">{preview ? copy.preview : config.enabled ? copy.unavailable : copy.disabled}</p> : null}
  </form>;
}
