import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPreviewFrame } from "@/components/dashboard/landing-preview-frame";
import { getPreviewLanding } from "@/lib/api/landing-auth";
import { toLandingContent } from "@/lib/landing-mapper";
import { resolveSectionSelections } from "@/lib/section-selections";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function CartaPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const landing = await getPreviewLanding(id);

  if (landing.template !== "ristorante") notFound();

  return (
    <LandingPreviewFrame
      initialContent={toLandingContent(landing)}
      initialSectionSelections={resolveSectionSelections(
        landing.template,
        landing.sectionSelections ?? [],
      )}
      bookingEnabled={false}
      previewLandingId={landing.id}
      sitePage="carta"
      slug={landing.slug}
      template={landing.template}
    />
  );
}
