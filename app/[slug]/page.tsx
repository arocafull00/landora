import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLandingPageBySlug } from "@/data/landing-pages";
import { toLandingContent } from "@/lib/landing-mapper";
import { VelarTemplate } from "@/components/templates/velar/velar-template";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const landing = await getLandingPageBySlug(slug);

  if (!landing) return {};

  return {
    title: landing.seo?.title || landing.hero?.title || landing.name,
    description: landing.seo?.description || landing.hero?.subtitle || "",
  };
}

export default async function PublicLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const landing = await getLandingPageBySlug(slug);

  if (!landing) notFound();

  const content = toLandingContent(landing);

  return <VelarTemplate content={content} />;
}
