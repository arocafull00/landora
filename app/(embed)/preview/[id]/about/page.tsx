import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { LandingPreviewFrame } from "@/components/dashboard/landing-preview-frame";
import { getAuthorizedLanding } from "@/lib/api/landing-auth";
import { getEffectiveClientId } from "@/lib/auth";
import { toLandingContent } from "@/lib/landing-mapper";
import { resolveSectionSelections } from "@/lib/section-selections";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AboutPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const clientId = await getEffectiveClientId();
  if (!clientId) redirect("/sign-in");

  const { id } = await params;
  const landing = await getAuthorizedLanding(id);

  if (!landing || landing.template !== "portfolio") notFound();

  return (
    <LandingPreviewFrame
      initialContent={toLandingContent(landing)}
      initialSectionSelections={resolveSectionSelections(
        landing.template,
        landing.sectionSelections ?? [],
      )}
      previewLandingId={landing.id}
      sitePage="about"
      slug={landing.slug}
      template={landing.template}
    />
  );
}
