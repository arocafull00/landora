import Link from "next/link";
import type { BaseSyntheticEvent } from "react";
import { Save } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { CompanyDetailsValues } from "@/lib/schemas/company-details";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CompanyField } from "./company-field";
import { COMPANY_COPY, COMPANY_CONTACT_FIELDS, COMPANY_SOCIAL_FIELDS } from "../company-copy";

export function CompanyDetailsForm({ form, submit, busy }: {
  form: UseFormReturn<CompanyDetailsValues>;
  submit: (event?: BaseSyntheticEvent) => Promise<void>;
  busy: boolean;
}) {
  const { errors } = form.formState;
  return (
    <form onSubmit={submit} noValidate>
      <fieldset disabled={busy} className="space-y-6">
        <section className="space-y-5" aria-labelledby="company-contact-title">
          <h2 id="company-contact-title" className="text-lg font-semibold text-ink">{COMPANY_COPY.contact}</h2>
          <p className="text-sm text-ink-secondary">{COMPANY_COPY.phoneHelp}</p>
          {COMPANY_CONTACT_FIELDS.map((field) => <CompanyField key={field.name} {...field} binding={form.register(field.name)} error={errors[field.name]?.message} />)}
        </section>
        <Separator />
        <section className="space-y-5" aria-labelledby="company-social-title">
          <h2 id="company-social-title" className="text-lg font-semibold text-ink">{COMPANY_COPY.social}</h2>
          <p className="text-sm text-ink-secondary">{COMPANY_COPY.socialHelp}</p>
          <div className="grid gap-5 sm:grid-cols-2">
            {COMPANY_SOCIAL_FIELDS.map((field) => <CompanyField key={field.name} label={field.label} binding={form.register(field.name)} error={errors[field.name]?.message} type="url" placeholder={COMPANY_COPY.urlPlaceholder} />)}
          </div>
        </section>
        <Separator />
        <p className="text-sm text-ink-secondary">{COMPANY_COPY.draft}</p>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={busy}><Save aria-hidden className="size-4" />{busy ? COMPANY_COPY.saving : COMPANY_COPY.save}</Button>
          <Button variant="outline" asChild><Link href="/editor">{COMPANY_COPY.editor}</Link></Button>
        </div>
      </fieldset>
    </form>
  );
}
