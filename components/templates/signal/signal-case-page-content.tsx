import { notFound } from "next/navigation";
import { PublicLanding } from "@/components/templates/public-landing";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { findSignalCaseBySlug } from "@/lib/signal-cases";
import { resolveGalleryItems } from "@/lib/gallery-content";

export async function SignalCasePageContent({
  caseSlug,
  slug,
}: {
  caseSlug: string;
  slug: string;
}) {
  const landing = await getPublishedLandingBySlug(slug);
  if (!landing || landing.template !== "signal") notFound();

  const gallery = resolveGalleryItems("signal", landing.content.gallery ?? []);
  const signalCase = findSignalCaseBySlug(gallery, caseSlug);
  if (!signalCase) notFound();

  return <PublicLanding initialCaseSlug={caseSlug} landing={landing} />;
}
