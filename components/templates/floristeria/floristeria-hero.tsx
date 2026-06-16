"use client";

import { m, useReducedMotion } from "motion/react";
import type { LandingContent } from "@/lib/dashboard-data";
import { isBackgroundPreset } from "@/lib/background-assets";
import { FLORISTERIA_ASSETS } from "@/lib/floristeria-assets";
import { FloristeriaButton } from "@/components/templates/floristeria/floristeria-button";
import { FloristeriaHeroFan } from "@/components/templates/floristeria/floristeria-hero-fan";
import { FloristeriaHeroFanBackdrop } from "@/components/templates/floristeria/floristeria-hero-fan-backdrop";
import { FloristeriaHeroFooter } from "@/components/templates/floristeria/floristeria-hero-footer";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function FloristeriaHero({
  content,
  heroRef,
}: {
  content: LandingContent;
  heroRef: React.RefObject<HTMLElement | null>;
}) {
  const reduce = useReducedMotion();
  const centerImageSrc =
    content.hero.image && !isBackgroundPreset(content.hero.image)
      ? content.hero.image
      : FLORISTERIA_ASSETS.hero;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex h-dvh flex-col overflow-x-clip bg-[#FAFAF7] md:h-auto md:min-h-0"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <FloristeriaHeroFanBackdrop />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 pb-4 pt-20 md:flex-none md:justify-start md:px-8 md:pb-10 md:pt-24 lg:px-10">
        <FloristeriaHeroFan centerImageAlt={content.hero.title} centerImageSrc={centerImageSrc} />

        <m.div
          className="relative z-20 mt-5 max-w-3xl text-center sm:mt-6 md:mt-8"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
        >
          {content.hero.eyebrow ? (
            <p
              className="mb-2 text-sm font-light italic text-[#2D5016]/80"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {content.hero.eyebrow}
            </p>
          ) : null}

          <h1
            className="text-balance text-[clamp(40px,7vw,72px)] font-bold leading-[1.08] tracking-tight text-[#1a1a1a] md:text-[clamp(48px,6vw,80px)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              letterSpacing: "-0.03em",
            }}
          >
            {content.hero.title}
          </h1>

          {content.hero.subtitle ? (
            <p
              className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-[#1a1a1a]/60 md:mt-4 md:text-lg"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {content.hero.subtitle}
            </p>
          ) : null}

          <div className="mx-auto mt-6 flex w-full max-w-xs flex-col items-center gap-3 sm:mt-7 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
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
          </div>
        </m.div>
      </div>
      <div className="relative z-10 w-full">
        <FloristeriaHeroFooter />
      </div>
    </section>
  );
}
