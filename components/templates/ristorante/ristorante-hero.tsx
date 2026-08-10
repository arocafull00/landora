import type { LandingContent } from "@/lib/dashboard-data";
import { HeroBackground } from "@/components/ui/hero-background";
import { RistoranteButton } from "@/components/templates/ristorante/ristorante-button";


export function RistoranteHero({
  content,
  heroRef,
  ctaHref,
}: {
  content: LandingContent;
  heroRef?: React.RefObject<HTMLElement | null>;
  ctaHref: string;
}) {

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden lg:block lg:justify-center"
    >
      <div
        className="absolute inset-0"
      >
        <HeroBackground appearance={content.appearance} src={content.hero.image} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ristorante-secondary)]/95 via-[var(--ristorante-secondary)]/45 to-[var(--ristorante-secondary)]/20" />

      <div className="relative z-10 flex w-full flex-col justify-end px-6 pb-[clamp(72px,12vh,120px)] pt-[clamp(120px,18vh,180px)] md:px-10 lg:block lg:justify-center lg:pb-0 lg:pt-[calc(22vh-40px)] lg:px-16">
        <div
          className="flex w-full flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        >
          <div className="max-w-[18ch] lg:max-w-[14ch]">
            {content.hero.eyebrow ? (
              <p
                className="mb-3 font-light italic text-[var(--ristorante-foreground)]/85 text-site-content"
                style={{ fontFamily: "var(--font-ristorante-display)" }}
              >
                {content.hero.eyebrow}
              </p>
            ) : null}
            <h1
              className="text-balance font-normal leading-[0.95] text-[var(--ristorante-foreground)] text-site-title-lg"
              style={{
                fontFamily: "var(--font-ristorante-display)",
                letterSpacing: "-0.03em",
              }}
            >
              {content.hero.title}
            </h1>
          </div>

          <div className="flex max-w-md flex-col gap-8 lg:max-w-xs lg:items-end lg:text-right text-site-content">
            {content.hero.subtitle ? (
              <p
                className="text-pretty leading-relaxed text-[var(--ristorante-foreground)]/85 text-site-subtitle"
                style={{ fontFamily: "var(--font-ristorante-body)", fontWeight: 300 }}
              >
                {content.hero.subtitle}
              </p>
            ) : null}
            {content.hero.description ? (
              <p
                className="text-pretty leading-relaxed text-[var(--ristorante-foreground)]/70 text-site-content"
                style={{ fontFamily: "var(--font-ristorante-body)", fontWeight: 300 }}
              >
                {content.hero.description}
              </p>
            ) : null}
            <RistoranteButton href={ctaHref} size="lg" variant="accent" data-analytics-event="cta_click">
              {content.hero.ctaLabel || "Reservar mesa"}
            </RistoranteButton>
          </div>
        </div>
      </div>
    </section>
  );
}
