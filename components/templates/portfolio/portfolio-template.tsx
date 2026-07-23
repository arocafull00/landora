"use client";

import { Fragment, useCallback, useLayoutEffect, useRef, useState } from "react";
import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import {
  getAboutNavHref,
  getOrderedVisibleBodySections,
  getVisibleNav,
  isPortfolioAboutNavHref,
  normalizeNavHref,
} from "@/lib/template-sections";
import { getScrollTargets } from "@/lib/scroll-parent";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { getHeroVariant } from "@/components/templates/shared/heroes/hero-variant-registry";
import { PortfolioAosInit } from "@/components/templates/portfolio/portfolio-aos-init";
import { PortfolioNav } from "@/components/templates/portfolio/portfolio-nav";
import { PortfolioAbout } from "@/components/templates/portfolio/portfolio-about";
import { PortfolioProjectsSection } from "@/components/templates/portfolio/portfolio-projects-section";
import { PortfolioWorkHistorySection } from "@/components/templates/portfolio/portfolio-work-history-section";
import { PortfolioSkillsSection } from "@/components/templates/portfolio/portfolio-skills-section";
import { PortfolioServicesSection } from "@/components/templates/portfolio/portfolio-services-section";
import { PortfolioTestimonialsSection } from "@/components/templates/portfolio/portfolio-testimonials-section";
import { PortfolioFaqSection } from "@/components/templates/portfolio/portfolio-faq-section";
import { PortfolioContactSection } from "@/components/templates/portfolio/portfolio-contact-section";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";
import { isSitePageEnabled } from "@/lib/site-pages";
import { normalizeLandingSlug } from "@/lib/blog-slug";

function isOverlappingTop(el: HTMLElement | null) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom > 0;
}

function renderPortfolioBodySection(
  anchor: string,
  content: LandingContent,
  landingSlug: string,
  previewLandingId?: string,
) {
  if (anchor === "story") return <PortfolioAbout content={content} />;
  if (anchor === "experiencia") return <PortfolioWorkHistorySection content={content} />;
  if (anchor === "proyectos") {
    return (
      <PortfolioProjectsSection
        content={content}
        landingSlug={landingSlug}
        previewLandingId={previewLandingId}
      />
    );
  }
  if (anchor === "skills") return <PortfolioSkillsSection content={content} />;
  if (anchor === "servicios") return <PortfolioServicesSection content={content} />;
  if (anchor === "testimonios") return <PortfolioTestimonialsSection content={content} />;
  if (anchor === "faq") return <PortfolioFaqSection content={content} />;
  return null;
}

export function PortfolioTemplate({
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
  const [overHero, setOverHero] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroVariantId = sectionSelections?.hero ?? "portfolio";
  const heroNavTone = getHeroVariant(heroVariantId).navTone;
  const { primaryCtaHref, secondaryCtaHref } = getHeroCtaTargets({
    bookingEnabled,
    content,
    slug: slug ?? "",
    template: "portfolio",
  });
  const homeHref = previewLandingId
    ? `/preview/${previewLandingId}`
    : slug
      ? `/${normalizeLandingSlug(slug)}`
      : "/";
  const aboutEnabled = isSitePageEnabled(content.enabledPages, "about");
  const publicAboutHref =
    slug && aboutEnabled ? getAboutNavHref(slug) : undefined;
  const previewAboutHref = previewLandingId
    ? `/preview/${previewLandingId}/about`
    : undefined;
  const resolvedAboutHref = aboutEnabled
    ? (previewAboutHref ?? publicAboutHref)
    : undefined;
  const aboutAlreadyInNav = content.nav.some((item) => {
    const href = normalizeNavHref("portfolio", item.href);
    return (
      isPortfolioAboutNavHref(href) ||
      (previewAboutHref !== undefined && href === previewAboutHref)
    );
  });
  const aboutHref =
    resolvedAboutHref && (!aboutAlreadyInNav || previewLandingId)
      ? resolvedAboutHref
      : undefined;
  const navLinks = getVisibleNav(
    content.nav,
    content.hiddenSections,
    "portfolio",
  ).flatMap((item) => {
    if (!resolvedAboutHref) return item;
    const href = normalizeNavHref("portfolio", item.href);
    const isAboutLink =
      isPortfolioAboutNavHref(href) ||
      href === previewAboutHref ||
      href === publicAboutHref;
    if (!isAboutLink) return item;
    if (previewLandingId) return [];
    return { ...item, href: resolvedAboutHref };
  });

  const updateNavState = useCallback(() => {
    setOverHero(isOverlappingTop(heroRef.current));
  }, []);

  useLayoutEffect(() => {
    updateNavState();
    const scrollTargets = getScrollTargets(rootRef.current, null);

    for (const target of scrollTargets) {
      target.addEventListener("scroll", updateNavState, { passive: true });
    }
    window.addEventListener("resize", updateNavState);

    return () => {
      for (const target of scrollTargets) {
        target.removeEventListener("scroll", updateNavState);
      }
      window.removeEventListener("resize", updateNavState);
    };
  }, [updateNavState]);

  return (
    <TemplateLazyMotion>
      <div
        ref={rootRef}
        className="relative bg-[var(--site-surface)]"
        style={{ overflowX: "clip" }}
      >
      <PortfolioAosInit rootRef={rootRef} />

      <PortfolioNav
        activePage="home"
        brand={content.brand || "Mora."}
        brandLogoType={content.brandLogoType ?? "text"}
        brandLogoImage={content.brandLogoImage ?? ""}
        aboutHref={aboutHref}
        homeHref={homeHref}
        navLinks={navLinks}
        ctaLabel={content.hero.ctaLabel ?? ""}
        ctaHref={primaryCtaHref}
        heroVariantId={heroVariantId}
        heroNavTone={heroNavTone}
        overHero={overHero}
        homePageTarget={previewLandingId ? { type: "home" } : undefined}
        aboutPageTarget={
          previewLandingId && aboutHref ? { type: "about" } : undefined
        }
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

      {getOrderedVisibleBodySections("portfolio", content).map((section) => (
        <Fragment key={section.anchor}>
          {renderPortfolioBodySection(
            section.anchor,
            content,
            slug ?? "",
            previewLandingId,
          )}
        </Fragment>
      ))}

      <PortfolioContactSection content={content} />
    </div>
    </TemplateLazyMotion>
  );
}
