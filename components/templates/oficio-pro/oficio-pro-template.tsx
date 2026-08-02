import { Fragment } from "react";
import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import { getOrderedVisibleBodySections, getVisibleNav } from "@/lib/template-sections";
import { OficioProContactSection } from "@/components/templates/oficio-pro/oficio-pro-contact-section";
import { OficioProExperienceSection } from "@/components/templates/oficio-pro/oficio-pro-experience-section";
import { OficioProNav } from "@/components/templates/oficio-pro/oficio-pro-nav";
import { OficioProServicesSection } from "@/components/templates/oficio-pro/oficio-pro-services-section";
import { OficioProTestimonialsSection } from "@/components/templates/oficio-pro/oficio-pro-testimonials-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { getHeroVariant } from "@/components/templates/shared/heroes/hero-variant-registry";
import { TemplateAos } from "@/components/templates/shared/template-aos";

function renderOficioProBodySection(anchor: string, content: LandingContent) {
  if (anchor === "servicios") {
    return (
      <OficioProServicesSection anchor="servicios" category="Servicios" content={content} />
    );
  }
  if (anchor === "instalaciones") {
    return (
      <OficioProServicesSection
        anchor="instalaciones"
        category="Instalaciones"
        content={content}
        reverse
      />
    );
  }
  if (anchor === "testimonios") return <OficioProTestimonialsSection content={content} />;
  if (anchor === "experiencia") return <OficioProExperienceSection content={content} />;
  return null;
}

export function OficioProTemplate({
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
  const heroVariantId = sectionSelections?.hero ?? "oficio-pro";
  const heroNavTone = getHeroVariant(heroVariantId).navTone;
  const { primaryCtaHref, secondaryCtaHref } = getHeroCtaTargets({
    bookingEnabled,
    content,
    previewLandingId,
    slug: slug ?? "",
    template: "oficio-pro",
  });

  return (
    <TemplateAos
      className="relative bg-[var(--site-surface)] text-[var(--site-text-muted)]"
      style={{
        overflowX: "clip",
        backgroundImage:
          "linear-gradient(to right, color-mix(in srgb, var(--site-primary) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--site-primary) 6%, transparent) 1px, transparent 1px)",
        backgroundSize: "18px 30px",
      }}
    >
      <OficioProNav
        brand={content.brand || "Oficio Pro"}
        brandLogoImage={content.brandLogoImage ?? ""}
        brandLogoType={content.brandLogoType ?? "text"}
        navLinks={getVisibleNav(content.nav, content.hiddenSections, "oficio-pro")}
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
      {getOrderedVisibleBodySections("oficio-pro", content).map((section) => (
        <Fragment key={section.anchor}>
          {renderOficioProBodySection(section.anchor, content)}
        </Fragment>
      ))}
      <OficioProContactSection content={content} copyrightYear={copyrightYear} />
    </TemplateAos>
  );
}
