import { LandingAnalyticsInit } from "@/components/analytics/landing-analytics-init";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { WhatsappFloatButton } from "@/components/shared/whatsapp-float-button";
import type { PublishedLanding } from "@/data/landing-publications";
import { resolveTenantBySlug } from "@/lib/booking/resolve-tenant";
import { TemplateRenderer } from "@/components/templates/template-renderer";
import { templateSupports } from "@/lib/template-registry";
import { getCopyrightYear } from "@/lib/copyright-year";
import { getPublicRenderTime } from "@/lib/public-render-time";
import { VELAR_WHATSAPP_MESSAGE } from "@/lib/velar-links";
import { getPublicCatalogPresentation } from "@/data/catalog-presentation";
import { applyCatalogPresentation } from "@/lib/catalog-presentation";
import { syncCompanyContent } from "@/lib/company-details";
import { getPublicSubscriptionSettings } from "@/data/subscription-settings";
import { applySubscriptionSettings, SUBSCRIPTION_PRIVACY_PATH } from "@/lib/email-subscriptions/settings";
import { getPublicLandingPath } from "@/lib/public-site-url";

export async function PublicLanding({
  landing,
}: {
  landing: PublishedLanding;
}) {
  const [tenant, copyrightYear, renderedAt, catalog, subscriptionSettings] = await Promise.all([
    templateSupports(landing.template, "booking") ? resolveTenantBySlug(landing.slug) : null,
    getCopyrightYear(),
    getPublicRenderTime(),
    getPublicCatalogPresentation(landing.id, landing.userId),
    templateSupports(landing.template, "newsletter") ? getPublicSubscriptionSettings(landing.id) : null,
  ]);
  const baseContent = syncCompanyContent(applyCatalogPresentation(landing.content, catalog));
  const content = subscriptionSettings
    ? applySubscriptionSettings(baseContent, subscriptionSettings, getPublicLandingPath(SUBSCRIPTION_PRIVACY_PATH))
    : baseContent;

  return (
    <>
      <LandingAnalyticsInit landingId={landing.id} clientId={landing.userId} />
      <SiteThemeScope
        appearance={landing.content.appearance}
        template={landing.template}
      >
        <TemplateRenderer
          template={landing.template}
          bookingEnabled={tenant?.enabled ?? false}
          content={content}
          copyrightYear={copyrightYear}
          renderedAt={renderedAt}
          sectionSelections={landing.sectionSelections}
          slug={landing.slug}
        />
        {landing.content.contact.whatsappEnabled ? (
          <WhatsappFloatButton
            message={
              landing.template === "velar" ? VELAR_WHATSAPP_MESSAGE : undefined
            }
            phone={landing.content.contact.phone}
          />
        ) : null}
      </SiteThemeScope>
    </>
  );
}
