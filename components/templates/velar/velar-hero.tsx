import type { LandingContent } from "@/lib/dashboard-data";
import { HeroBackground } from "@/components/ui/hero-background";
import { ArrowRight } from "lucide-react";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";

export function VelarHero({
  content,
  ctaHref,
  heroRef,
  heroVisible,
}: {
  content: LandingContent;
  ctaHref?: string;
  heroRef?: React.RefObject<HTMLElement | null>;
  heroVisible: boolean;
}) {
  if (!heroVisible) {
    return (
      <section
        ref={heroRef}
        data-section="hero"
        data-section-label="Hero"
        id="hero"
        className="relative overflow-visible"
        style={{ minHeight: "100vh" }}
      >
        <HeroBackground appearance={content.appearance} src={content.hero.image} />
      </section>
    );
  }

  return (
    <section
      ref={heroRef}
      data-section="hero"
      data-section-label="Hero"
      id="hero"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-visible lg:block"
    >
      <div className="absolute inset-0" data-velar-hero-background>
        <HeroBackground appearance={content.appearance} src={content.hero.image} />
      </div>

      <div
        className="relative z-10 flex w-full flex-col items-start justify-center lg:block lg:pt-[calc(28vh-50px)]"
      >
        <div
          className="flex w-full justify-start px-6 md:px-10 lg:justify-between lg:px-16"
          data-velar-hero-reveal
          style={{ marginBottom: "-0.04em" }}
        >
          <h1
            data-editor-id="hero:eyebrow"
            className="text-[7.5vw] font-extrabold uppercase text-black sm:text-[5.5vw] lg:text-left lg:text-[3vw]"
            style={{
              fontFamily: "var(--font-syne)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {content.hero.eyebrow}
          </h1>
          <p
            data-editor-id="hero:subtitle"
            className="hidden max-w-75 text-right font-bold opacity-70 lg:block"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(10px, 0.95vw, 14px)",
              lineHeight: 1.6,
              marginBottom: "0.2em",
              letterSpacing: "0.02em",
            }}
          >
            {content.hero.subtitle}
          </p>
        </div>

        <div className="w-full overflow-visible lg:overflow-hidden">
          <h2
            data-editor-id="hero:title"
            data-velar-hero-reveal
            className="max-w-full wrap-break-word px-6 text-[12.5vw] font-extrabold uppercase leading-[0.9] text-black sm:text-[10.5vw] md:px-10 lg:px-16 lg:text-left lg:text-[clamp(52px,6.5vw,9vw)] lg:leading-[0.88] lg:whitespace-nowrap"
            style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.03em" }}
          >
            {content.hero.title}
          </h2>
        </div>

        <p
          data-editor-id="hero:subtitle"
          data-velar-hero-reveal
          className="px-6 font-semibold text-(--site-text)/85 max-lg:[text-shadow:0_1px_12px_rgba(255,255,255,0.6)] lg:hidden"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(12px, 3vw, 15px)",
            marginTop: "0.9em",
          }}
        >
          {content.hero.subtitle}
        </p>

        {content.hero.description ? (
          <p
            data-editor-id="hero:description"
            data-velar-hero-reveal
            className="mt-4 max-w-xl px-6 text-sm font-medium leading-relaxed text-(--site-text)/75 md:px-10 lg:px-16 lg:text-base"
          >
            {content.hero.description}
          </p>
        ) : null}

        {ctaHref && content.hero.ctaLabel ? (
          <div
            className="mt-6 px-6 md:px-10 lg:px-16"
            data-velar-hero-reveal
          >
            <TemplateNavAnchor
              className="inline-flex items-center gap-2 bg-[var(--site-primary)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[var(--site-on-primary)] transition-colors hover:bg-[var(--site-primary-hover)]"
              href={ctaHref}
              data-analytics-event="cta_click"
            >
              {content.hero.ctaLabel}
              <ArrowRight className="size-4" />
            </TemplateNavAnchor>
          </div>
        ) : null}
      </div>
    </section>
  );
}
