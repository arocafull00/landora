import type { FormEventHandler } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { SIGNAL_CONTACT_COPY } from "@/components/templates/signal/signal-copy";
import type { SignalContactFields } from "@/lib/schemas/signal-contact";

const fieldClass = "w-full border-b border-[var(--site-on-dark)]/30 bg-transparent px-0 py-3 text-[var(--site-on-dark)] outline-none transition-colors placeholder:text-[var(--site-on-dark)]/45 focus:border-[var(--site-accent)]";

export function SignalContactFields({
  enabled,
  errors,
  isSubmitting,
  onSubmit,
  register,
}: {
  enabled: boolean;
  errors: FieldErrors<SignalContactFields>;
  isSubmitting: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<SignalContactFields>;
}) {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <fieldset disabled={isSubmitting} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="block uppercase tracking-[0.15em] text-[var(--site-on-dark)]/75 text-site-content-sm">{SIGNAL_CONTACT_COPY.name}</span>
            <input {...register("name")} className={fieldClass} maxLength={100} autoComplete="name" />
            {errors.name?.message ? <span className="mt-1 block text-danger text-site-content-sm">{errors.name.message}</span> : null}
          </label>
          <label className="block">
            <span className="block uppercase tracking-[0.15em] text-[var(--site-on-dark)]/75 text-site-content-sm">{SIGNAL_CONTACT_COPY.company}</span>
            <input {...register("company")} className={fieldClass} maxLength={120} autoComplete="organization" />
            {errors.company?.message ? <span className="mt-1 block text-danger text-site-content-sm">{errors.company.message}</span> : null}
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="block uppercase tracking-[0.15em] text-[var(--site-on-dark)]/75 text-site-content-sm">{SIGNAL_CONTACT_COPY.email}</span>
            <input {...register("email")} className={fieldClass} type="email" maxLength={254} autoComplete="email" />
            {errors.email?.message ? <span className="mt-1 block text-danger text-site-content-sm">{errors.email.message}</span> : null}
          </label>
          <label className="block">
            <span className="block uppercase tracking-[0.15em] text-[var(--site-on-dark)]/75 text-site-content-sm">{SIGNAL_CONTACT_COPY.phone}</span>
            <input {...register("phone")} className={fieldClass} type="tel" maxLength={40} autoComplete="tel" />
            {errors.phone?.message ? <span className="mt-1 block text-danger text-site-content-sm">{errors.phone.message}</span> : null}
          </label>
        </div>
        <label className="block">
          <span className="block uppercase tracking-[0.15em] text-[var(--site-on-dark)]/75 text-site-content-sm">{SIGNAL_CONTACT_COPY.message}</span>
          <textarea {...register("message")} className={`${fieldClass} min-h-32 resize-y`} maxLength={2000} rows={5} />
          {errors.message?.message ? <span className="mt-1 block text-danger text-site-content-sm">{errors.message.message}</span> : null}
        </label>
        <label className="sr-only" aria-hidden>
          Deja este campo vacío
          <input {...register("honeypot")} autoComplete="off" tabIndex={-1} />
        </label>
      </fieldset>
      {enabled ? (
        <button className="inline-flex min-h-14 items-center gap-5 border border-[var(--site-on-dark)] px-6 py-4 font-semibold uppercase tracking-[0.15em] text-[var(--site-on-dark)] transition-colors hover:bg-[var(--site-on-dark)] hover:text-[var(--site-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] disabled:opacity-50 text-site-button" disabled={isSubmitting} type="submit">
          {SIGNAL_CONTACT_COPY.submit}
          <ArrowRight aria-hidden className="size-4" />
        </button>
      ) : (
        <p className="text-[var(--site-on-dark)]/70 text-site-content-sm">{SIGNAL_CONTACT_COPY.preview}</p>
      )}
    </form>
  );
}
