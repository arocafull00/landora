"use client";

import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { FloristeriaHero } from "@/components/templates/floristeria/floristeria-hero";

export function FloristeriaHeroVariant({
  content,
  heroRef,
  primaryCtaHref,
  secondaryCtaHref,
}: HeroVariantProps) {
  return (
    <FloristeriaHero
      content={content}
      ctaHref={primaryCtaHref}
      heroRef={heroRef}
      secondaryCtaHref={secondaryCtaHref}
    />
  );
}
