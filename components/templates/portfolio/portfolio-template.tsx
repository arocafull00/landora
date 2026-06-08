"use client";

import { useRef } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { PortfolioAosInit } from "@/components/templates/portfolio/portfolio-aos-init";
import { PortfolioNav } from "@/components/templates/portfolio/portfolio-nav";
import { PortfolioHero } from "@/components/templates/portfolio/portfolio-hero";
import { PortfolioAbout } from "@/components/templates/portfolio/portfolio-about";
import { PortfolioProjectsSection } from "@/components/templates/portfolio/portfolio-projects-section";
import { PortfolioWorkHistorySection } from "@/components/templates/portfolio/portfolio-work-history-section";
import { PortfolioSkillsSection } from "@/components/templates/portfolio/portfolio-skills-section";
import { PortfolioServicesSection } from "@/components/templates/portfolio/portfolio-services-section";
import { PortfolioTestimonialsSection } from "@/components/templates/portfolio/portfolio-testimonials-section";
import { PortfolioFaqSection } from "@/components/templates/portfolio/portfolio-faq-section";
import { PortfolioContactSection } from "@/components/templates/portfolio/portfolio-contact-section";

export function PortfolioTemplate({
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
      style={{ backgroundColor: "#0a0a0a", overflowX: "clip" }}
    >
      <PortfolioAosInit rootRef={rootRef} />

      <PortfolioNav
        brand={content.brand || "Mora."}
        navLinks={content.nav}
        topOffset={topOffset}
      />

      <PortfolioHero content={content} heroRef={heroRef} />

      <PortfolioAbout content={content} />

      <PortfolioProjectsSection content={content} />

      <PortfolioWorkHistorySection content={content} />

      <PortfolioSkillsSection content={content} />

      <PortfolioServicesSection content={content} />

      <PortfolioTestimonialsSection content={content} />

      <PortfolioFaqSection content={content} />

      <PortfolioContactSection content={content} />
    </div>
  );
}
