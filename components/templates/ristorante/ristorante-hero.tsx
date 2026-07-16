"use client";

import { m, useReducedMotion } from "motion/react";
import type { LandingContent } from "@/lib/dashboard-data";
import { HeroBackground } from "@/components/ui/hero-background";
import { RistoranteButton } from "@/components/templates/ristorante/ristorante-button";
import { useAnalytics } from "@/hooks/use-analytics";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function RistoranteHero({
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
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden lg:block lg:justify-center"
    >
      <m.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: easeOut }}
      >
        <HeroBackground appearance={content.appearance} src={content.hero.image} />
      </m.div>

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ristorante-secondary)]/95 via-[var(--ristorante-secondary)]/45 to-[var(--ristorante-secondary)]/20" />

      <div className="relative z-10 flex w-full flex-col justify-end px-6 pb-[clamp(72px,12vh,120px)] pt-[clamp(120px,18vh,180px)] md:px-10 lg:block lg:justify-center lg:pb-0 lg:pt-[calc(22vh-40px)] lg:px-16">
        <m.div
          className="flex w-full flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: easeOut }}
        >
          <div className="max-w-[18ch] lg:max-w-[14ch]">
            {content.hero.eyebrow ? (
              <p
                className="mb-3 text-sm font-light italic text-[var(--ristorante-foreground)]/85"
                style={{ fontFamily: "var(--font-ristorante-display)" }}
              >
                {content.hero.eyebrow}
              </p>
            ) : null}
            <h1
              className="text-balance text-[clamp(48px,11vw,96px)] font-normal leading-[0.95] text-[var(--ristorante-foreground)]"
              style={{
                fontFamily: "var(--font-ristorante-display)",
                letterSpacing: "-0.03em",
              }}
            >
              {content.hero.title}
            </h1>
          </div>

          <div className="flex max-w-md flex-col gap-8 lg:max-w-xs lg:items-end lg:text-right">
            {content.hero.subtitle ? (
              <p
                className="text-pretty text-base leading-relaxed text-[var(--ristorante-foreground)]/85 lg:text-lg"
                style={{ fontFamily: "var(--font-ristorante-body)", fontWeight: 300 }}
              >
                {content.hero.subtitle}
              </p>
            ) : null}
            <RistoranteButton href={ctaHref} size="lg" variant="accent" onClick={() => trackCtaClick()}>
              {content.hero.ctaLabel || "Reservar mesa"}
            </RistoranteButton>
          </div>
        </m.div>
      </div>
    </section>
  );
}
