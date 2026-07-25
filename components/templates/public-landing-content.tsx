import { notFound } from "next/navigation";
import { PublicLanding } from "@/components/templates/public-landing";
import { getPublishedLandingBySlug } from "@/data/landing-publications";

export async function PublicLandingContent({ slug }: { slug: string }) {
  const landing = await getPublishedLandingBySlug(slug);
  if (!landing) notFound();

  return <PublicLanding landing={landing} />;
}
