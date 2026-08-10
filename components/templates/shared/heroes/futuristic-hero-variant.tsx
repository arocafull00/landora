import { ArrowRight, Sparkles } from "lucide-react";
import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";

const FUTURISTIC_COPY = {
  primaryCtaFallback: "Empieza gratis",
  secondaryCta: "Explorar plataforma",
} as const;


export function FuturisticHeroVariant({
  content,
  heroRef,
  primaryCtaHref,
  secondaryCtaHref,
}: HeroVariantProps) {
  const { hero, stats } = content;

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-[var(--site-dark)] px-5 pb-0 pt-28 text-[var(--site-on-dark)] sm:px-8 sm:pt-32 lg:px-12"
      id="hero"
      ref={heroRef}
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,color-mix(in_srgb,var(--site-primary)_48%,transparent),transparent_42%),radial-gradient(circle_at_78%_20%,color-mix(in_srgb,var(--site-accent)_28%,transparent),transparent_30%)]" />
      <div aria-hidden className="absolute inset-0 opacity-20 [background-image:linear-gradient(var(--site-accent)_1px,transparent_1px),linear-gradient(90deg,var(--site-accent)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)] [transform:perspective(700px)_rotateX(62deg)_scale(1.5)_translateY(30%)] [transform-origin:bottom]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-8rem)] w-full max-w-7xl flex-col items-center pt-12 text-center sm:pt-16">
        <p
          className="inline-flex items-center gap-2 rounded-full border border-[var(--site-accent)]/30 bg-[var(--site-on-dark)]/5 px-4 py-2 font-body font-semibold uppercase tracking-[0.14em] text-[var(--site-accent)] backdrop-blur-md text-site-content"
        >
          <Sparkles aria-hidden className="size-3.5" />
          {hero.eyebrow}
        </p>
        <h1
          className="mt-6 max-w-6xl text-balance font-headline font-bold leading-[0.94] tracking-[-0.065em] text-site-title-lg"
        >
          {hero.title}
          {hero.subtitle ? (
            <span className="block bg-gradient-to-r from-[var(--site-on-dark)] via-[var(--site-accent)] to-[var(--site-primary)] bg-clip-text text-transparent">
              {hero.subtitle}
            </span>
          ) : null}
        </h1>
        {hero.description ? (
          <p
            className="mt-6 max-w-2xl text-pretty font-body leading-relaxed text-[var(--site-on-dark)]/65 text-site-subtitle"
          >
            {hero.description}
          </p>
        ) : null}
        <div
          className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row"
        >
          <a
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[var(--site-on-dark)] px-6 py-3 font-body font-bold text-[var(--site-dark)] shadow-[0_0_45px_color-mix(in_srgb,var(--site-primary)_28%,transparent)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-on-dark)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-dark)] text-site-button"
            href={primaryCtaHref}
            data-analytics-event="cta_click"
          >
            {hero.ctaLabel || FUTURISTIC_COPY.primaryCtaFallback}
            <ArrowRight aria-hidden className="size-4" />
          </a>
          <a
            className="inline-flex min-h-13 items-center justify-center rounded-full border border-[var(--site-accent)]/30 bg-[var(--site-on-dark)]/5 px-6 py-3 font-body font-bold text-[var(--site-on-dark)] backdrop-blur-md transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[var(--site-on-dark)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] text-site-button"
            href={secondaryCtaHref}
          >
            {FUTURISTIC_COPY.secondaryCta}
          </a>
        </div>

        <div
          aria-label="Vista previa del panel de control"
          className="relative mt-12 h-80 w-[min(58rem,92vw)] overflow-hidden rounded-t-3xl border border-b-0 border-[var(--site-accent)]/25 bg-[var(--site-on-dark)]/5 p-2.5 shadow-[0_-30px_100px_color-mix(in_srgb,var(--site-primary)_22%,transparent)] [transform-origin:bottom] sm:h-96"
          role="img"
        >
          <div aria-hidden className="h-full overflow-hidden rounded-t-2xl bg-[var(--site-dark)] text-left">
            <div className="flex h-11 items-center gap-1.5 border-b border-[var(--site-on-dark)]/10 px-4">
              <span className="size-2 rounded-full bg-[var(--site-text-muted)]" />
              <span className="size-2 rounded-full bg-[var(--site-text-muted)]" />
              <span className="size-2 rounded-full bg-[var(--site-text-muted)]" />
            </div>
            <div className="grid h-[calc(100%-2.75rem)] grid-cols-[4.5rem_1fr] sm:grid-cols-[10rem_1fr]">
              <div className="space-y-4 border-r border-[var(--site-on-dark)]/10 p-3 sm:p-5">
                <span className="block h-2.5 w-3/4 rounded bg-[var(--site-primary)]" />
                <span className="block h-2.5 rounded bg-[var(--site-on-dark)]/10" />
                <span className="block h-2.5 rounded bg-[var(--site-on-dark)]/10" />
                <span className="block h-2.5 rounded bg-[var(--site-on-dark)]/10" />
              </div>
              <div className="p-4 sm:p-6">
                <span className="block h-4 w-1/3 rounded bg-[var(--site-on-dark)]/75" />
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="h-20 rounded-xl border border-[var(--site-on-dark)]/10 bg-[var(--site-on-dark)]/5 p-3"><span className="block h-2 w-1/2 rounded bg-[var(--site-on-dark)]/15" /><strong className="mt-3 block text-[var(--site-accent)] text-site-content">{stats[0]?.value || "24K"}</strong></div>
                  <div className="h-20 rounded-xl border border-[var(--site-on-dark)]/10 bg-[var(--site-on-dark)]/5 p-3"><span className="block h-2 w-1/2 rounded bg-[var(--site-on-dark)]/15" /><strong className="mt-3 block text-[var(--site-accent)] text-site-content">{stats[1]?.value || "+18%"}</strong></div>
                  <div className="hidden h-20 rounded-xl border border-[var(--site-on-dark)]/10 bg-[var(--site-on-dark)]/5 p-3 sm:block"><span className="block h-2 w-1/2 rounded bg-[var(--site-on-dark)]/15" /><strong className="mt-3 block text-[var(--site-accent)] text-site-content">{stats[2]?.value || "99.9%"}</strong></div>
                </div>
                <div className="relative mt-3 h-28 overflow-hidden rounded-xl border border-[var(--site-on-dark)]/10 bg-gradient-to-b from-[var(--site-primary)]/15 to-transparent">
                  <svg aria-hidden className="absolute inset-4 size-[calc(100%-2rem)]" preserveAspectRatio="none" viewBox="0 0 600 100">
                    <path d="M0 82 C70 80,80 48,145 58 S230 78,286 40 S390 62,445 25 S545 34,600 4" fill="none" stroke="var(--site-accent)" strokeLinecap="round" strokeWidth="4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
