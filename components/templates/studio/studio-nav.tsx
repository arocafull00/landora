import type { BrandLogoType, NavLink } from "@/lib/dashboard-data";
import type { HeroNavTone } from "@/components/templates/shared/heroes/hero-variant-types";
import { NativeTemplateNav } from "@/components/templates/native-template-nav";

export function StudioNav({
  brand,
  brandLogoImage,
  brandLogoType,
  navLinks,
  ctaLabel,
  ctaHref,
  topOffset = 0,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  navLinks: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  heroNavTone: HeroNavTone;
  overHero: boolean;
  topOffset?: number;
}) {
  return (
    <NativeTemplateNav
      brand={brand}
      brandLogoImage={brandLogoImage}
      brandLogoType={brandLogoType}
      ctaHref={ctaHref}
      ctaLabel={ctaLabel || "Reservar cita"}
      navLinks={navLinks}
      topOffset={topOffset}
    />
  );
}
