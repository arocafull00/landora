"use client";

import { useRef } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { getVisibleNav, isSectionVisible } from "@/lib/template-sections";
import { getBookingCtaHref } from "@/lib/booking/cta-href";
import { OficioProContactSection } from "@/components/templates/oficio-pro/oficio-pro-contact-section";
import { LandingBookingSection } from "@/components/booking/landing-booking-section";
import { OficioProExperienceSection } from "@/components/templates/oficio-pro/oficio-pro-experience-section";
import { OficioProHero } from "@/components/templates/oficio-pro/oficio-pro-hero";
import { OficioProNav } from "@/components/templates/oficio-pro/oficio-pro-nav";
import { OficioProServicesSection } from "@/components/templates/oficio-pro/oficio-pro-services-section";
import { OficioProTestimonialsSection } from "@/components/templates/oficio-pro/oficio-pro-testimonials-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";

export function OficioProTemplate({
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
  const heroRef = useRef<HTMLElement>(null);
  const ctaHref = getBookingCtaHref(content, bookingEnabled, "#contacto");

  return (
    <div
      className="relative bg-[#FEFCFD] text-[#4A4A4A]"
      style={{
        overflowX: "clip",
        backgroundImage:
          "linear-gradient(to right, rgba(31,78,121,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,78,121,0.06) 1px, transparent 1px)",
        backgroundSize: "18px 30px",
      }}
    >
      <OficioProNav
        brand={content.brand || "Oficio Pro"}
        brandLogoImage={content.brandLogoImage ?? ""}
        brandLogoType={content.brandLogoType ?? "text"}
        navLinks={getVisibleNav(content.nav, content.hiddenSections, "oficio-pro")}
        ctaHref={ctaHref}
        topOffset={topOffset}
      />
      <OficioProHero content={content} heroRef={heroRef} ctaHref={ctaHref} />
      <ActiveOffersRenderer content={content} />
      {isSectionVisible(content, "servicios") ? (
        <OficioProServicesSection
          anchor="servicios"
          category="Servicios"
          content={content}
        />
      ) : null}
      {isSectionVisible(content, "instalaciones") ? (
        <OficioProServicesSection
          anchor="instalaciones"
          category="Instalaciones"
          content={content}
          reverse
        />
      ) : null}
      {isSectionVisible(content, "testimonios") ? (
        <OficioProTestimonialsSection content={content} />
      ) : null}
      {isSectionVisible(content, "experiencia") ? (
        <OficioProExperienceSection content={content} />
      ) : null}
      {bookingEnabled && slug && isSectionVisible(content, "reservas") ? (
        <LandingBookingSection content={content} slug={slug} templateId="oficio-pro" />
      ) : null}
      <OficioProContactSection content={content} />
    </div>
  );
}
