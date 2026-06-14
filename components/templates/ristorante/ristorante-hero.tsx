"use client";

import { m, useReducedMotion } from "motion/react";
import type { LandingContent } from "@/lib/dashboard-data";
import { HeroBackground } from "@/components/ui/hero-background";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function RistoranteHero({
  content,
  heroRef,
}: {
  content: LandingContent;
  heroRef: React.RefObject<HTMLElement | null>;
}) {
  const reduce = useReducedMotion();

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden"
    >
      <HeroBackground src={content.hero.image} template="ristorante" />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <m.p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/90"
          style={{ fontFamily: "var(--font-body)" }}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
        >
          {content.hero.eyebrow}
        </m.p>

        <m.h1
          className="mb-6 text-balance text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-[clamp(56px,7vw,88px)]"
          style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: easeOut }}
        >
          {content.hero.title}
        </m.h1>

        <m.p
          className="mb-10 max-w-lg text-pretty text-lg leading-relaxed text-white/90"
          style={{ fontFamily: "var(--font-body)" }}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: easeOut }}
        >
          {content.hero.subtitle}
        </m.p>

        <m.a
          className="inline-flex items-center justify-center rounded-full bg-[#8B2500] px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#7a1f00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
          href="#contacto"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: easeOut }}
        >
          {content.hero.ctaLabel || "Reservar mesa"}
        </m.a>
      </div>
    </section>
  );
}
