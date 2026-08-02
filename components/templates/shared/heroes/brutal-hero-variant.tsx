import { ArrowUpRight } from "lucide-react";
import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";

const BRUTAL_COPY = {
  primaryCtaFallback: "Ver lo que hacemos",
  location: "Estudio independiente",
  ticker: "ESTRATEGIA / IDENTIDAD / DIGITAL / CAMPAÑAS / EXPERIENCIAS / ESTRATEGIA / IDENTIDAD / DIGITAL / CAMPAÑAS / EXPERIENCIAS / ",
} as const;


export function BrutalHeroVariant({
  content,
  heroRef,
  primaryCtaHref,
}: HeroVariantProps) {
  const { hero } = content;

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-[var(--site-accent)] px-5 pb-20 pt-28 text-[var(--site-dark)] sm:px-8 sm:pt-32 lg:px-12"
      id="hero"
      ref={heroRef}
    >
      <div aria-hidden className="absolute inset-0 opacity-15 [background-image:radial-gradient(var(--site-dark)_0.75px,transparent_0.75px)] [background-size:5px_5px]" />
      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-8rem)] w-full max-w-7xl items-end gap-10 py-12 lg:grid-cols-[1fr_19rem] lg:py-16">
        <div
        >
          <div className="mb-5 flex items-center justify-between border-b-2 border-[var(--site-dark)] pb-4 font-body text-[0.68rem] font-semibold uppercase tracking-[0.12em]">
            <span>{hero.eyebrow || BRUTAL_COPY.location}</span>
            <span>{content.brand}</span>
          </div>
          <h1 className="max-w-6xl text-balance font-headline text-[clamp(4.25rem,12vw,11.5rem)] font-extrabold uppercase leading-[0.76] tracking-[-0.085em]">
            {hero.title}
            {hero.subtitle ? (
              <span className="block text-transparent [-webkit-text-stroke:2px_var(--site-dark)] sm:[-webkit-text-stroke:3px_var(--site-dark)]">
                {hero.subtitle}
              </span>
            ) : null}
          </h1>
        </div>

        <aside
          className="flex flex-col justify-end border-t-2 border-[var(--site-dark)] pt-6 lg:self-stretch lg:border-l-2 lg:border-t-0 lg:pl-7 lg:pt-0"
        >
          {hero.description ? (
            <p className="text-pretty font-body text-base font-medium leading-relaxed sm:text-lg">
              {hero.description}
            </p>
          ) : null}
          <a
            className="mt-7 inline-flex min-h-13 w-full items-center justify-center gap-2 bg-[var(--site-dark)] px-5 py-3 font-body text-sm font-bold uppercase tracking-wide text-[var(--site-accent)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-dark)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-accent)]"
            href={primaryCtaHref}
            data-analytics-event="cta_click"
          >
            {hero.ctaLabel || BRUTAL_COPY.primaryCtaFallback}
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        </aside>
      </div>

      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t-2 border-[var(--site-dark)] bg-[var(--site-dark)] py-2.5 text-[var(--site-accent)]">
        <p
          className="w-max whitespace-nowrap font-body text-[0.68rem] font-semibold uppercase tracking-[0.12em]"
        >
          {BRUTAL_COPY.ticker}{BRUTAL_COPY.ticker}
        </p>
      </div>
    </section>
  );
}
