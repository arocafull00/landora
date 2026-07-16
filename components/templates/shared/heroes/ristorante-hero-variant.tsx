"use client";

import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { RistoranteHero } from "@/components/templates/ristorante/ristorante-hero";

export function RistoranteHeroVariant({
  content,
  heroRef,
  primaryCtaHref,
}: HeroVariantProps) {
  return (
    <RistoranteHero
      content={content}
      ctaHref={primaryCtaHref}
      heroRef={heroRef}
    />
  );
}
