import { notFound } from "next/navigation";
import { PortfolioAboutPage } from "@/components/templates/portfolio/portfolio-about-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { isSitePageEnabled } from "@/lib/site-pages";
import { getCopyrightYear } from "@/lib/copyright-year";

export async function PortfolioAboutPageContent({ slug }: { slug: string }) {
  const [landing, copyrightYear] = await Promise.all([
    getPublishedLandingBySlug(slug),
    getCopyrightYear(),
  ]);
  if (
    !landing ||
    landing.template !== "portfolio" ||
    !isSitePageEnabled(landing.content.enabledPages, "about")
  ) {
    notFound();
  }

  const content = landing.content;

  return (
    <SiteThemeScope appearance={content.appearance} template="portfolio">
      <PortfolioAboutPage content={content} copyrightYear={copyrightYear} />
    </SiteThemeScope>
  );
}
