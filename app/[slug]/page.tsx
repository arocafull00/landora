import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLandingPageBySlug } from "@/data/landing-pages";
import { TollStoryTemplate } from "@/components/templates/toll-story/toll-story-template";
import { VelarTemplate } from "@/components/templates/velar/velar-template";
import { parseLandingContent } from "@/lib/landing-schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const landing = await getLandingPageBySlug(slug);

  if (!landing) return {};

  const content = parseLandingContent(landing.contentJson);

  return {
    title: content.hero.title || landing.name,
    description: content.hero.subtitle || "",
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

  const content = parseLandingContent(landing.contentJson);

  if (landing.template === "velar") {
    return <VelarTemplate content={content} />;
  }

  return <TollStoryTemplate content={content} />;
}
