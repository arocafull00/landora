"use client";

import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { OficioProHero } from "@/components/templates/oficio-pro/oficio-pro-hero";

export function OficioProHeroVariant({
  content,
  heroRef,
  primaryCtaHref,
  secondaryCtaHref,
}: HeroVariantProps) {
  return (
    <OficioProHero
      content={content}
      ctaHref={primaryCtaHref}
      heroRef={heroRef}
      secondaryCtaHref={secondaryCtaHref}
    />
  );
}
