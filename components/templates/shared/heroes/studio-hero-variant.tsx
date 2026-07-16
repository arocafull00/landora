"use client";

import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { StudioHero } from "@/components/templates/studio/studio-hero";

export function StudioHeroVariant({
  content,
  heroRef,
  primaryCtaHref,
  secondaryCtaHref,
}: HeroVariantProps) {
  return (
    <StudioHero
      content={content}
      ctaHref={primaryCtaHref}
      heroRef={heroRef}
      secondaryCtaHref={secondaryCtaHref}
    />
  );
}
