import { CookieConsentBanner } from "@/components/analytics/cookie-consent-banner";

export default function PublicLandingLayout({
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
