import { Fragment } from "react";
import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import { getOrderedVisibleBodySections, getVisibleNav } from "@/lib/template-sections";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { getHeroVariant } from "@/components/templates/shared/heroes/hero-variant-registry";
import { StudioNav } from "@/components/templates/studio/studio-nav";
import { StudioAbout } from "@/components/templates/studio/studio-about";
import { StudioServicesSection } from "@/components/templates/studio/studio-services-section";
import { StudioTeamSection } from "@/components/templates/studio/studio-team-section";
import { GallerySection } from "@/components/templates/shared/gallery-section";
import { StudioTestimonialsSection } from "@/components/templates/studio/studio-testimonials-section";
import { StudioFaqSection } from "@/components/templates/studio/studio-faq-section";
import { StudioContactSection } from "@/components/templates/studio/studio-contact-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";
import { TemplateAos } from "@/components/templates/shared/template-aos";

function renderStudioBodySection(anchor: string, content: LandingContent) {
  if (anchor === "galeria") return <GallerySection content={content} templateId="studio" />;
  if (anchor === "story") return <StudioAbout content={content} />;
  if (anchor === "servicios") return <StudioServicesSection content={content} />;
  if (anchor === "testimonios") return <StudioTestimonialsSection content={content} />;
  if (anchor === "equipo") return <StudioTeamSection content={content} />;
  if (anchor === "faq") return <StudioFaqSection content={content} />;
  return null;
}

export function StudioTemplate({
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
  const heroVariantId = sectionSelections?.hero ?? "studio";
  const heroNavTone = getHeroVariant(heroVariantId).navTone;
  const { primaryCtaHref, secondaryCtaHref } = getHeroCtaTargets({
    bookingEnabled,
    content,
    previewLandingId,
    slug: slug ?? "",
    template: "studio",
  });

  return (
    <TemplateAos
        className="relative bg-[var(--site-surface)]"
        style={{ overflowX: "clip" }}
    >

      <StudioNav
        brand={content.brand || "Studio"}
        brandLogoType={content.brandLogoType ?? "text"}
        brandLogoImage={content.brandLogoImage ?? ""}
        navLinks={getVisibleNav(content.nav, content.hiddenSections, "studio")}
        ctaLabel={content.hero.ctaLabel ?? ""}
        ctaHref={primaryCtaHref}
        heroNavTone={heroNavTone}
        overHero
        topOffset={topOffset}
      />

      <HeroRenderer
        content={content}
        primaryCtaHref={primaryCtaHref}
        secondaryCtaHref={secondaryCtaHref}
        variantId={heroVariantId}
      />

      <ActiveOffersRenderer content={content} renderedAt={renderedAt} />

      {getOrderedVisibleBodySections("studio", content).map((section) => (
        <Fragment key={section.anchor}>
          {renderStudioBodySection(section.anchor, content)}
        </Fragment>
      ))}

      <StudioContactSection content={content} copyrightYear={copyrightYear} />
    </TemplateAos>
  );
}
