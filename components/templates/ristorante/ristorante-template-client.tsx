"use client";

import { useRef } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { getVisibleNav, isSectionVisible } from "@/lib/template-sections";
import { getBookingCtaHref } from "@/lib/booking/cta-href";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
import { RistoranteNav } from "@/components/templates/ristorante/ristorante-nav";
import { RistoranteHero } from "@/components/templates/ristorante/ristorante-hero";
import { RistoranteStorySection } from "@/components/templates/ristorante/ristorante-story-section";
import { RistoranteMenuSection } from "@/components/templates/ristorante/ristorante-menu-section";
import { GallerySection } from "@/components/templates/shared/gallery-section";
import { RistoranteChefSection } from "@/components/templates/ristorante/ristorante-chef-section";
import { RistoranteHoursSection } from "@/components/templates/ristorante/ristorante-hours-section";
import { RistoranteTestimonialsSection } from "@/components/templates/ristorante/ristorante-testimonials-section";
import { RistoranteContactSection } from "@/components/templates/ristorante/ristorante-contact-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";

export function RistoranteTemplateClient({
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
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const ctaHref = getBookingCtaHref(bookingEnabled, slug ?? "", "#contacto");

  return (
    <TemplateLazyMotion>
      <div
        ref={rootRef}
        className="relative bg-[var(--site-surface)]"
        style={{ overflowX: "clip" }}
      >
        <RistoranteNav
          brand={content.brand || "Osteria da Luca."}
          brandLogoType={content.brandLogoType ?? "text"}
          brandLogoImage={content.brandLogoImage ?? ""}
          navLinks={getVisibleNav(content.nav, content.hiddenSections, "ristorante")}
          ctaLabel={content.hero.ctaLabel ?? ""}
          ctaHref={ctaHref}
          topOffset={topOffset}
          scrollRootRef={rootRef}
        />

        <RistoranteHero content={content} heroRef={heroRef} ctaHref={ctaHref} />

        <ActiveOffersRenderer content={content} />

        {isSectionVisible(content, "story") ? (
          <RistoranteStorySection content={content} />
        ) : null}

        {isSectionVisible(content, "carta") ? <RistoranteMenuSection content={content} /> : null}

        {isSectionVisible(content, "galeria") ? (
          <GallerySection content={content} templateId="ristorante" />
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
    </TemplateLazyMotion>
  );
}
