"use client";

import { CalendarCheck } from "lucide-react";
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
      ctaClassName="font-[family-name:var(--font-syne)] font-medium uppercase tracking-widest text-[var(--site-on-dark)] hover:bg-[var(--site-dark)]"
      ctaHref={ctaHref}
      ctaIcon={
        <CalendarCheck
          aria-hidden
          className="size-4 shrink-0"
        />
      }
      ctaLabel={ctaLabel}
      navLinks={navLinks}
      overlay={overHero}
      tone={heroNavTone}
      topOffset={topOffset}
    />
  );
}
