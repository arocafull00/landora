import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLandingPageBySlug } from "@/data/landing-pages";
import { toLandingContent } from "@/lib/landing-mapper";
import { VelarTemplate } from "@/components/templates/velar/velar-template";
import { StudioTemplate } from "@/components/templates/studio/studio-template";
import { PortfolioTemplate } from "@/components/templates/portfolio/portfolio-template";
import { RistoranteTemplate } from "@/components/templates/ristorante/ristorante-template";
import { FloristeriaTemplate } from "@/components/templates/floristeria/floristeria-template";
import { OficioProTemplate } from "@/components/templates/oficio-pro/oficio-pro-template";
import { CoffeeShopTemplate } from "@/components/templates/coffee-shop/coffee-shop-template";

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
  const landing = await getLandingPageBySlug(slug);

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

  return <Component content={content} />;
}
