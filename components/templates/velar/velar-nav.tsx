import type { BrandLogoType, NavLink } from "@/lib/dashboard-data";
import type { HeroNavTone } from "@/components/templates/shared/heroes/hero-variant-types";
import { NativeTemplateNav } from "@/components/templates/native-template-nav";

export function VelarNav({
  brand,
  brandLogoImage,
  brandLogoType,
  heroNavTone,
  navLinks,
  topOffset = 0,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  heroNavTone: HeroNavTone;
  navLinks: NavLink[];
  topOffset?: number;
}) {
  return (
    <NativeTemplateNav
      brand={brand}
      brandLogoImage={brandLogoImage}
      brandLogoType={brandLogoType}
      ctaHref={navLinks[0]?.href ?? "#hero"}
      ctaLabel={navLinks[0]?.label ?? "Explorar"}
      navLinks={navLinks}
      overlay
      tone={heroNavTone}
      topOffset={topOffset}
    />
  );
}
