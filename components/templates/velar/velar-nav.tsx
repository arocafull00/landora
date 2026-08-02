import type { BrandLogoType, NavLink } from "@/lib/dashboard-data";
import { NativeTemplateNav } from "@/components/templates/native-template-nav";

export function VelarNav({
  brand,
  brandLogoImage,
  brandLogoType,
  navLinks,
  topOffset = 0,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  navColor: string;
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
      topOffset={topOffset}
    />
  );
}
