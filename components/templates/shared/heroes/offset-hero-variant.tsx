"use client";

import { ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { HeroVariantMedia } from "@/components/templates/shared/heroes/hero-variant-media";
import { useAnalytics } from "@/hooks/use-analytics";

const OFFSET_COPY = {
  primaryCtaFallback: "Más información",
  secondaryCta: "Descubrir",
} as const;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function OffsetHeroVariant({
  content,
  heroRef,
  primaryCtaHref,
  secondaryCtaHref,
}: HeroVariantProps) {
  const reduceMotion = useReducedMotion();
  const { trackCtaClick } = useAnalytics();
  const { hero } = content;

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-(--site-surface) px-5 pb-12 pt-28 text-(--site-text) sm:px-8 sm:pt-32 lg:px-12 lg:pb-16"
      id="hero"
      ref={heroRef}
    >
      <div className="mx-auto grid min-h-[calc(100dvh-9rem)] w-full max-w-7xl gap-x-8 gap-y-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6">
        <m.div
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 flex items-center gap-4 lg:col-span-6 lg:row-start-1"
          initial={reduceMotion ? false : { opacity: 0, x: -20 }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
        >
          <span aria-hidden className="h-px w-12 bg-(--site-primary)" />
          {hero.eyebrow ? (
            <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-(--site-primary) sm:text-sm">
              {hero.eyebrow}
            </p>
          ) : null}
        </m.div>

        <m.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col justify-end lg:col-span-8 lg:row-start-2 lg:pb-8"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          transition={{ delay: 0.08, duration: 0.8, ease: EASE_OUT }}
        >
          <h1 className="text-balance font-headline text-[clamp(3.5rem,8vw,8.5rem)] font-semibold leading-[0.86] tracking-[-0.065em]">
            {hero.title}
          </h1>
          <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-2 sm:items-start">
            <div>
              {hero.subtitle ? (
                <p className="text-pretty font-body text-lg font-medium leading-snug sm:text-xl">
                  {hero.subtitle}
                </p>
              ) : null}
              {hero.description ? (
                <p className="mt-3 text-pretty font-body text-sm leading-relaxed text-[var(--site-text-muted)] sm:text-base">
                  {hero.description}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-3 sm:items-start">
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--site-primary)] px-6 py-3 font-body text-sm font-semibold text-[var(--site-on-primary)] transition-[background-color,transform,box-shadow] hover:translate-x-1 hover:bg-[var(--site-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-surface)]"
                href={primaryCtaHref}
                onClick={() => trackCtaClick()}
              >
                {hero.ctaLabel || OFFSET_COPY.primaryCtaFallback}
                <ArrowRight aria-hidden className="size-4" />
              </a>
              <a
                className="inline-flex min-h-10 items-center justify-center border-b border-[var(--site-border)] px-1 py-2 font-body text-sm font-semibold text-[var(--site-text)] transition-[border-color,color] hover:border-[var(--site-primary)] hover:text-[var(--site-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-primary)]"
                href={secondaryCtaHref}
              >
                {OFFSET_COPY.secondaryCta}
              </a>
            </div>
          </div>
        </m.div>

        <m.div
          animate={{ opacity: 1, x: 0 }}
          className="relative min-h-[48vh] overflow-hidden border border-[var(--site-border)] bg-[var(--site-surface-alt)] lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:min-h-0"
          initial={reduceMotion ? false : { opacity: 0, x: 28 }}
          transition={{ delay: 0.16, duration: 0.9, ease: EASE_OUT }}
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
        </m.div>
      </div>
    </section>
  );
}
