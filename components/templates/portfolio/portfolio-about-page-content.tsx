import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { PortfolioAboutPage } from "@/components/templates/portfolio/portfolio-about-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { isSitePageEnabled } from "@/lib/site-pages";

export async function PortfolioAboutPageContent({ slug }: { slug: string }) {
  "use cache";

  cacheLife("max");

  const landing = await getPublishedLandingBySlug(slug);
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
      <PortfolioAboutPage content={content} />
    </SiteThemeScope>
  );
}
