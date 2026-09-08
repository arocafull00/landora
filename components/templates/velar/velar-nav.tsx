"use client";

import type { BrandLogoType, NavLink } from "@/lib/dashboard-data";
import type { HeroNavTone } from "@/components/templates/shared/heroes/hero-variant-types";
import { NativeTemplateNav } from "@/components/templates/native-template-nav";
import { useOverHero } from "@/components/templates/shared/hooks/use-over-hero";

export function VelarNav({
  brand,
  brandLogoImage,
  brandLogoType,
  ctaAnalyticsEvent,
  ctaHref,
  ctaLabel,
  heroNavTone,
  instagramHref,
  navLinks,
  topOffset = 0,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  ctaAnalyticsEvent: string;
  ctaHref: string;
  ctaLabel: string;
  heroNavTone: HeroNavTone;
  instagramHref: string;
  navLinks: NavLink[];
  topOffset?: number;
}) {
  const overHero = useOverHero(topOffset);

  return (
    <NativeTemplateNav
      brand={brand}
      brandLogoImage={brandLogoImage}
      brandLogoType={brandLogoType}
      ctaAnalyticsEvent={ctaAnalyticsEvent}
      ctaHref={ctaHref}
      ctaLabel={ctaLabel}
      instagramHref={instagramHref || undefined}
      navLinks={navLinks}
      overlay={overHero}
      tone={heroNavTone}
      topOffset={topOffset}
    />
  );
}
