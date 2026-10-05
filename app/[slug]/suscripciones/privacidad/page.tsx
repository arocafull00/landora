import { Suspense } from "react";
import type { Metadata } from "next";
import { SubscriptionPrivacyPageContent } from "@/components/templates/nuvolets/subscription-privacy-page-content";
import { PublicLandingLoading } from "@/components/templates/public-landing-loading";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { getPublicSubscriptionSettings } from "@/data/subscription-settings";
import { isSubscriptionConfigured, SUBSCRIPTION_PRIVACY_PATH } from "@/lib/email-subscriptions/settings";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";

type SubscriptionPrivacyRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: SubscriptionPrivacyRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const landing = await getPublishedLandingBySlug(slug);
  if (!landing || landing.template !== "nuvolets") return {};
  const settings = await getPublicSubscriptionSettings(landing.id);
  if (!isSubscriptionConfigured(settings)) return {};
  return createPublishedSiteMetadata({
    landing,
    title: `${settings.privacyTitle} | ${landing.content.brand || landing.name}`,
    description: settings.privacyTitle,
    pathname: SUBSCRIPTION_PRIVACY_PATH,
  });
}

export default function SubscriptionPrivacyRoute({ params }: SubscriptionPrivacyRouteProps) {
  return (
    <Suspense fallback={<PublicLandingLoading />}>
      {params.then(({ slug }) => (
        <SubscriptionPrivacyPageContent slug={slug} />
      ))}
    </Suspense>
  );
}
