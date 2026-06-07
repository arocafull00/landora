"use client";

import { useRef } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { StudioAosInit } from "@/components/templates/studio/studio-aos-init";
import { StudioNav } from "@/components/templates/studio/studio-nav";
import { StudioHero } from "@/components/templates/studio/studio-hero";
import { StudioAbout } from "@/components/templates/studio/studio-about";
import { StudioServicesSection } from "@/components/templates/studio/studio-services-section";
import { StudioTeamSection } from "@/components/templates/studio/studio-team-section";
import { StudioGallerySection } from "@/components/templates/studio/studio-gallery-section";
import { StudioTestimonialsSection } from "@/components/templates/studio/studio-testimonials-section";
import { StudioFaqSection } from "@/components/templates/studio/studio-faq-section";
import { StudioContactSection } from "@/components/templates/studio/studio-contact-section";

export function StudioTemplate({
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
      style={{ backgroundColor: "#faf9f7", overflowX: "clip" }}
    >
      <StudioAosInit rootRef={rootRef} />

      <StudioNav
        brand={content.brand || "Studio"}
        navLinks={content.nav}
        topOffset={topOffset}
      />

      <StudioHero content={content} heroRef={heroRef} />

      <StudioAbout content={content} />

      <StudioServicesSection content={content} />

      <StudioTeamSection content={content} />

      <StudioGallerySection content={content} />

      <StudioTestimonialsSection content={content} />

      <StudioFaqSection content={content} />

      <StudioContactSection content={content} />
    </div>
  );
}
