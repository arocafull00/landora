import { CookieConsentBanner } from "@/components/analytics/cookie-consent-banner";
import { LandingSpeculationRules } from "@/components/templates/landing-speculation-rules";
import { getPublishedLandingParams } from "@/lib/public-static-params";

export function generateStaticParams() {
  return getPublishedLandingParams();
}

export default function PublicLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingSpeculationRules />
      {children}
      <CookieConsentBanner />
    </>
  );
}
