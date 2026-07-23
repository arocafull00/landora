"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import type { LandingContent } from "@/lib/dashboard-data";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";
import { HeroVariantMedia } from "@/components/templates/shared/heroes/hero-variant-media";
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
      className="min-h-dvh bg-portfolio-canvas px-4 pb-4 pt-24 text-portfolio-ink sm:px-6 sm:pb-6 sm:pt-28 md:px-10 md:pb-10 md:pt-32 lg:px-16"
      id="hero"
      ref={heroRef}
    >
      <div className="mx-auto grid max-w-375 grid-cols-1 border-l border-t border-portfolio-line md:min-h-[calc(100dvh-9rem)] md:grid-cols-12">
        <m.div
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-64 flex-col justify-between border-b border-r border-portfolio-line p-5 sm:min-h-72 sm:p-6 md:col-span-7 md:min-h-[52dvh] md:p-10 lg:p-14"
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
            className="max-w-[12ch] text-balance text-[clamp(2rem,14vw,3.5rem)] font-bold leading-[0.92] tracking-[-0.035em] wrap-anywhere md:text-[clamp(3rem,7.5vw,5rem)] md:leading-[0.9]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {content.hero.title}
          </h1>
        </m.div>

        <m.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[4/3] overflow-hidden border-b border-r border-portfolio-line sm:aspect-[16/10] md:col-span-5 md:aspect-auto md:min-h-0"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          transition={{ delay: 0.08, duration: 0.8, ease: easeOut }}
        >
          {heroImage ? (
            <HeroVariantMedia
              alt={content.hero.title}
              appearance={content.appearance}
              className="object-cover object-center transition-transform duration-700 hover:scale-[1.025] motion-reduce:transition-none"
              priority
              quality={95}
              sizes="(min-width: 1500px) 625px, (min-width: 768px) 42vw, 100vw"
              src={heroImage}
            />
          ) : (
            <div className="flex h-full items-end p-5 text-sm leading-6 text-portfolio-ink-muted sm:p-6 md:p-8 md:text-base">
              {content.hero.description || content.hero.subtitle}
            </div>
          )}
        </m.div>

        <div className="flex min-h-28 items-end justify-between gap-6 border-b border-r border-portfolio-line p-5 sm:p-6 md:col-span-4 md:min-h-60 md:flex-col md:items-start md:p-8">
          <span className="max-w-[30ch] text-pretty text-sm leading-6 text-portfolio-ink-muted">
            {content.hero.description}
          </span>
          <ArrowDownRight
            aria-hidden
            className="shrink-0 text-portfolio-accent"
            size={30}
          />
        </div>

        <div className="relative hidden min-h-64 overflow-hidden border-b border-r border-portfolio-line md:col-span-4 md:block md:min-h-60">
          {secondaryImage ? (
            <HeroVariantMedia
              alt=""
              appearance={content.appearance}
              className="object-cover object-center"
              quality={95}
              sizes="(min-width: 1500px) 500px, 33vw"
              src={secondaryImage}
            />
          ) : null}
        </div>

        <div className="flex min-h-44 flex-col justify-between border-b border-r border-portfolio-line bg-portfolio-accent p-5 text-portfolio-accent-ink transition-colors hover:bg-[var(--portfolio-accent-hover)] focus-within:bg-[var(--portfolio-accent-hover)] sm:p-6 md:col-span-4 md:min-h-60 md:p-8">
          <p className="max-w-[28ch] text-pretty text-sm leading-6 sm:text-base sm:leading-7">
            {content.hero.subtitle}
          </p>
          <TemplateNavAnchor
            className="group flex min-h-11 items-center justify-between gap-6 text-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent-ink"
            href={ctaHref}
            onClick={() => trackCtaClick()}
          >
            {content.hero.ctaLabel || "Ver proyectos"}
            <ArrowUpRight
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              size={25}
            />
          </TemplateNavAnchor>
        </div>
      </div>
    </section>
  );
}
