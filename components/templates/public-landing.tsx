import { LandingAnalyticsInit } from "@/components/analytics/landing-analytics-init";
import { CoffeeShopTemplate } from "@/components/templates/coffee-shop/coffee-shop-template";
import { FloristeriaTemplate } from "@/components/templates/floristeria/floristeria-template";
import { OficioProTemplate } from "@/components/templates/oficio-pro/oficio-pro-template";
import { PortfolioTemplate } from "@/components/templates/portfolio/portfolio-template";
import { RistoranteTemplate } from "@/components/templates/ristorante/ristorante-template";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { StudioTemplate } from "@/components/templates/studio/studio-template";
import { VelarTemplate } from "@/components/templates/velar/velar-template";
import { WhatsappFloatButton } from "@/components/shared/whatsapp-float-button";
import type { PublishedLanding } from "@/data/landing-publications";
import { resolveTenantBySlug } from "@/lib/booking/resolve-tenant";

const TEMPLATE_COMPONENTS = {
  velar: VelarTemplate,
  studio: StudioTemplate,
  portfolio: PortfolioTemplate,
  ristorante: RistoranteTemplate,
  floristeria: FloristeriaTemplate,
  "oficio-pro": OficioProTemplate,
  "coffee-shop": CoffeeShopTemplate,
} as const;

export async function PublicLanding({
  landing,
}: {
  landing: PublishedLanding;
}) {
  const tenant = await resolveTenantBySlug(landing.slug);
  const Component = TEMPLATE_COMPONENTS[landing.template] ?? VelarTemplate;

  return (
    <>
      <LandingAnalyticsInit landingId={landing.id} clientId={landing.userId} />
      <SiteThemeScope
        appearance={landing.content.appearance}
        template={landing.template}
      >
        <Component
          content={landing.content}
          slug={landing.slug}
          bookingEnabled={tenant?.enabled ?? false}
          sectionSelections={landing.sectionSelections}
        />
        {landing.content.contact.whatsappEnabled ? (
          <WhatsappFloatButton phone={landing.content.contact.phone} />
        ) : null}
      </SiteThemeScope>
    </>
  );
}
