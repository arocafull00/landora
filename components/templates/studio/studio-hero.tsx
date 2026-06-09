"use client";

import { motion } from "motion/react";
import type { LandingContent } from "@/lib/dashboard-data";
import { HeroBackground } from "@/components/ui/hero-background";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function StudioHero({
  content,
  heroRef,
}: {
  content: LandingContent;
  heroRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden"
    >
      <HeroBackground src={content.hero.image} template="studio" />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <motion.p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/80"
          style={{ fontFamily: "var(--font-body)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
        >
          {content.hero.eyebrow}
        </motion.p>

        <motion.h1
          className="mb-6 text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-[clamp(56px,7vw,88px)]"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: easeOut }}
        >
          {content.hero.title}
        </motion.h1>

        <motion.p
          className="mb-10 max-w-lg text-lg leading-relaxed text-white/85"
          style={{ fontFamily: "var(--font-body)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: easeOut }}
        >
          {content.hero.subtitle}
        </motion.p>

        <motion.a
          className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold tracking-wide text-[#1a1a1a] transition-all hover:bg-white/90 hover:shadow-lg"
          href="#contacto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: easeOut }}
        >
          {content.hero.ctaLabel || "Reservar cita"}
        </motion.a>
      </div>
    </section>
  );
}
