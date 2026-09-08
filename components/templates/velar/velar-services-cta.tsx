import { ArrowRight, CalendarCheck } from "lucide-react";
import { VELAR_CTA_LABEL } from "@/lib/velar-links";

const VELAR_SERVICES_CTA_COPY = {
  title: VELAR_CTA_LABEL,
  subtitle: "y empieza a planear tu evento",
} as const;

export function VelarServicesCta({ href }: { href: string }) {
  return (
    <a
      className="group mx-auto inline-flex max-w-full cursor-pointer items-center gap-3 rounded-full bg-[var(--site-primary)] px-5 py-3 text-[var(--site-on-primary)] transition-[background-color,transform] duration-300 hover:bg-[var(--site-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-surface)] active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none sm:gap-4 sm:px-7 sm:py-3.5"
      data-analytics-event="whatsapp_click"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--site-on-primary)]/12">
        <CalendarCheck aria-hidden className="size-5" />
      </span>
      <span className="flex min-w-0 flex-col text-left leading-tight">
        <span
          className="font-medium uppercase tracking-widest text-site-button"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {VELAR_SERVICES_CTA_COPY.title}
        </span>
        <span
          className="mt-0.5 text-[var(--site-on-primary)]/75 text-site-content-sm"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {VELAR_SERVICES_CTA_COPY.subtitle}
        </span>
      </span>
      <ArrowRight
        aria-hidden
        className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
      />
    </a>
  );
}
