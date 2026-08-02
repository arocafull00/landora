import { Fragment } from "react";
import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import {
  getAboutNavHref,
  getOrderedVisibleBodySections,
  getVisibleNav,
  isPortfolioAboutNavHref,
  normalizeNavHref,
} from "@/lib/template-sections";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { getHeroVariant } from "@/components/templates/shared/heroes/hero-variant-registry";
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
import {
  getPreviewLandingPath,
  getPublicLandingPath,
} from "@/lib/public-site-url";
import { TemplateAos } from "@/components/templates/shared/template-aos";

function renderPortfolioBodySection(
  anchor: string,
  content: LandingContent,
  previewLandingId?: string,
) {
  if (anchor === "story") return <PortfolioAbout content={content} />;
  if (anchor === "experiencia") return <PortfolioWorkHistorySection content={content} />;
  if (anchor === "proyectos") {
    return (
      <PortfolioProjectsSection
        content={content}
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
  copyrightYear,
  renderedAt,
  topOffset = 0,
  slug,
  previewLandingId,
  bookingEnabled = false,
  sectionSelections,
}: {
  content: LandingContent;
  copyrightYear: number;
  renderedAt: Date;
  topOffset?: number;
  slug?: string;
  previewLandingId?: string;
  bookingEnabled?: boolean;
  sectionSelections?: LandingSectionSelections;
}) {
  const heroVariantId = sectionSelections?.hero ?? "portfolio";
  const heroNavTone = getHeroVariant(heroVariantId).navTone;
  const { primaryCtaHref, secondaryCtaHref } = getHeroCtaTargets({
    bookingEnabled,
    content,
    previewLandingId,
    slug: slug ?? "",
    template: "portfolio",
  });
  const homeHref = previewLandingId
    ? getPreviewLandingPath(previewLandingId)
    : getPublicLandingPath();
  const aboutEnabled = isSitePageEnabled(content.enabledPages, "about");
  const publicAboutHref =
    slug && aboutEnabled ? getAboutNavHref() : undefined;
  const previewAboutHref = previewLandingId
    ? getPreviewLandingPath(previewLandingId, "/about")
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

  return (
    <TemplateAos
        className="relative bg-[var(--site-surface)]"
        style={{ overflowX: "clip" }}
    >

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
        overHero
        homePageTarget={previewLandingId ? { type: "home" } : undefined}
        aboutPageTarget={
          previewLandingId && aboutHref ? { type: "about" } : undefined
        }
        topOffset={topOffset}
      />

      <HeroRenderer
        content={content}
        primaryCtaHref={primaryCtaHref}
        secondaryCtaHref={secondaryCtaHref}
        variantId={heroVariantId}
      />

      <ActiveOffersRenderer content={content} renderedAt={renderedAt} />

      {getOrderedVisibleBodySections("portfolio", content).map((section) => (
        <Fragment key={section.anchor}>
          {renderPortfolioBodySection(
            section.anchor,
            content,
            previewLandingId,
          )}
        </Fragment>
      ))}

      <PortfolioContactSection content={content} copyrightYear={copyrightYear} />
    </TemplateAos>
  );
}
