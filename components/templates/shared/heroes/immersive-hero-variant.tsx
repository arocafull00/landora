import { ArrowUpRight } from "lucide-react";
import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { HeroVariantMedia } from "@/components/templates/shared/heroes/hero-variant-media";

const IMMERSIVE_COPY = {
  primaryCtaFallback: "Descubrir",
  counter: "04 / 05",
} as const;


export function ImmersiveHeroVariant({
  content,
  heroRef,
  primaryCtaHref,
}: HeroVariantProps) {
  const { hero } = content;

  return (
    <section
      className="group relative min-h-dvh cursor-crosshair overflow-hidden bg-[var(--site-dark)] px-5 pb-16 pt-28 text-[var(--site-on-dark)] sm:px-8 sm:pt-32 lg:px-12"
      id="hero"
      ref={heroRef}
    >
      <div className="absolute inset-0">
        {hero.image ? (
          <HeroVariantMedia alt="" appearance={content.appearance} className="object-cover saturate-[0.7] contrast-[1.08] transition-transform duration-1000 group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none" priority sizes="100vw" src={hero.image} />
        ) : null}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--site-dark)]/20 via-[var(--site-dark)]/25 to-[var(--site-dark)]/95" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,color-mix(in_srgb,var(--site-accent)_28%,transparent),transparent_32%)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-8rem)] w-full max-w-7xl items-end py-14 sm:py-20">
        <div
          className="max-w-6xl"
        >
          {hero.eyebrow ? (
            <p className="mb-6 flex items-center gap-3 font-body font-semibold uppercase tracking-[0.2em] text-[var(--site-accent)] text-site-content">
              <span aria-hidden className="h-px w-8 bg-[var(--site-accent)]" />
              {hero.eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-6xl text-balance font-headline font-medium leading-[0.9] tracking-[-0.065em] text-site-title-lg">
            {hero.title}
            {hero.subtitle ? <em className="block font-normal">{hero.subtitle}</em> : null}
          </h1>
          <div className="mt-8 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            {hero.description ? (
              <p className="max-w-2xl text-pretty font-body leading-relaxed text-[var(--site-on-dark)]/70 text-site-subtitle">
                {hero.description}
              </p>
            ) : <span />}
            <a
              className="flex size-28 shrink-0 items-center justify-center gap-1 rounded-full border border-[var(--site-on-dark)]/45 bg-[var(--site-on-dark)]/10 p-4 text-center font-body font-bold text-[var(--site-on-dark)] backdrop-blur-md transition-[transform,background-color,border-color,color] hover:-rotate-6 hover:scale-105 hover:border-[var(--site-accent)] hover:bg-[var(--site-accent)] hover:text-[var(--site-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] motion-reduce:transform-none sm:size-30 text-site-content"
              href={primaryCtaHref}
              data-analytics-event="cta_click"
            >
              {hero.ctaLabel || IMMERSIVE_COPY.primaryCtaFallback}
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <span className="absolute right-8 top-28 hidden font-body font-medium tracking-[0.14em] text-[var(--site-on-dark)]/60 lg:block text-site-content">
        {IMMERSIVE_COPY.counter}
      </span>
    </section>
  );
}
