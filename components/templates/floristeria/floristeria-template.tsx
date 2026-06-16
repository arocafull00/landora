"use client";

import { useRef } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { getVisibleNav, isSectionVisible } from "@/lib/template-sections";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
import { FloristeriaAosInit } from "@/components/templates/floristeria/floristeria-aos-init";
import { FloristeriaNav } from "@/components/templates/floristeria/floristeria-nav";
import { FloristeriaHero } from "@/components/templates/floristeria/floristeria-hero";
import { FloristeriaAbout } from "@/components/templates/floristeria/floristeria-about";
import { FloristeriaCtaSection } from "@/components/templates/floristeria/floristeria-cta-section";
import { GallerySection } from "@/components/templates/shared/gallery-section";
import { FloristeriaTestimonialsSection } from "@/components/templates/floristeria/floristeria-testimonials-section";
import { FloristeriaFaqSection } from "@/components/templates/floristeria/floristeria-faq-section";
import { FloristeriaContactSection } from "@/components/templates/floristeria/floristeria-contact-section";

export function FloristeriaTemplate({
  content,
  topOffset = 0,
}: {
  content: LandingContent;
  topOffset?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  return (
    <TemplateLazyMotion>
      <div
        ref={rootRef}
        className="relative"
        style={{ backgroundColor: "#FAFAF7", overflowX: "clip" }}
      >
        <FloristeriaAosInit rootRef={rootRef} />

        <FloristeriaNav
          brand={content.brand || "Jardín Secreto."}
          brandLogoType={content.brandLogoType ?? "text"}
          brandLogoImage={content.brandLogoImage ?? ""}
          navLinks={getVisibleNav(content.nav, content.hiddenSections, "floristeria")}
          ctaLabel={content.hero.ctaLabel ?? ""}
          topOffset={topOffset}
        />

        <FloristeriaHero content={content} heroRef={heroRef} />
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
