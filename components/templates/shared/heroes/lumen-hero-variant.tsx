"use client";

import { ArrowUpRight } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { HeroVariantMedia } from "@/components/templates/shared/heroes/hero-variant-media";
import { useAnalytics } from "@/hooks/use-analytics";

const LUMEN_COPY = {
  primaryCtaFallback: "Más información",
  secondaryCta: "Descubrir",
} as const;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function LumenHeroVariant({
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
      className="relative min-h-dvh overflow-hidden bg-[var(--site-surface)] px-5 pb-8 pt-28 text-[var(--site-text)] sm:px-8 sm:pb-12 sm:pt-32 lg:px-12"
      id="hero"
      ref={heroRef}
    >
      <div
        aria-hidden
        className="absolute inset-x-5 top-24 h-px bg-[var(--site-border)] sm:inset-x-8 lg:inset-x-12"
      />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <m.div
          animate={{ opacity: 1, y: 0 }}
          className="flex max-w-5xl flex-col items-center text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
        >
          {hero.eyebrow ? (
            <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.24em] text-[var(--site-primary)] sm:text-sm">
              {hero.eyebrow}
            </p>
          ) : null}
          <h1 className="text-balance font-headline text-[clamp(3rem,9vw,8rem)] font-medium leading-[0.92] tracking-[-0.055em]">
            {hero.title}
          </h1>
          {hero.subtitle ? (
            <p className="mt-7 max-w-2xl text-pretty font-body text-lg leading-relaxed text-[var(--site-text-muted)] sm:text-xl">
              {hero.subtitle}
            </p>
          ) : null}
          {hero.description ? (
            <p className="mt-3 max-w-xl text-pretty font-body text-sm leading-relaxed text-[var(--site-text-muted)] sm:text-base">
              {hero.description}
            </p>
          ) : null}
          <div className="mt-8 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--site-primary)] px-6 py-3 font-body text-sm font-semibold text-[var(--site-on-primary)] transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-[var(--site-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-surface)]"
              href={primaryCtaHref}
              onClick={() => trackCtaClick()}
            >
              {hero.ctaLabel || LUMEN_COPY.primaryCtaFallback}
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--site-border)] px-6 py-3 font-body text-sm font-semibold text-[var(--site-text)] transition-[background-color,border-color,transform] hover:-translate-y-0.5 hover:border-[var(--site-primary)] hover:bg-[var(--site-surface-alt)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-surface)]"
              href={secondaryCtaHref}
            >
              {LUMEN_COPY.secondaryCta}
            </a>
          </div>
        </m.div>

        <m.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-[var(--site-border)] bg-[var(--site-surface-alt)] sm:mt-16 sm:aspect-[16/8] lg:aspect-[16/7]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
          transition={{ delay: 0.12, duration: 0.9, ease: EASE_OUT }}
        >
          {hero.image ? (
            <HeroVariantMedia
              alt={hero.title}
              appearance={content.appearance}
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              src={hero.image}
            />
          ) : null}
        </m.div>
      </div>
    </section>
  );
}
