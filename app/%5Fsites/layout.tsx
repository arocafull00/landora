import { CookieConsentBanner } from "@/components/analytics/cookie-consent-banner";

export default function InternalPublicLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <CookieConsentBanner />
    </>
  );
}
