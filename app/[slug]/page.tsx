import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PublicLanding } from "@/components/templates/public-landing";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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

export default async function PublicLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const landing = await getPublishedLandingBySlug(slug);

  if (!landing) notFound();

  return <PublicLanding landing={landing} />;
}
