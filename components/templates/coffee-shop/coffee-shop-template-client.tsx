import { Fragment } from "react";
import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import { getOrderedVisibleBodySections, getVisibleNav } from "@/lib/template-sections";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { getHeroVariant } from "@/components/templates/shared/heroes/hero-variant-registry";
import { CoffeeShopNav } from "@/components/templates/coffee-shop/coffee-shop-nav";
import { CoffeeShopStorySection } from "@/components/templates/coffee-shop/coffee-shop-story-section";
import { CoffeeShopMenuSection } from "@/components/templates/coffee-shop/coffee-shop-menu-section";
import { GallerySection } from "@/components/templates/shared/gallery-section";
import { CoffeeShopHoursSection } from "@/components/templates/coffee-shop/coffee-shop-hours-section";
import { CoffeeShopTestimonialsSection } from "@/components/templates/coffee-shop/coffee-shop-testimonials-section";
import { CoffeeShopFaqSection } from "@/components/templates/coffee-shop/coffee-shop-faq-section";
import { CoffeeShopContactSection } from "@/components/templates/coffee-shop/coffee-shop-contact-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";
import { TemplateAos } from "@/components/templates/shared/template-aos";

function renderCoffeeShopBodySection(anchor: string, content: LandingContent) {
  if (anchor === "story") return <CoffeeShopStorySection content={content} />;
  if (anchor === "carta") return <CoffeeShopMenuSection content={content} />;
  if (anchor === "galeria") return <GallerySection content={content} templateId="coffee-shop" />;
  if (anchor === "horarios") return <CoffeeShopHoursSection content={content} />;
  if (anchor === "testimonios") return <CoffeeShopTestimonialsSection content={content} />;
  if (anchor === "faq") return <CoffeeShopFaqSection content={content} />;
  return null;
}

export function CoffeeShopTemplateClient({
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
  const heroVariantId = sectionSelections?.hero ?? "coffee-shop";
  const heroNavTone = getHeroVariant(heroVariantId).navTone;
  const { primaryCtaHref, secondaryCtaHref } = getHeroCtaTargets({
    bookingEnabled,
    content,
    previewLandingId,
    slug: slug ?? "",
    template: "coffee-shop",
  });

  return (
    <TemplateAos
        className="relative bg-[var(--site-surface)]"
        style={{ overflowX: "clip" }}
    >
        <CoffeeShopNav
          brand={content.brand || "Grano & Taza."}
          brandLogoType={content.brandLogoType ?? "text"}
          brandLogoImage={content.brandLogoImage ?? ""}
          navLinks={getVisibleNav(content.nav, content.hiddenSections, "coffee-shop")}
          ctaLabel={content.hero.ctaLabel ?? ""}
          ctaHref={primaryCtaHref}
          heroNavTone={heroNavTone}
          topOffset={topOffset}
        />

        <HeroRenderer
          content={content}
          primaryCtaHref={primaryCtaHref}
          secondaryCtaHref={secondaryCtaHref}
          variantId={heroVariantId}
        />

        <ActiveOffersRenderer content={content} renderedAt={renderedAt} />

        {getOrderedVisibleBodySections("coffee-shop", content).map((section) => (
          <Fragment key={section.anchor}>
            {renderCoffeeShopBodySection(section.anchor, content)}
          </Fragment>
        ))}

        <CoffeeShopContactSection content={content} copyrightYear={copyrightYear} />
    </TemplateAos>
  );
}
