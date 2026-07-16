"use client";

import { useRef } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { getVisibleNav, isSectionVisible } from "@/lib/template-sections";
import { getBookingCtaHref } from "@/lib/booking/cta-href";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
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
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";

export function PortfolioTemplate({
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
      <PortfolioAosInit rootRef={rootRef} />

      <PortfolioNav
        brand={content.brand || "Mora."}
        brandLogoType={content.brandLogoType ?? "text"}
        brandLogoImage={content.brandLogoImage ?? ""}
        navLinks={getVisibleNav(content.nav, content.hiddenSections, "portfolio")}
        ctaLabel={content.hero.ctaLabel ?? ""}
        ctaHref={ctaHref}
        topOffset={topOffset}
      />

      <PortfolioHero content={content} heroRef={heroRef} ctaHref={ctaHref} />

      <ActiveOffersRenderer content={content} />

      {isSectionVisible(content, "story") ? <PortfolioAbout content={content} /> : null}

      {isSectionVisible(content, "experiencia") ? (
        <PortfolioWorkHistorySection content={content} />
      ) : null}

      {isSectionVisible(content, "proyectos") ? (
        <PortfolioProjectsSection content={content} />
      ) : null}

      {isSectionVisible(content, "skills") ? <PortfolioSkillsSection content={content} /> : null}

      {isSectionVisible(content, "servicios") ? (
        <PortfolioServicesSection content={content} />
      ) : null}

      {isSectionVisible(content, "testimonios") ? (
        <PortfolioTestimonialsSection content={content} />
      ) : null}

      {isSectionVisible(content, "faq") ? <PortfolioFaqSection content={content} /> : null}

      <PortfolioContactSection content={content} />
    </div>
    </TemplateLazyMotion>
  );
}
