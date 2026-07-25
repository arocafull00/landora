import { Suspense } from "react";
import type { Metadata } from "next";
import { PortfolioAboutPageContent } from "@/components/templates/portfolio/portfolio-about-page-content";
import { PublicLandingSkeleton } from "@/components/templates/public-landing-skeleton";
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
  const about = resolvePortfolioAboutPageContent(landing.content);

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

export default function PublicAboutPage({ params }: AboutPageProps) {
  return (
    <Suspense fallback={<PublicLandingSkeleton />}>
      {params.then(({ slug }) => (
        <PortfolioAboutPageContent slug={slug} />
      ))}
    </Suspense>
  );
}
