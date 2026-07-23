import { PortfolioAboutHero } from "@/components/templates/portfolio/portfolio-about-hero";
import { PortfolioAboutStorySection } from "@/components/templates/portfolio/portfolio-about-story-section";
import { PortfolioContactSection } from "@/components/templates/portfolio/portfolio-contact-section";
import { PortfolioNav } from "@/components/templates/portfolio/portfolio-nav";
import { normalizeLandingSlug } from "@/lib/blog-slug";
import type { LandingContent } from "@/lib/dashboard-data";
import { resolvePortfolioAboutPageContent } from "@/lib/portfolio-about-content";

export function PortfolioAboutPage({
  content,
  landingSlug,
  previewLandingId,
}: {
  content: LandingContent;
  landingSlug: string;
  previewLandingId?: string;
}) {
  const slug = normalizeLandingSlug(landingSlug);
  const publicBaseHref = `/${slug}`;
  const previewBaseHref = previewLandingId
    ? `/preview/${previewLandingId}`
    : undefined;
  const homeHref = previewBaseHref ?? publicBaseHref;
  const aboutHref = previewBaseHref
    ? `${previewBaseHref}/about`
    : `${publicBaseHref}/about`;
  const about = resolvePortfolioAboutPageContent(content);
  const navLinks = content.nav.map((link) => {
    if (link.href.startsWith("#")) {
      return { ...link, href: `${homeHref}${link.href}` };
    }
    if (previewLandingId && link.href === `${publicBaseHref}/about`) {
      return { ...link, href: aboutHref };
    }
    return link;
  });

  return (
    <div className="min-h-screen bg-portfolio-canvas text-portfolio-ink">
      <PortfolioNav
        activePage="about"
        aboutHref={aboutHref}
        brand={content.brand}
        brandLogoImage={content.brandLogoImage}
        brandLogoType={content.brandLogoType}
        ctaHref="#contacto"
        ctaLabel={content.hero.ctaLabel}
        heroNavTone="dark"
        heroVariantId="portfolio"
        homeHref={homeHref}
        navLinks={navLinks}
        overHero
      />
      <main>
        <PortfolioAboutHero about={about} />
        <PortfolioAboutStorySection about={about} />
      </main>
      <PortfolioContactSection content={content} />
    </div>
  );
}
