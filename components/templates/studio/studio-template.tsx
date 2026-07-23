"use client";

import { Fragment, useCallback, useLayoutEffect, useRef, useState } from "react";
import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import { getOrderedVisibleBodySections, getVisibleNav } from "@/lib/template-sections";
import { getScrollTargets } from "@/lib/scroll-parent";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { getHeroVariant } from "@/components/templates/shared/heroes/hero-variant-registry";
import { StudioAosInit } from "@/components/templates/studio/studio-aos-init";
import { StudioNav } from "@/components/templates/studio/studio-nav";
import { StudioAbout } from "@/components/templates/studio/studio-about";
import { StudioServicesSection } from "@/components/templates/studio/studio-services-section";
import { StudioTeamSection } from "@/components/templates/studio/studio-team-section";
import { GallerySection } from "@/components/templates/shared/gallery-section";
import { StudioTestimonialsSection } from "@/components/templates/studio/studio-testimonials-section";
import { StudioFaqSection } from "@/components/templates/studio/studio-faq-section";
import { StudioContactSection } from "@/components/templates/studio/studio-contact-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";

function isOverlappingTop(el: HTMLElement | null) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom > 0;
}

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
  const [overHero, setOverHero] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const updateNavState = useCallback(() => {
    setOverHero(isOverlappingTop(heroRef.current));
  }, []);

  useLayoutEffect(() => {
    updateNavState();

    const handleUpdate = () => updateNavState();
    const scrollTargets = getScrollTargets(rootRef.current, null);

    for (const target of scrollTargets) {
      target.addEventListener("scroll", handleUpdate, { passive: true });
    }

    window.addEventListener("resize", handleUpdate);

    return () => {
      for (const target of scrollTargets) {
        target.removeEventListener("scroll", handleUpdate);
      }
      window.removeEventListener("resize", handleUpdate);
    };
  }, [updateNavState]);

  const heroVariantId = sectionSelections?.hero ?? "studio";
  const heroNavTone = getHeroVariant(heroVariantId).navTone;
  const { primaryCtaHref, secondaryCtaHref } = getHeroCtaTargets({
    bookingEnabled,
    content,
    slug: slug ?? "",
    template: "studio",
  });

  return (
    <TemplateLazyMotion>
      <div
        ref={rootRef}
        className="relative bg-[var(--site-surface)]"
        style={{ overflowX: "clip" }}
      >
      <StudioAosInit rootRef={rootRef} />

      <StudioNav
        brand={content.brand || "Studio"}
        brandLogoType={content.brandLogoType ?? "text"}
        brandLogoImage={content.brandLogoImage ?? ""}
        navLinks={getVisibleNav(content.nav, content.hiddenSections, "studio")}
        ctaLabel={content.hero.ctaLabel ?? ""}
        ctaHref={primaryCtaHref}
        heroNavTone={heroNavTone}
        overHero={overHero}
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

      {getOrderedVisibleBodySections("studio", content).map((section) => (
        <Fragment key={section.anchor}>
          {renderStudioBodySection(section.anchor, content)}
        </Fragment>
      ))}

      <StudioContactSection content={content} />
    </div>
    </TemplateLazyMotion>
  );
}
