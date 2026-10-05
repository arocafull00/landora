import type { Metadata } from "next";
import { getPreviewLanding } from "@/lib/api/landing-auth";
import { toLandingContent } from "@/lib/landing-mapper";
import { resolveSectionSelections } from "@/lib/section-selections";
import { resolveTenantBySlug } from "@/lib/booking/resolve-tenant";
import { LandingPreviewFrame } from "@/components/dashboard/landing-preview-frame";
import { getCatalogPresentation } from "@/data/catalog-presentation";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function LandingPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const landing = await getPreviewLanding(id);
  const content = toLandingContent(landing);
  const sectionSelections = resolveSectionSelections(
    landing.template,
    landing.sectionSelections ?? [],
  );
  const [tenant, catalog] = await Promise.all([
    resolveTenantBySlug(landing.slug),
    getCatalogPresentation(landing.id, landing.userId, true),
  ]);

  return (
    <LandingPreviewFrame
      initialContent={content}
      initialSectionSelections={sectionSelections}
      template={landing.template}
      slug={landing.slug}
      previewLandingId={landing.id}
      bookingEnabled={tenant?.enabled ?? false}
      catalog={catalog}
    />
  );
}
