"use client";

import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { CoffeeShopHero } from "@/components/templates/coffee-shop/coffee-shop-hero";

export function CoffeeShopHeroVariant({
  content,
  heroRef,
  primaryCtaHref,
}: HeroVariantProps) {
  return (
    <CoffeeShopHero
      content={content}
      ctaHref={primaryCtaHref}
      heroRef={heroRef}
    />
  );
}
