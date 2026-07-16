"use client";

import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { PortfolioHero } from "@/components/templates/portfolio/portfolio-hero";

export function PortfolioHeroVariant({
  content,
  heroRef,
  primaryCtaHref,
}: HeroVariantProps) {
  return (
    <PortfolioHero
      content={content}
      ctaHref={primaryCtaHref}
      heroRef={heroRef}
    />
  );
}
