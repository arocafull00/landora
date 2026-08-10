import type { LandingContent } from "@/lib/dashboard-data";
import { isBackgroundPreset } from "@/lib/background-assets";
import { resolveFloristeriaFanImages } from "@/lib/floristeria-assets";
import { FloristeriaButton } from "@/components/templates/floristeria/floristeria-button";
import { FloristeriaHeroFan } from "@/components/templates/floristeria/floristeria-hero-fan";
import { FloristeriaHeroFanBackdrop } from "@/components/templates/floristeria/floristeria-hero-fan-backdrop";
import { HeroBackground } from "@/components/ui/hero-background";

export function FloristeriaHero({
  content,
  heroRef,
  ctaHref,
  secondaryCtaHref = "#galeria",
}: {
  content: LandingContent;
  heroRef?: React.RefObject<HTMLElement | null>;
  ctaHref: string;
  secondaryCtaHref?: string;
}) {
  const fanImages = resolveFloristeriaFanImages(content.hero);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-dvh overflow-x-clip bg-[var(--site-surface)]"
    >
      {isBackgroundPreset(content.hero.image) ? (
        <HeroBackground
          appearance={content.appearance}
          src={content.hero.image}
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <FloristeriaHeroFanBackdrop />
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 md:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <FloristeriaHeroFan centerImageAlt={content.hero.title} images={fanImages} />

        <div
          className="relative z-20 mt-5 max-w-3xl text-center sm:mt-6 md:mt-8"
        >
          {content.hero.eyebrow ? (
            <p
              className="mb-2 font-light italic text-[var(--site-primary)]/80 text-site-content"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {content.hero.eyebrow}
            </p>
          ) : null}

          <h1
            className="text-balance font-bold leading-[1.08] tracking-tight text-[var(--site-text)] text-site-title-lg"
            style={{
              fontFamily: "var(--font-cormorant)",
              letterSpacing: "-0.03em",
            }}
          >
            {content.hero.title}
          </h1>

          {content.hero.subtitle ? (
            <p
              className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-[var(--site-text)]/60 md:mt-4 text-site-subtitle"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {content.hero.subtitle}
            </p>
          ) : null}

          {content.hero.description ? (
            <p
              className="mx-auto mt-2 max-w-xl text-pretty leading-relaxed text-[var(--site-text)]/55 text-site-content"
            >
              {content.hero.description}
            </p>
          ) : null}

          <div
            className="mx-auto mt-6 flex w-full max-w-xs flex-col items-center gap-3 sm:mt-7 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
          >
            <FloristeriaButton href={ctaHref} size="lg" className="w-full sm:w-auto" data-analytics-event="cta_click">
              {content.hero.ctaLabel || "Hacer pedido"}
            </FloristeriaButton>
            <FloristeriaButton
              href={secondaryCtaHref}
              variant="secondary"
              size="lg"
              icon={null}
              className="w-full sm:w-auto"
            >
              Ver galería
            </FloristeriaButton>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
