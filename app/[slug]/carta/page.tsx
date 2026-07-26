import { Suspense } from "react";
import type { Metadata } from "next";
import { RistoranteMenuPageContent } from "@/components/templates/ristorante/ristorante-menu-page-content";
import { PublicLandingSkeleton } from "@/components/templates/public-landing-skeleton";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

type CartaPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CartaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const landing = await getPublishedLandingBySlug(slug);

  if (!landing || landing.template !== "ristorante") {
    return {};
  }

  const brand = landing.content.brand || landing.name;
  const heading = getSectionHeading(
    landing.content,
    "carta",
    SECTION_HEADING_DEFAULTS.ristorante.carta,
  );

  return createPublishedSiteMetadata({
    landing,
    title: `${heading.title || "Carta"} | ${brand}`,
    description:
      heading.subtitle ||
      landing.content.hero.subtitle ||
      landing.seo.description ||
      "",
    pathname: "/carta",
  });
}

export default function PublicCartaPage({ params }: CartaPageProps) {
  return (
    <Suspense fallback={<PublicLandingSkeleton />}>
      {params.then(({ slug }) => (
        <RistoranteMenuPageContent slug={slug} />
      ))}
    </Suspense>
  );
}
