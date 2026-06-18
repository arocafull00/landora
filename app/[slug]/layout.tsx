import { CookieConsentBanner } from "@/components/analytics/cookie-consent-banner";
import { PreviewScrollProvider } from "@/lib/preview-scroll-context";

export default function PublicLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PreviewScrollProvider>
      {children}
      <CookieConsentBanner />
    </PreviewScrollProvider>
  );
}
