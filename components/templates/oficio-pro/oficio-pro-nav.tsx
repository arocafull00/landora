import type { NavLink } from "@/lib/dashboard-data";
import type { HeroNavTone } from "@/components/templates/shared/heroes/hero-variant-types";
import { NativeTemplateNav } from "@/components/templates/native-template-nav";

export function OficioProNav({
  brand,
  brandLogoImage,
  brandLogoType,
  navLinks,
  ctaHref,
  topOffset = 0,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: "text" | "image";
  navLinks: NavLink[];
  ctaHref: string;
  heroNavTone: HeroNavTone;
  topOffset?: number;
}) {
  return (
    <NativeTemplateNav
      brand={brand}
      brandLogoImage={brandLogoImage}
      brandLogoType={brandLogoType}
      ctaHref={ctaHref}
      ctaLabel="Contacto"
      navLinks={navLinks}
      topOffset={topOffset}
    />
  );
}
