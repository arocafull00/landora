import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPreviewFrame } from "@/components/dashboard/landing-preview-frame";
import { getPreviewLanding } from "@/lib/api/landing-auth";
import { toLandingContent } from "@/lib/landing-mapper";
import { resolveSectionSelections } from "@/lib/section-selections";
import { resolveGalleryItems } from "@/lib/gallery-content";
import { findSignalCaseBySlug } from "@/lib/signal-cases";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function SignalCasePreviewPage({
  params,
}: {
  params: Promise<{ id: string; caseSlug: string }>;
}) {
  const { id, caseSlug } = await params;
  const landing = await getPreviewLanding(id);

  if (landing.template !== "signal") notFound();

  const gallery = resolveGalleryItems("signal", toLandingContent(landing).gallery ?? []);
  if (!findSignalCaseBySlug(gallery, caseSlug)) notFound();

  return (
    <LandingPreviewFrame
      bookingEnabled={false}
      initialCaseSlug={caseSlug}
      initialContent={toLandingContent(landing)}
      initialSectionSelections={resolveSectionSelections(
        landing.template,
        landing.sectionSelections ?? [],
      )}
      previewLandingId={landing.id}
      sitePage="home"
      slug={landing.slug}
      template={landing.template}
    />
  );
}
