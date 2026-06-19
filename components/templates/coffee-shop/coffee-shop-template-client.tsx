"use client";

import { useRef, type CSSProperties } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { getVisibleNav, isSectionVisible } from "@/lib/template-sections";
import { getBookingCtaHref } from "@/lib/booking/cta-href";
import { getTemplatePalette } from "@/lib/template-palettes";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
import { CoffeeShopNav } from "@/components/templates/coffee-shop/coffee-shop-nav";
import { CoffeeShopHero } from "@/components/templates/coffee-shop/coffee-shop-hero";
import { CoffeeShopStorySection } from "@/components/templates/coffee-shop/coffee-shop-story-section";
import { CoffeeShopMenuSection } from "@/components/templates/coffee-shop/coffee-shop-menu-section";
import { GallerySection } from "@/components/templates/shared/gallery-section";
import { CoffeeShopHoursSection } from "@/components/templates/coffee-shop/coffee-shop-hours-section";
import { CoffeeShopTestimonialsSection } from "@/components/templates/coffee-shop/coffee-shop-testimonials-section";
import { CoffeeShopFaqSection } from "@/components/templates/coffee-shop/coffee-shop-faq-section";
import { CoffeeShopContactSection } from "@/components/templates/coffee-shop/coffee-shop-contact-section";
import { LandingBookingSection } from "@/components/booking/landing-booking-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";

function getCoffeeShopThemeVars(palette: ReturnType<typeof getTemplatePalette>): CSSProperties {
  return {
    ["--coffee-primary" as string]: palette.primary,
    ["--coffee-secondary" as string]: palette.secondary,
    ["--coffee-accent" as string]: palette.accent,
    ["--coffee-muted" as string]: palette.muted,
    ["--coffee-surface" as string]: palette.surface,
    ["--coffee-foreground" as string]: palette.foreground,
    backgroundColor: palette.surface,
    overflowX: "clip",
  };
}

export function CoffeeShopTemplateClient({
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
  const palette = getTemplatePalette("coffee-shop");
  const ctaHref = getBookingCtaHref(content, bookingEnabled, "#contacto");
  const heroCtaHref = getBookingCtaHref(content, bookingEnabled, "#carta");

  return (
    <TemplateLazyMotion>
      <div ref={rootRef} className="relative" style={getCoffeeShopThemeVars(palette)}>
        <CoffeeShopNav
          brand={content.brand || "Grano & Taza."}
          brandLogoType={content.brandLogoType ?? "text"}
          brandLogoImage={content.brandLogoImage ?? ""}
          navLinks={getVisibleNav(content.nav, content.hiddenSections, "coffee-shop")}
          ctaLabel={content.hero.ctaLabel ?? ""}
          ctaHref={ctaHref}
          topOffset={topOffset}
          scrollRootRef={rootRef}
        />

        <CoffeeShopHero content={content} heroRef={heroRef} ctaHref={heroCtaHref} />

        <ActiveOffersRenderer content={content} />

        {isSectionVisible(content, "story") ? (
          <CoffeeShopStorySection content={content} />
        ) : null}

        {isSectionVisible(content, "carta") ? <CoffeeShopMenuSection content={content} /> : null}

        {isSectionVisible(content, "galeria") ? (
          <GallerySection content={content} templateId="coffee-shop" />
        ) : null}

        {isSectionVisible(content, "horarios") ? (
          <CoffeeShopHoursSection content={content} />
        ) : null}

        {isSectionVisible(content, "testimonios") ? (
          <CoffeeShopTestimonialsSection content={content} />
        ) : null}

        {isSectionVisible(content, "faq") ? <CoffeeShopFaqSection content={content} /> : null}

        {bookingEnabled && slug && isSectionVisible(content, "reservas") ? (
          <LandingBookingSection content={content} slug={slug} templateId="coffee-shop" />
        ) : null}

        <CoffeeShopContactSection content={content} />
      </div>
    </TemplateLazyMotion>
  );
}
