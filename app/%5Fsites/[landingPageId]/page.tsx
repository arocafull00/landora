import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicLanding } from "@/components/templates/public-landing";
import { getPublishedLandingById } from "@/data/landing-publications";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";
import { resourceIdSchema } from "@/lib/schemas/api";

type InternalPublicLandingPageProps = {
  params: Promise<{ landingPageId: string }>;
};

export async function generateMetadata({
  params,
}: InternalPublicLandingPageProps): Promise<Metadata> {
  const { landingPageId } = await params;
  const parsedId = resourceIdSchema.safeParse(landingPageId);
  if (!parsedId.success) return {};

  const landing = await getPublishedLandingById(parsedId.data);

  if (!landing) return {};

  return createPublishedSiteMetadata({
    landing,
    title: landing.seo.title || landing.content.hero.title || landing.name,
    description:
      landing.seo.description || landing.content.hero.subtitle || "",
  });
}

export default async function InternalPublicLandingPage({
  params,
}: InternalPublicLandingPageProps) {
  const { landingPageId } = await params;
  const parsedId = resourceIdSchema.safeParse(landingPageId);
  if (!parsedId.success) notFound();

  const landing = await getPublishedLandingById(parsedId.data);

  if (!landing) notFound();

  return <PublicLanding landing={landing} />;
}
