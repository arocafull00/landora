import { Fragment } from "react";
import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import { getOrderedVisibleBodySections, getVisibleNav } from "@/lib/template-sections";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { getHeroVariant } from "@/components/templates/shared/heroes/hero-variant-registry";
import { FloristeriaNav } from "@/components/templates/floristeria/floristeria-nav";
import { FloristeriaAbout } from "@/components/templates/floristeria/floristeria-about";
import { FloristeriaCtaSection } from "@/components/templates/floristeria/floristeria-cta-section";
import { GallerySection } from "@/components/templates/shared/gallery-section";
import { FloristeriaTestimonialsSection } from "@/components/templates/floristeria/floristeria-testimonials-section";
import { FloristeriaFaqSection } from "@/components/templates/floristeria/floristeria-faq-section";
import { FloristeriaContactSection } from "@/components/templates/floristeria/floristeria-contact-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";
import { TemplateAos } from "@/components/templates/shared/template-aos";

function renderFloristeriaBodySection(anchor: string, content: LandingContent) {
  if (anchor === "galeria") return <GallerySection content={content} templateId="floristeria" />;
  if (anchor === "servicios") return <FloristeriaCtaSection content={content} />;
  if (anchor === "story") return <FloristeriaAbout content={content} />;
  if (anchor === "testimonios") return <FloristeriaTestimonialsSection content={content} />;
  if (anchor === "faq") return <FloristeriaFaqSection content={content} />;
  return null;
}

export function FloristeriaTemplateClient({
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
  const heroVariantId = sectionSelections?.hero ?? "floristeria";
  const heroNavTone = getHeroVariant(heroVariantId).navTone;
  const { primaryCtaHref, secondaryCtaHref } = getHeroCtaTargets({
    bookingEnabled,
    content,
    previewLandingId,
    slug: slug ?? "",
    template: "floristeria",
  });

  return (
    <TemplateAos
        className="relative bg-[var(--site-surface)]"
        style={{ overflowX: "clip" }}
    >

        <FloristeriaNav
          brand={content.brand || "Jardín Secreto."}
          brandLogoType={content.brandLogoType ?? "text"}
          brandLogoImage={content.brandLogoImage ?? ""}
          navLinks={getVisibleNav(content.nav, content.hiddenSections, "floristeria")}
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
        {getOrderedVisibleBodySections("floristeria", content).map((section) => (
          <Fragment key={section.anchor}>
            {renderFloristeriaBodySection(section.anchor, content)}
          </Fragment>
        ))}

        <FloristeriaContactSection content={content} copyrightYear={copyrightYear} />
    </TemplateAos>
  );
}
