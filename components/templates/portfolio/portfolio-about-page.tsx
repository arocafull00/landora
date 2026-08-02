import { PortfolioAboutHero } from "@/components/templates/portfolio/portfolio-about-hero";
import { PortfolioAboutStorySection } from "@/components/templates/portfolio/portfolio-about-story-section";
import { PortfolioContactSection } from "@/components/templates/portfolio/portfolio-contact-section";
import { PortfolioNav } from "@/components/templates/portfolio/portfolio-nav";
import type { LandingContent } from "@/lib/dashboard-data";
import { resolvePortfolioAboutPageContent } from "@/lib/portfolio-about-content";
import { isPortfolioAboutNavHref } from "@/lib/template-sections";
import {
  getPreviewLandingPath,
  getPublicLandingPath,
} from "@/lib/public-site-url";

export function PortfolioAboutPage({
  content,
  copyrightYear,
  previewLandingId,
}: {
  content: LandingContent;
  copyrightYear: number;
  previewLandingId?: string;
}) {
  const publicBaseHref = getPublicLandingPath();
  const previewBaseHref = previewLandingId
    ? getPreviewLandingPath(previewLandingId)
    : undefined;
  const homeHref = previewBaseHref ?? publicBaseHref;
  const aboutHref = previewLandingId
    ? getPreviewLandingPath(previewLandingId, "/about")
    : getPublicLandingPath("/about");
  const about = resolvePortfolioAboutPageContent(content);
  const navLinks = content.nav.map((link) => {
    if (link.href.startsWith("#")) {
      return { ...link, href: `${homeHref}${link.href}` };
    }
    if (isPortfolioAboutNavHref(link.href) || link.href === aboutHref) {
      return { ...link, href: aboutHref };
    }
    return link;
  });

  return (
    <>
      <div className="min-h-screen bg-portfolio-canvas text-portfolio-ink">
        <PortfolioNav
          activePage="about"
          brand={content.brand || "Mora."}
          brandLogoImage={content.brandLogoImage ?? ""}
          brandLogoType={content.brandLogoType ?? "text"}
          ctaHref="#contacto"
          ctaLabel={content.hero.ctaLabel ?? ""}
          heroNavTone="dark"
          heroVariantId="portfolio"
          homeHref={homeHref}
          homePageTarget={previewLandingId ? { type: "home" } : undefined}
          navLinks={navLinks}
          overHero={false}
        />
        <main>
          <PortfolioAboutHero about={about} />
          <PortfolioAboutStorySection about={about} />
        </main>
        <PortfolioContactSection content={content} copyrightYear={copyrightYear} />
      </div>
    </>
  );
}
