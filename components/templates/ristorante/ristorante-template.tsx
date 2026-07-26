"use client";

import { Fragment, useRef } from "react";
import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import {
  getOrderedVisibleBodySections,
  getVisibleNav,
  isRistoranteCartaNavHref,
  normalizeNavHref,
} from "@/lib/template-sections";
import {
  getPreviewLandingPath,
  getPublicLandingPath,
} from "@/lib/public-site-url";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { getHeroVariant } from "@/components/templates/shared/heroes/hero-variant-registry";
import { RistoranteAosInit } from "@/components/templates/ristorante/ristorante-aos-init";
import { RistoranteNav } from "@/components/templates/ristorante/ristorante-nav";
import { RistoranteStorySection } from "@/components/templates/ristorante/ristorante-story-section";
import { GallerySection } from "@/components/templates/shared/gallery-section";
import { RistoranteChefSection } from "@/components/templates/ristorante/ristorante-chef-section";
import { RistoranteHoursSection } from "@/components/templates/ristorante/ristorante-hours-section";
import { RistoranteTestimonialsSection } from "@/components/templates/ristorante/ristorante-testimonials-section";
import { RistoranteContactSection } from "@/components/templates/ristorante/ristorante-contact-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";

function renderRistoranteBodySection(anchor: string, content: LandingContent) {
  if (anchor === "story") return <RistoranteStorySection content={content} />;
  if (anchor === "galeria") return <GallerySection content={content} templateId="ristorante" />;
  if (anchor === "equipo") return <RistoranteChefSection content={content} />;
  if (anchor === "horarios") return <RistoranteHoursSection content={content} />;
  if (anchor === "testimonios") return <RistoranteTestimonialsSection content={content} />;
  return null;
}

export function RistoranteTemplate({
  content,
  topOffset = 0,
  slug,
  previewLandingId,
  bookingEnabled = false,
  sectionSelections,
}: {
  content: LandingContent;
  topOffset?: number;
  slug?: string;
  previewLandingId?: string;
  bookingEnabled?: boolean;
  sectionSelections?: LandingSectionSelections;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroVariantId = sectionSelections?.hero ?? "ristorante";
  const heroNavTone =
    getHeroVariant(heroVariantId)?.navTone ??
    getHeroVariant("ristorante").navTone;
  const publicBaseHref = getPublicLandingPath();
  const previewBaseHref = previewLandingId
    ? getPreviewLandingPath(previewLandingId)
    : undefined;
  const homeHref = previewBaseHref ?? publicBaseHref;
  const cartaHref = previewLandingId
    ? getPreviewLandingPath(previewLandingId, "/carta")
    : getPublicLandingPath("/carta");
  const { primaryCtaHref, secondaryCtaHref } = getHeroCtaTargets({
    bookingEnabled,
    content,
    previewLandingId,
    slug: slug ?? "",
    template: "ristorante",
  });
  const navLinks = getVisibleNav(
    content.nav,
    content.hiddenSections,
    "ristorante",
  ).map((link) => {
    const href = normalizeNavHref("ristorante", link.href);
    if (isRistoranteCartaNavHref(href)) {
      return { ...link, href: cartaHref };
    }
    return { ...link, href };
  });

  return (
    <TemplateLazyMotion>
      <div
        ref={rootRef}
        className="relative bg-[var(--site-surface)]"
        style={{ overflowX: "clip" }}
      >
        <RistoranteAosInit rootRef={rootRef} />

        <RistoranteNav
          brand={content.brand || "Osteria da Luca."}
          brandLogoImage={content.brandLogoImage ?? ""}
          brandLogoType={content.brandLogoType ?? "text"}
          cartaHref={cartaHref}
          cartaPageTarget={previewLandingId ? { type: "carta" } : undefined}
          ctaHref={primaryCtaHref}
          ctaLabel={content.hero.ctaLabel ?? ""}
          heroNavTone={heroNavTone}
          homeHref={homeHref}
          homePageTarget={previewLandingId ? { type: "home" } : undefined}
          navLinks={navLinks}
          scrollRootRef={rootRef}
          topOffset={topOffset}
        />

        <HeroRenderer
          content={content}
          heroRef={heroRef}
          primaryCtaHref={primaryCtaHref}
          secondaryCtaHref={secondaryCtaHref}
          variantId={heroVariantId}
        />

        <ActiveOffersRenderer content={content} />

        {getOrderedVisibleBodySections("ristorante", content).map((section) => (
          <Fragment key={section.anchor}>
            {renderRistoranteBodySection(section.anchor, content)}
          </Fragment>
        ))}

        <RistoranteContactSection content={content} />
      </div>
    </TemplateLazyMotion>
  );
}
