"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { getVisibleNav, isSectionVisible } from "@/lib/template-sections";
import { resolveVelarHeroImages } from "@/lib/velar-assets";
import { usePreviewScrollContainer } from "@/lib/preview-scroll-context";
import { getScrollTargets } from "@/lib/scroll-parent";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
import { VelarAosInit } from "@/components/templates/velar/velar-aos-init";
import { VelarNav } from "@/components/templates/velar/velar-nav";
import { VelarHero } from "@/components/templates/velar/velar-hero";
import { VelarHouseAnimation } from "@/components/templates/velar/velar-house-animation";
import { VelarStatementSection } from "@/components/templates/velar/velar-statement-section";
import { VelarGallerySection } from "@/components/templates/velar/velar-gallery-section";
import { VelarSpacesSection } from "@/components/templates/velar/velar-spaces-section";
import { VelarServicesSection } from "@/components/templates/velar/velar-services-section";
import { VelarWorkflowSection } from "@/components/templates/velar/velar-workflow-section";
import { VelarTestimonialsSection } from "@/components/templates/velar/velar-testimonials-section";
import { VelarContactSection } from "@/components/templates/velar/velar-contact-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";

function isOverlappingTop(el: HTMLElement | null) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom > 0;
}

export function VelarTemplate({
  content,
  topOffset = 0,
}: {
  content: LandingContent;
  topOffset?: number;
  slug?: string;
  bookingEnabled?: boolean;
}) {
  const [navColor, setNavColor] = useState("var(--site-primary)");
  const [menuOpen, setMenuOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const scrollContainer = usePreviewScrollContainer();
  const { backgroundImage, houseImage } = resolveVelarHeroImages(content.hero);
  const heroContent: LandingContent = {
    ...content,
    hero: { ...content.hero, image: backgroundImage },
  };

  const updateNavColor = useCallback(() => {
    const onDark =
      isOverlappingTop(darkRef.current) ||
      isOverlappingTop(galleryRef.current) ||
      isOverlappingTop(workflowRef.current) ||
      isOverlappingTop(footerRef.current);
    setNavColor(onDark ? "var(--site-on-dark)" : "var(--site-primary)");
  }, []);

  useLayoutEffect(() => {
    updateNavColor();

    const handleUpdate = () => updateNavColor();
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
  }, [scrollContainer, updateNavColor]);

  return (
    <TemplateLazyMotion>
      <div
        ref={rootRef}
        className="relative bg-[var(--site-surface)]"
        style={{ overflowX: "clip" }}
      >
      <VelarAosInit rootRef={rootRef} />

      <VelarNav
        brand={content.brand || "Velar."}
        brandLogoType={content.brandLogoType ?? "text"}
        brandLogoImage={content.brandLogoImage ?? ""}
        navColor={navColor}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        navLinks={getVisibleNav(content.nav, content.hiddenSections, "velar")}
        topOffset={topOffset}
      />

      <VelarHero content={heroContent} heroRef={heroRef} heroVisible />

      <ActiveOffersRenderer content={content} />

      <VelarHouseAnimation
        darkRef={darkRef}
        heroRef={heroRef}
        houseImage={houseImage}
      />

      {isSectionVisible(content, "story") ? (
        <VelarStatementSection content={content} sectionRef={darkRef} />
      ) : null}

      {isSectionVisible(content, "listings") ? (
        <div ref={galleryRef}>
          <VelarGallerySection content={content} />
        </div>
      ) : null}

      {isSectionVisible(content, "residences") ? <VelarSpacesSection content={content} /> : null}

      {isSectionVisible(content, "servicios") ? <VelarServicesSection content={content} /> : null}

      {isSectionVisible(content, "proceso") ? (
        <div ref={workflowRef}>
          <VelarWorkflowSection content={content} />
        </div>
      ) : null}

      {isSectionVisible(content, "testimonios") ? (
        <VelarTestimonialsSection content={content} />
      ) : null}

      <div ref={footerRef}>
        <VelarContactSection content={content} />
      </div>
    </div>
    </TemplateLazyMotion>
  );
}
