import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLandingPageBySlug, getLandingPageMetaBySlug } from "@/data/landing-pages";
import { getBookingSettings } from "@/data/booking-settings";
import { toLandingContent } from "@/lib/landing-mapper";
import { VelarTemplate } from "@/components/templates/velar/velar-template";
import { StudioTemplate } from "@/components/templates/studio/studio-template";
import { PortfolioTemplate } from "@/components/templates/portfolio/portfolio-template";
import { RistoranteTemplate } from "@/components/templates/ristorante/ristorante-template";
import { FloristeriaTemplate } from "@/components/templates/floristeria/floristeria-template";
import { OficioProTemplate } from "@/components/templates/oficio-pro/oficio-pro-template";
import { CoffeeShopTemplate } from "@/components/templates/coffee-shop/coffee-shop-template";
import { LandingAnalyticsInit } from "@/components/analytics/landing-analytics-init";
import { WhatsappFloatButton } from "@/components/shared/whatsapp-float-button";

const TEMPLATE_COMPONENTS = {
  velar: VelarTemplate,
  studio: StudioTemplate,
  portfolio: PortfolioTemplate,
  ristorante: RistoranteTemplate,
  floristeria: FloristeriaTemplate,
  "oficio-pro": OficioProTemplate,
  "coffee-shop": CoffeeShopTemplate,
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const landing = await getLandingPageMetaBySlug(slug);

  if (!landing) return {};

  return {
    title: landing.seo?.title || landing.hero?.title || landing.name,
    description: landing.seo?.description || landing.hero?.subtitle || "",
    alternates: landing.customDomain
      ? { canonical: `https://${landing.customDomain}` }
      : undefined,
  };
}

export default async function PublicLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const landing = await getLandingPageBySlug(slug);

  if (!landing) notFound();

  const content = toLandingContent(landing);
  const Component = TEMPLATE_COMPONENTS[landing.template] ?? VelarTemplate;
  const bookingSettings = await getBookingSettings(landing.userId);

  return (
    <>
      <LandingAnalyticsInit landingId={landing.id} clientId={landing.userId} />
      <Component
        content={content}
        slug={landing.slug}
        bookingEnabled={bookingSettings.enabled}
      />
      {content.contact.whatsappEnabled ? (
        <WhatsappFloatButton phone={content.contact.phone} />
      ) : null}
    </>
  );
}
