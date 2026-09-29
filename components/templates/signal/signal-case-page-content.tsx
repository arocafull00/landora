import { notFound } from "next/navigation";
import { LandingAnalyticsInit } from "@/components/analytics/landing-analytics-init";
import { WhatsappFloatButton } from "@/components/shared/whatsapp-float-button";
import { SignalCasePage } from "@/components/templates/signal/signal-case-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { findSignalCaseBySlug } from "@/lib/signal-cases";
import { resolveGalleryItems } from "@/lib/gallery-content";
import { getCopyrightYear } from "@/lib/copyright-year";

export async function SignalCasePageContent({
  caseSlug,
  slug,
}: {
  caseSlug: string;
  slug: string;
}) {
  const landing = await getPublishedLandingBySlug(slug);
  if (!landing || landing.template !== "signal") notFound();

  const gallery = resolveGalleryItems("signal", landing.content.gallery ?? []);
  const signalCase = findSignalCaseBySlug(gallery, caseSlug);
  if (!signalCase) notFound();

  const copyrightYear = await getCopyrightYear();

  return (
    <>
      <LandingAnalyticsInit landingId={landing.id} clientId={landing.userId} />
      <SiteThemeScope appearance={landing.content.appearance} template="signal">
        <SignalCasePage
          content={landing.content}
          copyrightYear={copyrightYear}
          homeHref="/"
          item={signalCase}
          slug={landing.slug}
        />
        {landing.content.contact.whatsappEnabled ? (
          <WhatsappFloatButton phone={landing.content.contact.phone} />
        ) : null}
      </SiteThemeScope>
    </>
  );
}
