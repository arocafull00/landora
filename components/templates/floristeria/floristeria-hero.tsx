"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import type { LandingContent } from "@/lib/dashboard-data";
import { resolveFloristeriaFanImages } from "@/lib/floristeria-assets";
import { FloristeriaButton } from "@/components/templates/floristeria/floristeria-button";
import { FloristeriaHeroFan } from "@/components/templates/floristeria/floristeria-hero-fan";
import { FloristeriaHeroFanBackdrop } from "@/components/templates/floristeria/floristeria-hero-fan-backdrop";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const bloomContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const bloomEyebrowVariants: Variants = {
  hidden: { opacity: 0, letterSpacing: "0.3em" },
  visible: {
    opacity: 1,
    letterSpacing: "0.15em",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const bloomTitleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

const bloomSubtitleVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const bloomButtonsVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function FloristeriaHero({
  content,
  heroRef,
}: {
  content: LandingContent;
  heroRef: React.RefObject<HTMLElement | null>;
}) {
  const reduce = useReducedMotion();
  const fanImages = resolveFloristeriaFanImages(content.hero);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-dvh overflow-x-clip bg-[#FAFAF7]"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <FloristeriaHeroFanBackdrop />
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 md:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <FloristeriaHeroFan centerImageAlt={content.hero.title} images={fanImages} />

        <m.div
          className="relative z-20 mt-5 max-w-3xl text-center sm:mt-6 md:mt-8"
          variants={bloomContainerVariants}
          initial={reduce ? false : "hidden"}
          animate="visible"
        >
          {content.hero.eyebrow ? (
            <m.p
              variants={bloomEyebrowVariants}
              className="mb-2 text-sm font-light italic text-[#2D5016]/80"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {content.hero.eyebrow}
            </m.p>
          ) : null}

          <m.h1
            variants={bloomTitleVariants}
            className="text-balance text-[clamp(40px,7vw,72px)] font-bold leading-[1.08] tracking-tight text-[#1a1a1a] md:text-[clamp(48px,6vw,80px)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              letterSpacing: "-0.03em",
            }}
          >
            {content.hero.title}
          </m.h1>

          {content.hero.subtitle ? (
            <m.p
              variants={bloomSubtitleVariants}
              className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-[#1a1a1a]/60 md:mt-4 md:text-lg"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {content.hero.subtitle}
            </m.p>
          ) : null}

          <m.div
            variants={bloomButtonsVariants}
            className="mx-auto mt-6 flex w-full max-w-xs flex-col items-center gap-3 sm:mt-7 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
          >
            <FloristeriaButton href="#contacto" size="lg" className="w-full sm:w-auto">
              {content.hero.ctaLabel || "Hacer pedido"}
            </FloristeriaButton>
            <FloristeriaButton
              href="#galeria"
              variant="secondary"
              size="lg"
              icon={null}
              className="w-full sm:w-auto"
            >
              Ver galería
            </FloristeriaButton>
          </m.div>
        </m.div>
        </div>
      </div>
    </section>
  );
}
