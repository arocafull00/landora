import { Suspense } from "react";
import type { Metadata } from "next";
import { PublicLandingContent } from "@/components/templates/public-landing-content";
import { PublicLandingSkeleton } from "@/components/templates/public-landing-skeleton";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";

type PublicLandingPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PublicLandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const landing = await getPublishedLandingBySlug(slug);

  if (!landing) return {};

  return createPublishedSiteMetadata({
    landing,
    title: landing.seo.title || landing.content.hero.title || landing.name,
    description:
      landing.seo.description || landing.content.hero.subtitle || "",
  });
}

export default function PublicLandingPage({ params }: PublicLandingPageProps) {
  return (
    <Suspense fallback={<PublicLandingSkeleton />}>
      {params.then(({ slug }) => (
        <PublicLandingContent slug={slug} />
      ))}
    </Suspense>
  );
}
