import { templateSupports } from "@/lib/template-registry";
import type { Metadata } from "next";
import { getPreviewLanding } from "@/lib/api/landing-auth";
import { toLandingContent } from "@/lib/landing-mapper";
import { resolveSectionSelections } from "@/lib/section-selections";
import { resolveTenantBySlug } from "@/lib/booking/resolve-tenant";
import { LandingPreviewFrame } from "@/components/dashboard/landing-preview-frame";
import { getCatalogPresentation } from "@/data/catalog-presentation";
import { getSubscriptionSettings } from "@/data/subscription-settings";
import { SUBSCRIPTION_PRIVACY_PATH } from "@/lib/email-subscriptions/settings";
import { getPreviewLandingPath } from "@/lib/public-site-url";

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
  const [tenant, catalog, subscriptionSettings] = await Promise.all([
    resolveTenantBySlug(landing.slug),
    getCatalogPresentation(landing.id, landing.userId, true),
    templateSupports(landing.template, "newsletter") ? getSubscriptionSettings(landing.id) : null,
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
      subscription={subscriptionSettings ? { settings: subscriptionSettings, privacyUrl: getPreviewLandingPath(landing.id, SUBSCRIPTION_PRIVACY_PATH) } : undefined}
    />
  );
}
