"use client";

import { m, useReducedMotion } from "motion/react";
import type { LandingContent } from "@/lib/dashboard-data";
import { CoffeeShopButton } from "@/components/templates/coffee-shop/coffee-shop-button";
import { HeroBackground } from "@/components/ui/hero-background";
import { useAnalytics } from "@/hooks/use-analytics";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function CoffeeShopHero({
  content,
  heroRef,
  ctaHref,
}: {
  content: LandingContent;
  heroRef: React.RefObject<HTMLElement | null>;
  ctaHref: string;
}) {
  const reduce = useReducedMotion();
  const { trackCtaClick } = useAnalytics();

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100dvh] scroll-mt-24 bg-[var(--coffee-surface)] pt-24 lg:grid lg:min-h-[92dvh] lg:grid-cols-2 lg:items-stretch lg:pt-0"
    >
      <div className="flex flex-col justify-center px-6 py-16 md:px-10 lg:px-16 lg:py-24">
        <m.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          {content.hero.eyebrow ? (
            <p
              className="mb-4 text-sm font-medium text-[var(--coffee-accent)]"
              style={{ fontFamily: "var(--font-coffee-body)" }}
            >
              {content.hero.eyebrow}
            </p>
          ) : null}
          <h1
            className="text-balance text-[clamp(40px,8vw,96px)] font-semibold leading-[1.02] text-[var(--coffee-secondary)]"
            style={{
              fontFamily: "var(--font-coffee-display)",
              letterSpacing: "-0.03em",
            }}
          >
            {content.hero.title}
          </h1>
          {content.hero.subtitle ? (
            <p
              className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-[var(--coffee-secondary)]/80"
              style={{ fontFamily: "var(--font-coffee-body)" }}
            >
              {content.hero.subtitle}
            </p>
          ) : null}
          {content.hero.description ? (
            <p
              className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-[var(--coffee-secondary)]/65"
              style={{ fontFamily: "var(--font-coffee-body)" }}
            >
              {content.hero.description}
            </p>
          ) : null}
          <div className="mt-10">
            <CoffeeShopButton href={ctaHref} size="lg" variant="accent" onClick={() => trackCtaClick()}>
              {content.hero.ctaLabel || "Ver carta"}
            </CoffeeShopButton>
          </div>
        </m.div>
      </div>

      <m.div
        className="relative min-h-[42vh] lg:min-h-0"
        initial={reduce ? false : { opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
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
      </m.div>
    </section>
  );
}
