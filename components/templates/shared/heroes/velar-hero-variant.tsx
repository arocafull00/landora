"use client";

import { useRef } from "react";
import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { VelarHero } from "@/components/templates/velar/velar-hero";
import { VelarHouseAnimation } from "@/components/templates/velar/velar-house-animation";
import { resolveVelarHeroImages } from "@/lib/velar-assets";

export function VelarHeroVariant({
  content,
  heroRef,
  primaryCtaHref,
}: HeroVariantProps) {
  const transitionRef = useRef<HTMLDivElement>(null);
  const { backgroundImage, houseImage } = resolveVelarHeroImages(content.hero);
  const resolvedContent = {
    ...content,
    hero: {
      ...content.hero,
      image: backgroundImage,
    },
  };

  return (
    <div className="relative">
      <VelarHero
        content={resolvedContent}
        ctaHref={primaryCtaHref}
        heroRef={heroRef}
        heroVisible
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-[190vh] h-px w-px"
        ref={transitionRef}
      />
      {houseImage ? (
        <VelarHouseAnimation
          darkRef={transitionRef}
          heroRef={heroRef}
          houseImage={houseImage}
        />
      ) : null}
    </div>
  );
}
