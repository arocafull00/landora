"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import type { LandingContent } from "@/lib/dashboard-data";
import { HeroBackground } from "@/components/ui/hero-background";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";
import { useAnalytics } from "@/hooks/use-analytics";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function PortfolioHero({
  content,
  heroRef,
  ctaHref,
}: {
  content: LandingContent;
  heroRef: React.RefObject<HTMLElement | null>;
  ctaHref: string;
}) {
  const { trackCtaClick } = useAnalytics();
  const reduceMotion = useReducedMotion() ?? false;
  const heroImage = content.hero.image;
  const secondaryImage = content.hero.houseImage || heroImage;

  return (
    <section
      className="min-h-dvh bg-portfolio-canvas px-4 pb-6 pt-28 text-portfolio-ink sm:px-6 md:px-10 md:pb-10 md:pt-32 lg:px-16"
      id="hero"
      ref={heroRef}
    >
      <div className="mx-auto grid min-h-[calc(100dvh-9rem)] max-w-[1500px] grid-cols-1 border-l border-t border-portfolio-line md:grid-cols-12">
        <m.div
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-72 flex-col justify-between border-b border-r border-portfolio-line p-6 md:col-span-7 md:min-h-[52dvh] md:p-10 lg:p-14"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          {content.hero.eyebrow ? (
            <p className="max-w-sm text-sm leading-6 text-portfolio-ink-muted">
              {content.hero.eyebrow}
            </p>
          ) : (
            <span />
          )}
          <h1
            className="max-w-[12ch] text-balance text-[clamp(3rem,7.5vw,6rem)] font-bold leading-[0.9] tracking-[-0.035em]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {content.hero.title}
          </h1>
        </m.div>

        <m.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative min-h-[42dvh] overflow-hidden border-b border-r border-portfolio-line md:col-span-5 md:min-h-0"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          transition={{ delay: 0.08, duration: 0.8, ease: easeOut }}
        >
          {heroImage ? (
            <HeroBackground
              appearance={content.appearance}
              className="bg-center transition-transform duration-700 hover:scale-[1.025]"
              src={heroImage}
            />
          ) : (
            <div className="flex h-full items-end p-8 text-portfolio-ink-muted">
              {content.hero.description || content.hero.subtitle}
            </div>
          )}
        </m.div>

        <div className="flex min-h-48 flex-col justify-between border-b border-r border-portfolio-line p-6 md:col-span-4 md:min-h-60 md:p-8">
          <span className="max-w-[30ch] text-pretty text-sm leading-6 text-portfolio-ink-muted">
            {content.hero.description}
          </span>
          <ArrowDownRight aria-hidden className="text-portfolio-accent" size={30} />
        </div>

        <div className="relative min-h-64 overflow-hidden border-b border-r border-portfolio-line md:col-span-4 md:min-h-60">
          {secondaryImage ? (
            <HeroBackground
              appearance={content.appearance}
              className="bg-center"
              src={secondaryImage}
            />
          ) : null}
        </div>

        <div className="flex min-h-56 flex-col justify-between border-b border-r border-portfolio-line bg-portfolio-accent p-6 text-portfolio-accent-ink md:col-span-4 md:min-h-60 md:p-8">
          <p className="max-w-[28ch] text-pretty text-base leading-7">
            {content.hero.subtitle}
          </p>
          <TemplateNavAnchor
            className="flex items-end justify-between gap-6 text-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent-ink"
            href={ctaHref}
            onClick={() => trackCtaClick()}
          >
            {content.hero.ctaLabel || "Ver proyectos"}
            <ArrowUpRight aria-hidden size={25} />
          </TemplateNavAnchor>
        </div>
      </div>
    </section>
  );
}
