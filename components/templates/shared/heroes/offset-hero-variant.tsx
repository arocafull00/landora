import { ArrowRight } from "lucide-react";
import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { HeroVariantMedia } from "@/components/templates/shared/heroes/hero-variant-media";

const OFFSET_COPY = {
  primaryCtaFallback: "Más información",
  secondaryCta: "Descubrir",
} as const;


export function OffsetHeroVariant({
  content,
  heroRef,
  primaryCtaHref,
  secondaryCtaHref,
}: HeroVariantProps) {
  const { hero } = content;

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-(--site-surface) px-5 pb-12 pt-28 text-(--site-text) sm:px-8 sm:pt-32 lg:px-12 lg:pb-16"
      id="hero"
      ref={heroRef}
    >
      <div className="mx-auto grid min-h-[calc(100dvh-9rem)] w-full max-w-7xl gap-x-8 gap-y-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6">
        <div
          className="relative z-10 flex items-center gap-4 lg:col-span-6 lg:row-start-1"
        >
          <span aria-hidden className="h-px w-12 bg-(--site-primary)" />
          {hero.eyebrow ? (
            <p className="font-body font-semibold uppercase tracking-[0.24em] text-(--site-primary) text-site-content">
              {hero.eyebrow}
            </p>
          ) : null}
        </div>

        <div
          className="relative z-10 flex flex-col justify-end lg:col-span-8 lg:row-start-2 lg:pb-8"
        >
          <h1 className="text-balance font-headline font-semibold leading-[0.86] tracking-[-0.065em] text-site-title-lg">
            {hero.title}
          </h1>
          <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-2 sm:items-start">
            <div>
              {hero.subtitle ? (
                <p className="text-pretty font-body font-medium leading-snug text-site-subtitle">
                  {hero.subtitle}
                </p>
              ) : null}
              {hero.description ? (
                <p className="mt-3 text-pretty font-body leading-relaxed text-[var(--site-text-muted)] text-site-content">
                  {hero.description}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-3 sm:items-start">
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--site-primary)] px-6 py-3 font-body font-semibold text-[var(--site-on-primary)] transition-[background-color,transform,box-shadow] hover:translate-x-1 hover:bg-[var(--site-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-surface)] text-site-button"
                href={primaryCtaHref}
                data-analytics-event="cta_click"
              >
                {hero.ctaLabel || OFFSET_COPY.primaryCtaFallback}
                <ArrowRight aria-hidden className="size-4" />
              </a>
              <a
                className="inline-flex min-h-10 items-center justify-center border-b border-[var(--site-border)] px-1 py-2 font-body font-semibold text-[var(--site-text)] transition-[border-color,color] hover:border-[var(--site-primary)] hover:text-[var(--site-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-primary)] text-site-button"
                href={secondaryCtaHref}
              >
                {OFFSET_COPY.secondaryCta}
              </a>
            </div>
          </div>
        </div>

        <div
          className="relative min-h-[48vh] overflow-hidden border border-[var(--site-border)] bg-[var(--site-surface-alt)] lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:min-h-0"
        >
          {hero.image ? (
            <HeroVariantMedia
              alt={hero.title}
              appearance={content.appearance}
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              src={hero.image}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
