import { LandingAnalyticsInit } from "@/components/analytics/landing-analytics-init";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { WhatsappFloatButton } from "@/components/shared/whatsapp-float-button";
import type { PublishedLanding } from "@/data/landing-publications";
import { resolveTenantBySlug } from "@/lib/booking/resolve-tenant";
import type { PublicTemplateRenderProps } from "@/lib/public-render-contracts";
import { getCopyrightYear } from "@/lib/copyright-year";
import { getPublicRenderTime } from "@/lib/public-render-time";

async function renderPublicTemplate(
  template: PublishedLanding["template"],
  props: PublicTemplateRenderProps,
) {
  if (template === "studio") {
    const { StudioTemplate } = await import("@/components/templates/studio/studio-template");
    return <StudioTemplate {...props} />;
  }
  if (template === "portfolio") {
    const { PortfolioTemplate } = await import("@/components/templates/portfolio/portfolio-template");
    return <PortfolioTemplate {...props} />;
  }
  if (template === "ristorante") {
    const { RistoranteTemplate } = await import("@/components/templates/ristorante/ristorante-template");
    return <RistoranteTemplate {...props} />;
  }
  if (template === "floristeria") {
    const { FloristeriaTemplate } = await import("@/components/templates/floristeria/floristeria-template");
    return <FloristeriaTemplate {...props} />;
  }
  if (template === "oficio-pro") {
    const { OficioProTemplate } = await import("@/components/templates/oficio-pro/oficio-pro-template");
    return <OficioProTemplate {...props} />;
  }
  if (template === "coffee-shop") {
    const { CoffeeShopTemplate } = await import("@/components/templates/coffee-shop/coffee-shop-template");
    return <CoffeeShopTemplate {...props} />;
  }

  const { VelarTemplate } = await import("@/components/templates/velar/velar-template");
  return <VelarTemplate {...props} />;
}

export async function PublicLanding({
  landing,
}: {
  landing: PublishedLanding;
}) {
  const [tenant, copyrightYear, renderedAt] = await Promise.all([
    resolveTenantBySlug(landing.slug),
    getCopyrightYear(),
    getPublicRenderTime(),
  ]);
  const template = await renderPublicTemplate(landing.template, {
    bookingEnabled: tenant?.enabled ?? false,
    content: landing.content,
    copyrightYear,
    renderedAt,
    sectionSelections: landing.sectionSelections,
    slug: landing.slug,
  });

  return (
    <>
      <LandingAnalyticsInit landingId={landing.id} clientId={landing.userId} />
      <SiteThemeScope
        appearance={landing.content.appearance}
        template={landing.template}
      >
        {template}
        {landing.content.contact.whatsappEnabled ? (
          <WhatsappFloatButton phone={landing.content.contact.phone} />
        ) : null}
      </SiteThemeScope>
    </>
  );
}
