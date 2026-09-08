import type { RefObject } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { HeroBackground } from "@/components/ui/hero-background";
import { CalendarCheck } from "lucide-react";
import { VelarButton } from "@/components/templates/velar/velar-button";
import { VELAR_CTA_LABEL } from "@/lib/velar-links";

export function VelarHero({
  content,
  ctaHref,
  heroRef,
  heroVisible,
}: {
  content: LandingContent;
  ctaHref?: string;
  heroRef?: RefObject<HTMLElement | null>;
  heroVisible: boolean;
}) {
  const ctaLabel = content.hero.ctaLabel.trim() || VELAR_CTA_LABEL;
  const isWhatsAppCta = Boolean(ctaHref?.includes("wa.me"));

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
            className="font-extrabold uppercase text-black lg:text-left"
            style={{
              fontFamily: "var(--font-syne)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              fontSize: "calc(var(--site-text-title) * 0.7)",
            }}
          >
            {content.hero.eyebrow}
          </h1>
          <p
            data-editor-id="hero:subtitle"
            className="hidden max-w-75 text-right font-bold opacity-70 lg:block"
            style={{
              fontFamily: "var(--font-syne)",
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
            className="max-w-full wrap-break-word px-6 font-extrabold uppercase leading-[0.9] text-black md:px-10 lg:px-16 lg:text-left lg:leading-[0.88] lg:whitespace-nowrap"
            style={{
              fontFamily: "var(--font-syne)",
              letterSpacing: "-0.03em",
              fontSize: "calc(var(--site-text-title) * 0.85)",
            }}
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
marginTop: "0.9em",
          }}
        >
          {content.hero.subtitle}
        </p>

        {content.hero.description ? (
          <p
            data-editor-id="hero:description"
            data-velar-hero-reveal
            className="mt-4 max-w-xl px-6 font-medium leading-relaxed text-(--site-text)/75 md:px-10 lg:px-16 text-site-content"
          >
            {content.hero.description}
          </p>
        ) : null}

        {ctaHref ? (
          <div
            className="mt-6 px-6 md:px-10 lg:px-16"
            data-velar-hero-reveal
          >
            <VelarButton
              className="uppercase"
              data-analytics-event={isWhatsAppCta ? "whatsapp_click" : "cta_click"}
              href={ctaHref}
              icon={<CalendarCheck className="h-5 w-5" />}
              size="md"
              variant="primary"
            >
              {ctaLabel}
            </VelarButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}
