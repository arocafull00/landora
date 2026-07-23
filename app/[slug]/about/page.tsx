import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioAboutPage } from "@/components/templates/portfolio/portfolio-about-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getLandingPageBySlug } from "@/data/landing-pages";
import { toLandingContent } from "@/lib/landing-mapper";
import { resolvePortfolioAboutPageContent } from "@/lib/portfolio-about-content";
import { isSitePageEnabled } from "@/lib/site-pages";
import { getPublicLandingUrl } from "@/lib/public-site-url";

type AboutPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { slug } = await params;
  const landing = await getLandingPageBySlug(slug);

  if (
    !landing ||
    landing.template !== "portfolio" ||
    !isSitePageEnabled(landing.branding?.enabledPages, "about")
  ) {
    return {};
  }

  const brand = landing.branding?.brand || landing.name;
  const content = toLandingContent(landing);
  const about = resolvePortfolioAboutPageContent(content);

  return {
    title: `${about.title || "About me"} | ${brand}`,
    description:
      about.intro ||
      landing.hero?.subtitle ||
      landing.seo?.description ||
      "",
    alternates: {
      canonical: getPublicLandingUrl(landing, "/about"),
    },
    icons: landing.seo?.favicon ? { icon: landing.seo.favicon } : undefined,
  };
}

export default async function PublicAboutPage({ params }: AboutPageProps) {
  const { slug } = await params;
  const landing = await getLandingPageBySlug(slug);

  if (
    !landing ||
    landing.template !== "portfolio" ||
    !isSitePageEnabled(landing.branding?.enabledPages, "about")
  ) {
    notFound();
  }

  const content = toLandingContent(landing);

  return (
    <SiteThemeScope appearance={content.appearance} template="portfolio">
      <PortfolioAboutPage
        content={content}
      />
    </SiteThemeScope>
  );
}
