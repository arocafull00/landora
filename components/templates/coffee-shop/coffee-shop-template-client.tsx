"use client";

import { useRef } from "react";
import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import { getVisibleNav, isSectionVisible } from "@/lib/template-sections";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { getHeroVariant } from "@/components/templates/shared/heroes/hero-variant-registry";
import { CoffeeShopNav } from "@/components/templates/coffee-shop/coffee-shop-nav";
import { CoffeeShopStorySection } from "@/components/templates/coffee-shop/coffee-shop-story-section";
import { CoffeeShopMenuSection } from "@/components/templates/coffee-shop/coffee-shop-menu-section";
import { GallerySection } from "@/components/templates/shared/gallery-section";
import { CoffeeShopHoursSection } from "@/components/templates/coffee-shop/coffee-shop-hours-section";
import { CoffeeShopTestimonialsSection } from "@/components/templates/coffee-shop/coffee-shop-testimonials-section";
import { CoffeeShopFaqSection } from "@/components/templates/coffee-shop/coffee-shop-faq-section";
import { CoffeeShopContactSection } from "@/components/templates/coffee-shop/coffee-shop-contact-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";

export function CoffeeShopTemplateClient({
  content,
  topOffset = 0,
  slug,
  bookingEnabled = false,
  sectionSelections,
}: {
  content: LandingContent;
  topOffset?: number;
  slug?: string;
  bookingEnabled?: boolean;
  sectionSelections?: LandingSectionSelections;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroVariantId = sectionSelections?.hero ?? "coffee-shop";
  const heroNavTone = getHeroVariant(heroVariantId).navTone;
  const { primaryCtaHref, secondaryCtaHref } = getHeroCtaTargets({
    bookingEnabled,
    content,
    slug: slug ?? "",
    template: "coffee-shop",
  });

  return (
    <TemplateLazyMotion>
      <div
        ref={rootRef}
        className="relative bg-[var(--site-surface)]"
        style={{ overflowX: "clip" }}
      >
        <CoffeeShopNav
          brand={content.brand || "Grano & Taza."}
          brandLogoType={content.brandLogoType ?? "text"}
          brandLogoImage={content.brandLogoImage ?? ""}
          navLinks={getVisibleNav(content.nav, content.hiddenSections, "coffee-shop")}
          ctaLabel={content.hero.ctaLabel ?? ""}
          ctaHref={primaryCtaHref}
          heroNavTone={heroNavTone}
          topOffset={topOffset}
          scrollRootRef={rootRef}
        />

        <HeroRenderer
          content={content}
          heroRef={heroRef}
          primaryCtaHref={primaryCtaHref}
          secondaryCtaHref={secondaryCtaHref}
          variantId={heroVariantId}
        />

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

        <CoffeeShopContactSection content={content} />
      </div>
    </TemplateLazyMotion>
  );
}
