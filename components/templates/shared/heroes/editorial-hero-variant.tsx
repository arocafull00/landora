import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { HeroVariantMedia } from "@/components/templates/shared/heroes/hero-variant-media";

const EDITORIAL_COPY = {
  primaryCtaFallback: "Empezar proyecto",
  secondaryCta: "Ver nuestro trabajo",
  verticalLabel: "Estrategia / Diseño / Desarrollo",
} as const;


export function EditorialHeroVariant({
  content,
  heroRef,
  primaryCtaHref,
  secondaryCtaHref,
}: HeroVariantProps) {
  const { hero } = content;

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-[var(--site-dark)] px-5 pb-16 pt-28 text-[var(--site-on-dark)] sm:px-8 sm:pt-32 lg:px-12"
      id="hero"
      ref={heroRef}
    >
      <div className="absolute inset-0 scale-[1.02]">
        {hero.image ? (
          <HeroVariantMedia
            alt=""
            appearance={content.appearance}
            className="object-cover"
            priority
            sizes="100vw"
            src={hero.image}
          />
        ) : null}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--site-dark)] via-[var(--site-dark)]/85 to-[var(--site-dark)]/20" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 [background-image:linear-gradient(var(--site-on-dark)_1px,transparent_1px),linear-gradient(90deg,var(--site-on-dark)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_right,black,transparent_80%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-8rem)] w-full max-w-7xl items-center py-14 sm:py-20">
        <div
          className="max-w-5xl"
        >
          {hero.eyebrow ? (
            <p className="mb-6 flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[var(--site-on-dark)]/70">
              <span aria-hidden className="h-px w-8 bg-[var(--site-on-dark)]/70" />
              {hero.eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-5xl text-balance font-headline text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
            {hero.title}
            {hero.subtitle ? (
              <span className="block text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--site-on-dark)_58%,transparent)]">
                {hero.subtitle}
              </span>
            ) : null}
          </h1>
          {hero.description ? (
            <p className="mt-7 max-w-2xl text-pretty font-body text-lg leading-relaxed text-[var(--site-on-dark)]/70 sm:text-xl">
              {hero.description}
            </p>
          ) : null}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-[var(--site-on-dark)] px-6 py-3 font-body text-sm font-bold text-[var(--site-dark)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[var(--site-surface-alt)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-on-dark)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-dark)]"
              href={primaryCtaHref}
              data-analytics-event="cta_click"
            >
              {hero.ctaLabel || EDITORIAL_COPY.primaryCtaFallback}
              <ArrowRight aria-hidden className="size-4" />
            </a>
            <a
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-[var(--site-on-dark)]/25 bg-[var(--site-on-dark)]/10 px-6 py-3 font-body text-sm font-bold text-[var(--site-on-dark)] backdrop-blur-sm transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[var(--site-on-dark)]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-on-dark)]"
              href={secondaryCtaHref}
            >
              {EDITORIAL_COPY.secondaryCta}
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <p className="absolute right-7 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] font-body text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-[var(--site-on-dark)]/45 xl:block">
        {EDITORIAL_COPY.verticalLabel}
      </p>
    </section>
  );
}
