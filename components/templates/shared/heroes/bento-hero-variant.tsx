import { ArrowRight } from "lucide-react";
import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { HeroVariantMedia } from "@/components/templates/shared/heroes/hero-variant-media";

const BENTO_COPY = {
  primaryCtaFallback: "Crear mi página",
  secondaryCta: "Ver demostración",
  metricLabel: "Resultados este mes",
  metricValue: "+34%",
  chartLabel: "Rendimiento semanal",
} as const;


export function BentoHeroVariant({
  content,
  heroRef,
  primaryCtaHref,
  secondaryCtaHref,
}: HeroVariantProps) {
  const { hero, stats } = content;

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-[var(--site-surface)] px-5 pb-16 pt-28 text-[var(--site-text)] sm:px-8 sm:pt-32 lg:px-12"
      id="hero"
      ref={heroRef}
    >
      <div aria-hidden className="absolute -right-32 top-0 size-[34rem] rounded-full bg-[var(--site-primary)]/15 blur-3xl" />
      <div aria-hidden className="absolute -bottom-48 -left-40 size-[30rem] rounded-full bg-[var(--site-accent)]/20 blur-3xl" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-8rem)] w-full max-w-7xl items-center gap-14 py-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:py-16">
        <div
        >
          {hero.eyebrow ? (
            <p className="mb-5 flex items-center gap-3 font-body font-semibold uppercase tracking-[0.18em] text-[var(--site-primary)] text-site-content">
              <span aria-hidden className="h-px w-8 bg-[var(--site-primary)]" />
              {hero.eyebrow}
            </p>
          ) : null}
          <h1 className="text-balance font-headline font-bold leading-[0.96] tracking-[-0.06em] text-site-title-lg">
            {hero.title}
            {hero.subtitle ? (
              <span className="block text-[var(--site-primary)]">{hero.subtitle}</span>
            ) : null}
          </h1>
          {hero.description ? (
            <p className="mt-6 max-w-xl text-pretty font-body leading-relaxed text-[var(--site-text-muted)] text-site-subtitle">
              {hero.description}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-[var(--site-primary)] px-6 py-3 font-body font-bold text-[var(--site-on-primary)] shadow-xl shadow-[var(--site-primary)]/20 transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[var(--site-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-primary)] focus-visible:ring-offset-2 text-site-button"
              href={primaryCtaHref}
              data-analytics-event="cta_click"
            >
              {hero.ctaLabel || BENTO_COPY.primaryCtaFallback}
              <ArrowRight aria-hidden className="size-4" />
            </a>
            <a
              className="inline-flex min-h-13 items-center justify-center rounded-xl border border-[var(--site-border)] px-6 py-3 font-body font-bold text-[var(--site-text)] transition-[transform,background-color,border-color] hover:-translate-y-0.5 hover:border-[var(--site-primary)] hover:bg-[var(--site-surface-alt)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-primary)] text-site-button"
              href={secondaryCtaHref}
            >
              {BENTO_COPY.secondaryCta}
            </a>
          </div>
          {stats.length > 0 ? (
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-4 text-[var(--site-text-muted)] text-site-content">
              {stats[0] ? <p><strong className="block text-[var(--site-text)] text-site-content">{stats[0].value}</strong>{stats[0].label}</p> : null}
              {stats[1] ? <p><strong className="block text-[var(--site-text)] text-site-content">{stats[1].value}</strong>{stats[1].label}</p> : null}
              {stats[2] ? <p><strong className="block text-[var(--site-text)] text-site-content">{stats[2].value}</strong>{stats[2].label}</p> : null}
            </div>
          ) : null}
        </div>

        <div
          aria-label="Vista previa visual del producto"
          className="grid min-h-[30rem] grid-cols-2 grid-rows-[1fr_0.7fr] gap-3 [transform-style:preserve-3d] lg:min-h-[35rem] lg:[transform:perspective(1000px)_rotateY(-4deg)_rotateX(2deg)]"
          role="img"
        >
          <div aria-hidden className="relative col-span-2 row-start-1 overflow-hidden rounded-[1.4rem] border border-[var(--site-border)] bg-[var(--site-surface-alt)] p-3 shadow-2xl sm:col-span-1 sm:row-span-2 sm:row-start-1 sm:p-5">
            <div className="relative size-full min-h-56 overflow-hidden rounded-xl">
              {hero.image ? (
                <HeroVariantMedia alt="" appearance={content.appearance} className="object-cover" priority sizes="(max-width: 1024px) 100vw, 42vw" src={hero.image} />
              ) : null}
            </div>
          </div>
          <div aria-hidden className="flex flex-col justify-between rounded-[1.4rem] bg-[var(--site-primary)] p-5 text-[var(--site-on-primary)] shadow-xl sm:p-6">
            <span className="opacity-70 text-site-content">{stats[0]?.label || BENTO_COPY.metricLabel}</span>
            <strong className="font-headline tracking-[-0.06em] text-site-title">{stats[0]?.value || BENTO_COPY.metricValue}</strong>
          </div>
          <div aria-hidden className="rounded-[1.4rem] border border-[var(--site-border)] bg-[var(--site-surface)]/80 p-5 shadow-xl backdrop-blur-md sm:p-6">
            <strong className="font-body text-site-content">{BENTO_COPY.chartLabel}</strong>
            <div className="mt-7 flex h-20 items-end gap-2">
              <span className="h-[35%] flex-1 rounded-t bg-[var(--site-primary)]/20" />
              <span className="h-[62%] flex-1 rounded-t bg-[var(--site-primary)]/30" />
              <span className="h-[45%] flex-1 rounded-t bg-[var(--site-primary)]/25" />
              <span className="h-[82%] flex-1 rounded-t bg-[var(--site-primary)]" />
              <span className="h-[68%] flex-1 rounded-t bg-[var(--site-primary)]/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
