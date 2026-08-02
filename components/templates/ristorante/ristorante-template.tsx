import type {
  LandingContent,
  LandingSectionSelections,
} from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import {
  getOrderedVisibleBodySections,
  getVisibleNav,
  isRistoranteCartaNavHref,
  normalizeNavHref,
} from "@/lib/template-sections";
import {
  getPreviewLandingPath,
  getPublicLandingPath,
} from "@/lib/public-site-url";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { getHeroVariant } from "@/components/templates/shared/heroes/hero-variant-registry";
import { RistoranteNav } from "@/components/templates/ristorante/ristorante-nav";
import { RistoranteContactSection } from "@/components/templates/ristorante/ristorante-contact-section";
import { RistoranteBodySection } from "@/components/templates/ristorante/ristorante-body-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";
import { TemplateAos } from "@/components/templates/shared/template-aos";

export function RistoranteTemplate({
  content,
  copyrightYear,
  renderedAt,
  topOffset = 0,
  slug,
  previewLandingId,
  bookingEnabled = false,
  sectionSelections,
}: {
  content: LandingContent;
  copyrightYear: number;
  renderedAt: Date;
  topOffset?: number;
  slug?: string;
  previewLandingId?: string;
  bookingEnabled?: boolean;
  sectionSelections?: LandingSectionSelections;
}) {
  const heroVariantId = sectionSelections?.hero ?? "ristorante";
  const galleryVariantId = sectionSelections?.gallery ?? "grid";
  const heroNavTone =
    getHeroVariant(heroVariantId)?.navTone ??
    getHeroVariant("ristorante").navTone;
  const publicBaseHref = getPublicLandingPath();
  const previewBaseHref = previewLandingId
    ? getPreviewLandingPath(previewLandingId)
    : undefined;
  const homeHref = previewBaseHref ?? publicBaseHref;
  const cartaHref = previewLandingId
    ? getPreviewLandingPath(previewLandingId, "/carta")
    : getPublicLandingPath("/carta");
  const { primaryCtaHref, secondaryCtaHref } = getHeroCtaTargets({
    bookingEnabled,
    content,
    previewLandingId,
    slug: slug ?? "",
    template: "ristorante",
  });
  const navLinks = getVisibleNav(
    content.nav,
    content.hiddenSections,
    "ristorante",
  ).map((link) => {
    const href = normalizeNavHref("ristorante", link.href);
    if (isRistoranteCartaNavHref(href)) {
      return { ...link, href: cartaHref };
    }
    return { ...link, href };
  });

  return (
    <TemplateAos
        className="relative bg-[var(--site-surface)]"
        style={{ overflowX: "clip" }}
    >

        <RistoranteNav
          brand={content.brand || "Osteria da Luca."}
          brandLogoImage={content.brandLogoImage ?? ""}
          brandLogoType={content.brandLogoType ?? "text"}
          cartaHref={cartaHref}
          cartaPageTarget={previewLandingId ? { type: "carta" } : undefined}
          ctaHref={primaryCtaHref}
          ctaLabel={content.hero.ctaLabel ?? ""}
          heroNavTone={heroNavTone}
          homeHref={homeHref}
          homePageTarget={previewLandingId ? { type: "home" } : undefined}
          navLinks={navLinks}
          topOffset={topOffset}
        />

        <HeroRenderer
          content={content}
          primaryCtaHref={primaryCtaHref}
          secondaryCtaHref={secondaryCtaHref}
          variantId={heroVariantId}
        />

        <ActiveOffersRenderer content={content} renderedAt={renderedAt} />

        {getOrderedVisibleBodySections("ristorante", content).map((section) => (
          <RistoranteBodySection
            anchor={section.anchor}
            content={content}
            galleryVariantId={galleryVariantId}
            key={section.anchor}
          />
        ))}

        <RistoranteContactSection content={content} copyrightYear={copyrightYear} />
    </TemplateAos>
  );
}
