"use client";

import { useRef } from "react";
import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import { getVisibleNav, isSectionVisible } from "@/lib/template-sections";
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

export function FloristeriaTemplateClient({
  content,
  topOffset = 0,
  slug,
  bookingEnabled = false,
  sectionSelections,
}: {
  content: LandingContent;
  topOffset?: number;
  slug?: string;
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
        {isSectionVisible(content, "galeria") ? (
          <GallerySection content={content} templateId="floristeria" />
        ) : null}
        {isSectionVisible(content, "servicios") ? (
          <FloristeriaCtaSection content={content} />
        ) : null}

        {isSectionVisible(content, "story") ? <FloristeriaAbout content={content} /> : null}

        {isSectionVisible(content, "testimonios") ? (
          <FloristeriaTestimonialsSection content={content} />
        ) : null}

        {isSectionVisible(content, "faq") ? <FloristeriaFaqSection content={content} /> : null}

        <FloristeriaContactSection content={content} />
      </div>
    </TemplateLazyMotion>
  );
}
