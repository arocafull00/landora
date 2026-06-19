"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { getVisibleNav, isSectionVisible } from "@/lib/template-sections";
import { usePreviewScrollContainer } from "@/lib/preview-scroll-context";
import { getScrollTargets } from "@/lib/scroll-parent";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
import { StudioAosInit } from "@/components/templates/studio/studio-aos-init";
import { StudioNav } from "@/components/templates/studio/studio-nav";
import { StudioHero } from "@/components/templates/studio/studio-hero";
import { StudioAbout } from "@/components/templates/studio/studio-about";
import { StudioServicesSection } from "@/components/templates/studio/studio-services-section";
import { StudioTeamSection } from "@/components/templates/studio/studio-team-section";
import { GallerySection } from "@/components/templates/shared/gallery-section";
import { StudioTestimonialsSection } from "@/components/templates/studio/studio-testimonials-section";
import { StudioFaqSection } from "@/components/templates/studio/studio-faq-section";
import { StudioContactSection } from "@/components/templates/studio/studio-contact-section";
import { LandingBookingSection } from "@/components/booking/landing-booking-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";

function isOverlappingTop(el: HTMLElement | null) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom > 0;
}

export function StudioTemplate({
  content,
  topOffset = 0,
  slug,
  bookingEnabled = false,
}: {
  content: LandingContent;
  topOffset?: number;
  slug?: string;
  bookingEnabled?: boolean;
}) {
  const [overHero, setOverHero] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const scrollContainer = usePreviewScrollContainer();

  const updateNavState = useCallback(() => {
    setOverHero(isOverlappingTop(heroRef.current));
  }, []);

  useLayoutEffect(() => {
    updateNavState();

    const handleUpdate = () => updateNavState();
    const scrollTargets = getScrollTargets(rootRef.current, scrollContainer);

    for (const target of scrollTargets) {
      target.addEventListener("scroll", handleUpdate, { passive: true });
    }

    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleUpdate, { passive: true });
    }

    window.addEventListener("resize", handleUpdate);

    return () => {
      for (const target of scrollTargets) {
        target.removeEventListener("scroll", handleUpdate);
      }
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleUpdate);
      }
      window.removeEventListener("resize", handleUpdate);
    };
  }, [scrollContainer, updateNavState]);

  return (
    <TemplateLazyMotion>
      <div
        ref={rootRef}
        className="relative"
        style={{ backgroundColor: "#faf9f7", overflowX: "clip" }}
      >
      <StudioAosInit rootRef={rootRef} />

      <StudioNav
        brand={content.brand || "Studio"}
        brandLogoType={content.brandLogoType ?? "text"}
        brandLogoImage={content.brandLogoImage ?? ""}
        navLinks={getVisibleNav(content.nav, content.hiddenSections, "studio")}
        ctaLabel={content.hero.ctaLabel ?? ""}
        overHero={overHero}
        topOffset={topOffset}
      />

      <StudioHero content={content} heroRef={heroRef} />

      <ActiveOffersRenderer content={content} />

      {isSectionVisible(content, "galeria") ? (
        <GallerySection content={content} templateId="studio" />
      ) : null}


      {isSectionVisible(content, "story") ? <StudioAbout content={content} /> : null}

      {isSectionVisible(content, "servicios") ? (
        <StudioServicesSection content={content} />
      ) : null}
      {isSectionVisible(content, "testimonios") ? (
        <StudioTestimonialsSection content={content} />
      ) : null}
      {isSectionVisible(content, "equipo") ? <StudioTeamSection content={content} /> : null}

      {isSectionVisible(content, "faq") ? <StudioFaqSection content={content} /> : null}

      {bookingEnabled && slug && isSectionVisible(content, "reservas") ? (
        <LandingBookingSection content={content} slug={slug} templateId="studio" />
      ) : null}

      <StudioContactSection content={content} />
    </div>
    </TemplateLazyMotion>
  );
}
