import type { LandingContent } from "@/lib/dashboard-data";
import { CoffeeShopButton } from "@/components/templates/coffee-shop/coffee-shop-button";
import { HeroBackground } from "@/components/ui/hero-background";


export function CoffeeShopHero({
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
      className="relative min-h-[100dvh] scroll-mt-24 bg-[var(--coffee-surface)] pt-24 lg:grid lg:min-h-[92dvh] lg:grid-cols-2 lg:items-stretch lg:pt-0"
    >
      <div className="flex flex-col justify-center px-6 py-16 md:px-10 lg:px-16 lg:py-24">
        <div
        >
          {content.hero.eyebrow ? (
            <p
              className="mb-4 font-medium text-[var(--coffee-accent)] text-site-content"
              style={{ fontFamily: "var(--font-coffee-body)" }}
            >
              {content.hero.eyebrow}
            </p>
          ) : null}
          <h1
            className="text-balance font-semibold leading-[1.02] text-[var(--coffee-secondary)] text-site-title-lg"
            style={{
              fontFamily: "var(--font-coffee-display)",
              letterSpacing: "-0.03em",
            }}
          >
            {content.hero.title}
          </h1>
          {content.hero.subtitle ? (
            <p
              className="mt-6 max-w-md text-pretty leading-relaxed text-[var(--coffee-secondary)]/80 text-site-subtitle"
              style={{ fontFamily: "var(--font-coffee-body)" }}
            >
              {content.hero.subtitle}
            </p>
          ) : null}
          {content.hero.description ? (
            <p
              className="mt-3 max-w-md text-pretty leading-relaxed text-[var(--coffee-secondary)]/65 text-site-content"
              style={{ fontFamily: "var(--font-coffee-body)" }}
            >
              {content.hero.description}
            </p>
          ) : null}
          <div className="mt-10">
            <CoffeeShopButton href={ctaHref} size="lg" variant="accent" data-analytics-event="cta_click">
              {content.hero.ctaLabel || "Ver carta"}
            </CoffeeShopButton>
          </div>
        </div>
      </div>

      <div
        className="relative min-h-[42vh] lg:min-h-0"
      >
        {content.hero.image ? (
          <HeroBackground
            appearance={content.appearance}
            className="bg-center"
            src={content.hero.image}
          />
        ) : (
          <div className="h-full w-full bg-[var(--coffee-primary)]/20" />
        )}
        <div className="absolute inset-0 bg-[var(--coffee-secondary)]/10 lg:hidden" />
      </div>
    </section>
  );
}
