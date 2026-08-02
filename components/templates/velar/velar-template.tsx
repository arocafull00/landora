import { Fragment } from "react";
import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import { getOrderedVisibleBodySections, getVisibleNav } from "@/lib/template-sections";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { getHeroVariant } from "@/components/templates/shared/heroes/hero-variant-registry";
import { VelarNav } from "@/components/templates/velar/velar-nav";
import { VelarStatementSection } from "@/components/templates/velar/velar-statement-section";
import { VelarGallerySection } from "@/components/templates/velar/velar-gallery-section";
import { VelarSpacesSection } from "@/components/templates/velar/velar-spaces-section";
import { VelarServicesSection } from "@/components/templates/velar/velar-services-section";
import { VelarWorkflowSection } from "@/components/templates/velar/velar-workflow-section";
import { VelarTestimonialsSection } from "@/components/templates/velar/velar-testimonials-section";
import { VelarContactSection } from "@/components/templates/velar/velar-contact-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";
import { VelarMotion } from "@/components/templates/velar/velar-motion";

function renderVelarBodySection(
  anchor: string,
  content: LandingContent,
) {
  if (anchor === "story") {
    return <VelarStatementSection content={content} />;
  }
  if (anchor === "listings") {
    return <VelarGallerySection content={content} />;
  }
  if (anchor === "residences") return <VelarSpacesSection content={content} />;
  if (anchor === "servicios") return <VelarServicesSection content={content} />;
  if (anchor === "proceso") {
    return <VelarWorkflowSection content={content} />;
  }
  if (anchor === "testimonios") return <VelarTestimonialsSection content={content} />;
  return null;
}

export function VelarTemplate({
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
  const heroVariantId = sectionSelections?.hero ?? "velar";
  const heroNavTone = getHeroVariant(heroVariantId).navTone;
  const { primaryCtaHref, secondaryCtaHref } = getHeroCtaTargets({
    bookingEnabled,
    content,
    previewLandingId,
    slug: slug ?? "",
    template: "velar",
  });

  return (
    <VelarMotion>
      <VelarNav
        brand={content.brand || "Velar."}
        brandLogoType={content.brandLogoType ?? "text"}
        brandLogoImage={content.brandLogoImage ?? ""}
        navColor={heroNavTone === "light" ? "var(--site-on-dark)" : "var(--site-primary)"}
        navLinks={getVisibleNav(content.nav, content.hiddenSections, "velar")}
        topOffset={topOffset}
      />

      <HeroRenderer
        content={content}
        primaryCtaHref={primaryCtaHref}
        secondaryCtaHref={secondaryCtaHref}
        variantId={heroVariantId}
      />

      <ActiveOffersRenderer content={content} renderedAt={renderedAt} />

      {getOrderedVisibleBodySections("velar", content).map((section) => (
        <Fragment key={section.anchor}>
          {renderVelarBodySection(section.anchor, content)}
        </Fragment>
      ))}

      <VelarContactSection content={content} copyrightYear={copyrightYear} />
    </VelarMotion>
  );
}
