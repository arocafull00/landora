"use client";

import { m, useReducedMotion } from "motion/react";
import type { LandingContent } from "@/lib/dashboard-data";
import { HeroBackground } from "@/components/ui/hero-background";
import { useEditorHighlight } from "@/lib/use-editor-highlight";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";
import { useAnalytics } from "@/hooks/use-analytics";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function VelarHero({
  content,
  ctaHref,
  heroRef,
  heroVisible,
}: {
  content: LandingContent;
  ctaHref?: string;
  heroRef: React.RefObject<HTMLElement | null>;
  heroVisible: boolean;
}) {
  const reduce = useReducedMotion();
  const isHighlighted = useEditorHighlight("hero");
  const { trackCtaClick } = useAnalytics();

  if (!heroVisible) {
    return (
      <section
        ref={heroRef}
        data-section="hero"
        data-section-label="Hero"
        id="hero"
        className={cn(
          "relative overflow-visible",
          isHighlighted && "template-section--highlighted",
        )}
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
      className={cn(
        "relative flex min-h-[100dvh] flex-col items-center justify-center overflow-visible lg:block",
        isHighlighted && "template-section--highlighted",
      )}
    >
      <m.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: easeOut }}
      >
        <HeroBackground appearance={content.appearance} src={content.hero.image} />
      </m.div>

      <div className="relative z-10 flex w-full flex-col items-start justify-center lg:block lg:pt-[calc(28vh-50px)]">
        <m.div
          className="flex w-full justify-start px-6 md:px-10 lg:justify-between lg:px-16"
          style={{ marginBottom: "-0.04em" }}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: easeOut }}
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
          <m.p
            data-editor-id="hero:subtitle"
            className="hidden max-w-[300px] text-right font-bold opacity-70 lg:block"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(10px, 0.95vw, 14px)",
              lineHeight: 1.6,
              marginBottom: "0.2em",
              letterSpacing: "0.02em",
            }}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95, ease: easeOut }}
          >
            {content.hero.subtitle}
          </m.p>
        </m.div>

        <div className="w-full overflow-visible lg:overflow-hidden">
          <m.h2
            data-editor-id="hero:title"
            className="max-w-full break-words px-6 text-[12.5vw] font-extrabold uppercase leading-[0.9] text-black sm:text-[10.5vw] md:px-10 lg:px-16 lg:text-left lg:text-[clamp(52px,6.5vw,9vw)] lg:leading-[0.88] lg:whitespace-nowrap"
            style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.03em" }}
            initial={reduce ? false : { y: "108%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: 0.42, ease: easeOut }}
          >
            {content.hero.title}
          </m.h2>
        </div>

        <m.p
          data-editor-id="hero:subtitle"
          className="px-6 font-semibold text-[var(--site-text)]/85 max-lg:[text-shadow:0_1px_12px_rgba(255,255,255,0.6)] lg:hidden"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(12px, 3vw, 15px)",
            marginTop: "0.9em",
          }}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: easeOut }}
        >
          {content.hero.subtitle}
        </m.p>

        {content.hero.description ? (
          <m.p
            data-editor-id="hero:description"
            className="mt-4 max-w-xl px-6 text-sm font-medium leading-relaxed text-[var(--site-text)]/75 md:px-10 lg:px-16 lg:text-base"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: easeOut }}
          >
            {content.hero.description}
          </m.p>
        ) : null}

        {ctaHref && content.hero.ctaLabel ? (
          <m.div
            className="mt-6 px-6 md:px-10 lg:px-16"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.08, ease: easeOut }}
          >
            <TemplateNavAnchor
              className="inline-flex items-center gap-2 bg-[var(--site-primary)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[var(--site-on-primary)] transition-colors hover:bg-[var(--site-primary-hover)]"
              href={ctaHref}
              onClick={() => trackCtaClick()}
            >
              {content.hero.ctaLabel}
              <ArrowRight className="size-4" />
            </TemplateNavAnchor>
          </m.div>
        ) : null}
      </div>
    </section>
  );
}
