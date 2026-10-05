import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubscriptionSetupNotice } from "@/components/dashboard/email-subscriptions/components/subscription-setup-notice";
import { SubscriptionPrivacyPage } from "@/components/templates/nuvolets/subscription-privacy-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getSubscriptionSettings } from "@/data/subscription-settings";
import { getPreviewLanding } from "@/lib/api/landing-auth";
import { isSubscriptionConfigured, resolveSubscriptionPrivacyText } from "@/lib/email-subscriptions/settings";
import { toLandingContent } from "@/lib/landing-mapper";
import { getPreviewLandingPath } from "@/lib/public-site-url";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function SubscriptionPrivacyPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const landing = await getPreviewLanding(id);
  if (landing.template !== "nuvolets") notFound();
  const content = toLandingContent(landing);
  const settings = await getSubscriptionSettings(landing.id);
  return (
    <SiteThemeScope appearance={content.appearance} template={landing.template}>
      {isSubscriptionConfigured(settings) ? null : <div className="p-5"><SubscriptionSetupNotice href="/email-subscriptions" /></div>}
      <SubscriptionPrivacyPage brand={content.brand || landing.name} title={settings.privacyTitle} text={resolveSubscriptionPrivacyText(settings)} homeHref={getPreviewLandingPath(landing.id)} />
    </SiteThemeScope>
  );
}
