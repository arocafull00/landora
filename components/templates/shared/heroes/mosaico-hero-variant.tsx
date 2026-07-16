"use client";

import { ArrowUpRight } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { HeroVariantMedia } from "@/components/templates/shared/heroes/hero-variant-media";
import { useAnalytics } from "@/hooks/use-analytics";

const MOSAICO_COPY = {
  primaryCtaFallback: "Más información",
  secondaryCta: "Descubrir",
} as const;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function MosaicoHeroVariant({
  content,
  heroRef,
  primaryCtaHref,
  secondaryCtaHref,
}: HeroVariantProps) {
  const reduceMotion = useReducedMotion();
  const { trackCtaClick } = useAnalytics();
  const { hero } = content;
  const secondaryImage = hero.houseImage || hero.image;

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-[var(--site-dark)] px-5 pb-14 pt-28 text-[var(--site-on-dark)] sm:px-8 sm:pt-32 lg:px-12 lg:pb-16"
      id="hero"
      ref={heroRef}
    >
      <div
        aria-hidden
        className="absolute -left-24 top-1/3 size-64 rounded-full border border-[var(--site-accent)] opacity-20 sm:size-96"
      />
      <div className="mx-auto grid min-h-[calc(100dvh-9rem)] w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <m.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
        >
          {hero.eyebrow ? (
            <p className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.26em] text-[var(--site-accent)] sm:text-sm">
              {hero.eyebrow}
            </p>
          ) : null}
          <h1 className="text-balance font-headline text-[clamp(3.5rem,7vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.055em]">
            {hero.title}
          </h1>
          {hero.subtitle ? (
            <p className="mt-7 max-w-lg text-pretty font-body text-lg leading-relaxed sm:text-xl">
              {hero.subtitle}
            </p>
          ) : null}
          {hero.description ? (
            <p className="mt-3 max-w-md text-pretty font-body text-sm leading-relaxed text-[var(--site-on-dark)] opacity-70 sm:text-base">
              {hero.description}
            </p>
          ) : null}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--site-primary)] px-6 py-3 font-body text-sm font-semibold text-[var(--site-on-primary)] transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-[var(--site-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-dark)]"
              href={primaryCtaHref}
              onClick={() => trackCtaClick()}
            >
              {hero.ctaLabel || MOSAICO_COPY.primaryCtaFallback}
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--site-on-dark)] px-6 py-3 font-body text-sm font-semibold text-[var(--site-on-dark)] opacity-80 transition-[background-color,opacity,transform] hover:-translate-y-0.5 hover:bg-[var(--site-surface-alt)] hover:text-[var(--site-text)] hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-dark)]"
              href={secondaryCtaHref}
            >
              {MOSAICO_COPY.secondaryCta}
            </a>
          </div>
        </m.div>

        <m.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative mx-auto h-[min(72vh,44rem)] w-full max-w-2xl"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          transition={{ delay: 0.12, duration: 0.9, ease: EASE_OUT }}
        >
          <div className="absolute inset-y-0 right-0 w-[76%] rotate-2 overflow-hidden rounded-[2rem] border border-[var(--site-accent)] bg-[var(--site-surface-alt)]">
            {hero.image ? (
              <HeroVariantMedia
                alt={hero.title}
                appearance={content.appearance}
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 76vw, 40vw"
                src={hero.image}
              />
            ) : null}
          </div>
          <div className="absolute bottom-[8%] left-0 aspect-[4/3] w-[58%] -rotate-3 overflow-hidden rounded-[1.5rem] border-4 border-[var(--site-dark)] bg-[var(--site-surface-alt)] shadow-2xl">
            {secondaryImage ? (
              <HeroVariantMedia
                alt=""
                appearance={content.appearance}
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 58vw, 30vw"
                src={secondaryImage}
              />
            ) : null}
          </div>
          <div
            aria-hidden
            className="absolute left-[7%] top-[8%] flex size-14 items-center justify-center rounded-full bg-[var(--site-accent)] text-[var(--site-dark)] sm:size-16"
          >
            <ArrowUpRight className="size-6" />
          </div>
        </m.div>
      </div>
    </section>
  );
}
