"use client";

import { useRef } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { FloristeriaAosInit } from "@/components/templates/floristeria/floristeria-aos-init";
import { FloristeriaNav } from "@/components/templates/floristeria/floristeria-nav";
import { FloristeriaHero } from "@/components/templates/floristeria/floristeria-hero";
import { FloristeriaAbout } from "@/components/templates/floristeria/floristeria-about";
import { FloristeriaServicesSection } from "@/components/templates/floristeria/floristeria-services-section";
import { FloristeriaGallerySection } from "@/components/templates/floristeria/floristeria-gallery-section";
import { FloristeriaTeamSection } from "@/components/templates/floristeria/floristeria-team-section";
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
    <div
      ref={rootRef}
      className="relative"
      style={{ backgroundColor: "#FAFAF7", overflowX: "clip" }}
    >
      <FloristeriaAosInit rootRef={rootRef} />

      <FloristeriaNav
        brand={content.brand || "Jardín Secreto."}
        navLinks={content.nav}
        topOffset={topOffset}
      />

      <FloristeriaHero content={content} heroRef={heroRef} />

      <FloristeriaAbout content={content} />

      <FloristeriaServicesSection content={content} />

      <FloristeriaGallerySection content={content} />

      <FloristeriaTeamSection content={content} />

      <FloristeriaTestimonialsSection content={content} />

      <FloristeriaFaqSection content={content} />

      <FloristeriaContactSection content={content} />
    </div>
  );
}
