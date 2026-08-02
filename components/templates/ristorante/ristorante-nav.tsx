import type { RefObject } from "react";
import type {
  BrandLogoType,
  EditorPageTarget,
  NavLink,
} from "@/lib/dashboard-data";
import type { HeroNavTone } from "@/components/templates/shared/heroes/hero-variant-types";
import { NativeTemplateNav } from "@/components/templates/native-template-nav";

export function RistoranteNav({
  activePage = "home",
  brand,
  brandLogoImage,
  brandLogoType,
  cartaHref,
  cartaPageTarget,
  navLinks,
  ctaLabel,
  ctaHref,
  homeHref = "#hero",
  homePageTarget,
  topOffset = 0,
}: {
  activePage?: "home" | "carta";
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  cartaHref?: string;
  cartaPageTarget?: EditorPageTarget;
  navLinks: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  heroNavTone: HeroNavTone;
  homeHref?: string;
  homePageTarget?: EditorPageTarget;
  topOffset?: number;
  scrollRootRef?: RefObject<HTMLElement | null>;
}) {
  const resolvedLinks =
    activePage === "home"
      ? [
          ...navLinks,
          ...(cartaHref
            ? [
                {
                  href: cartaHref,
                  id: "carta-page",
                  label: "Carta",
                  pageTarget: cartaPageTarget,
                },
              ]
            : []),
        ]
      : [{ href: homeHref, id: "home-page", label: "Inicio", pageTarget: homePageTarget }];

  return (
    <NativeTemplateNav
      brand={brand}
      brandLogoImage={brandLogoImage}
      brandLogoType={brandLogoType}
      ctaHref={ctaHref}
      ctaLabel={ctaLabel || "Reservar mesa"}
      homeHref={homeHref}
      homePageTarget={homePageTarget}
      navLinks={resolvedLinks}
      topOffset={topOffset}
    />
  );
}
