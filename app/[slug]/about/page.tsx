import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioAboutPage } from "@/components/templates/portfolio/portfolio-about-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { resolvePortfolioAboutPageContent } from "@/lib/portfolio-about-content";
import { isSitePageEnabled } from "@/lib/site-pages";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";

type AboutPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { slug } = await params;
  const landing = await getPublishedLandingBySlug(slug);

  if (
    !landing ||
    landing.template !== "portfolio" ||
    !isSitePageEnabled(landing.content.enabledPages, "about")
  ) {
    return {};
  }

  const brand = landing.content.brand || landing.name;
  const content = landing.content;
  const about = resolvePortfolioAboutPageContent(content);

  return createPublishedSiteMetadata({
    landing,
    title: `${about.title || "About me"} | ${brand}`,
    description:
      about.intro ||
      landing.content.hero.subtitle ||
      landing.seo.description ||
      "",
    pathname: "/about",
    image: about.image,
  });
}

export default async function PublicAboutPage({ params }: AboutPageProps) {
  const { slug } = await params;
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
      <PortfolioAboutPage
        content={content}
      />
    </SiteThemeScope>
  );
}
