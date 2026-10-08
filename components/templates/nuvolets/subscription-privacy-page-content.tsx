import { templateSupports } from "@/lib/template-registry";
import { notFound } from "next/navigation";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { getPublicSubscriptionSettings } from "@/data/subscription-settings";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { isSubscriptionConfigured, resolveSubscriptionPrivacyText } from "@/lib/email-subscriptions/settings";
import { getPublicLandingPath } from "@/lib/public-site-url";
import { SubscriptionPrivacyPage } from "./subscription-privacy-page";

export async function SubscriptionPrivacyPageContent({ slug }: { slug: string }) {
  const landing = await getPublishedLandingBySlug(slug);
  if (!landing || !templateSupports(landing.template, "newsletter")) notFound();
  const settings = await getPublicSubscriptionSettings(landing.id);
  if (!isSubscriptionConfigured(settings)) notFound();
  return (
    <SiteThemeScope appearance={landing.content.appearance} template={landing.template}>
      <SubscriptionPrivacyPage brand={landing.content.brand || landing.name} title={settings.privacyTitle} text={resolveSubscriptionPrivacyText(settings)} homeHref={getPublicLandingPath()} />
    </SiteThemeScope>
  );
}
