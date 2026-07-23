"use client";

import { Fragment, useRef } from "react";
import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import { getOrderedVisibleBodySections, getVisibleNav } from "@/lib/template-sections";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { getHeroVariant } from "@/components/templates/shared/heroes/hero-variant-registry";
import { FloristeriaAosInit } from "@/components/templates/floristeria/floristeria-aos-init";
import { FloristeriaNav } from "@/components/templates/floristeria/floristeria-nav";
import { FloristeriaAbout } from "@/components/templates/floristeria/floristeria-about";
import { FloristeriaCtaSection } from "@/components/templates/floristeria/floristeria-cta-section";
import { GallerySection } from "@/components/templates/shared/gallery-section";
import { FloristeriaTestimonialsSection } from "@/components/templates/floristeria/floristeria-testimonials-section";
import { FloristeriaFaqSection } from "@/components/templates/floristeria/floristeria-faq-section";
import { FloristeriaContactSection } from "@/components/templates/floristeria/floristeria-contact-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";

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
  topOffset = 0,
  slug,
  previewLandingId,
  bookingEnabled = false,
  sectionSelections,
}: {
  content: LandingContent;
  topOffset?: number;
  slug?: string;
  previewLandingId?: string;
  bookingEnabled?: boolean;
  sectionSelections?: LandingSectionSelections;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
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
    <TemplateLazyMotion>
      <div
        ref={rootRef}
        className="relative bg-[var(--site-surface)]"
        style={{ overflowX: "clip" }}
      >
        <FloristeriaAosInit rootRef={rootRef} />

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
          heroRef={heroRef}
          primaryCtaHref={primaryCtaHref}
          secondaryCtaHref={secondaryCtaHref}
          variantId={heroVariantId}
        />
        <ActiveOffersRenderer content={content} />
        {getOrderedVisibleBodySections("floristeria", content).map((section) => (
          <Fragment key={section.anchor}>
            {renderFloristeriaBodySection(section.anchor, content)}
          </Fragment>
        ))}

        <FloristeriaContactSection content={content} />
      </div>
    </TemplateLazyMotion>
  );
}
