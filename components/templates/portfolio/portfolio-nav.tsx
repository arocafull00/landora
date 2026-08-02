import type {
  BrandLogoType,
  EditorPageTarget,
  HeroVariantId,
  NavLink,
  SitePageId,
} from "@/lib/dashboard-data";
import type { HeroNavTone } from "@/components/templates/shared/heroes/hero-variant-types";
import { NativeTemplateNav } from "@/components/templates/native-template-nav";

export function PortfolioNav({
  activePage,
  aboutHref,
  brand,
  brandLogoImage,
  brandLogoType,
  navLinks,
  ctaLabel,
  ctaHref,
  homeHref,
  homePageTarget,
  aboutPageTarget,
  topOffset = 0,
}: {
  activePage: SitePageId | "project" | "blog";
  aboutHref?: string;
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  navLinks: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  heroVariantId: HeroVariantId;
  heroNavTone: HeroNavTone;
  homeHref: string;
  homePageTarget?: EditorPageTarget;
  aboutPageTarget?: EditorPageTarget;
  overHero: boolean;
  topOffset?: number;
}) {
  const resolvedLinks =
    activePage === "home"
      ? [
          ...(aboutHref
            ? [
                {
                  href: aboutHref,
                  id: "about-page",
                  label: "About me",
                  pageTarget: aboutPageTarget,
                },
              ]
            : []),
          ...navLinks,
        ]
      : [{ href: homeHref, id: "home-page", label: "Inicio", pageTarget: homePageTarget }];

  return (
    <NativeTemplateNav
      brand={brand}
      brandLogoImage={brandLogoImage}
      brandLogoType={brandLogoType}
      ctaHref={ctaHref}
      ctaLabel={ctaLabel || "Ver proyectos"}
      homeHref={homeHref}
      homePageTarget={homePageTarget}
      navLinks={resolvedLinks}
      topOffset={topOffset}
    />
  );
}
