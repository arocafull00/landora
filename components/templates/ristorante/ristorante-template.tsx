"use client";

import { useRef } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { getVisibleNav, isSectionVisible } from "@/lib/template-sections";
import { RistoranteAosInit } from "@/components/templates/ristorante/ristorante-aos-init";
import { RistoranteNav } from "@/components/templates/ristorante/ristorante-nav";
import { RistoranteHero } from "@/components/templates/ristorante/ristorante-hero";
import { RistoranteStorySection } from "@/components/templates/ristorante/ristorante-story-section";
import { RistoranteMenuSection } from "@/components/templates/ristorante/ristorante-menu-section";
import { RistoranteGallerySection } from "@/components/templates/ristorante/ristorante-gallery-section";
import { RistoranteChefSection } from "@/components/templates/ristorante/ristorante-chef-section";
import { RistoranteHoursSection } from "@/components/templates/ristorante/ristorante-hours-section";
import { RistoranteTestimonialsSection } from "@/components/templates/ristorante/ristorante-testimonials-section";
import { RistoranteContactSection } from "@/components/templates/ristorante/ristorante-contact-section";

export function RistoranteTemplate({
  content,
  topOffset = 0,
}: {
  content: LandingContent;
  topOffset?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div
      ref={rootRef}
      className="relative"
      style={{ backgroundColor: "#FAF7F2", overflowX: "clip" }}
    >
      <RistoranteAosInit rootRef={rootRef} />

      <RistoranteNav
        brand={content.brand || "Osteria da Luca."}
        brandLogoType={content.brandLogoType ?? "text"}
        brandLogoImage={content.brandLogoImage ?? ""}
        navLinks={getVisibleNav(content.nav, content.hiddenSections, "ristorante")}
        ctaLabel={content.hero.ctaLabel ?? ""}
        topOffset={topOffset}
      />

      <RistoranteHero content={content} heroRef={heroRef} />

      {isSectionVisible(content, "story") ? (
        <RistoranteStorySection content={content} />
      ) : null}

      {isSectionVisible(content, "carta") ? <RistoranteMenuSection content={content} /> : null}

      {isSectionVisible(content, "galeria") ? (
        <RistoranteGallerySection content={content} />
      ) : null}

      {isSectionVisible(content, "equipo") ? <RistoranteChefSection content={content} /> : null}

      {isSectionVisible(content, "horarios") ? (
        <RistoranteHoursSection content={content} />
      ) : null}

      {isSectionVisible(content, "testimonios") ? (
        <RistoranteTestimonialsSection content={content} />
      ) : null}

      <RistoranteContactSection content={content} />
    </div>
  );
}
