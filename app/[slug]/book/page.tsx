import { Suspense } from "react";
import type { Metadata } from "next";
import { PublicBookingContent } from "@/components/booking/public-booking-content";
import { PublicLandingSkeleton } from "@/components/templates/public-landing-skeleton";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";

type PublicBookingPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PublicBookingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const landing = await getPublishedLandingBySlug(slug);

  if (!landing) return {};

  const brand = landing.content.brand || landing.name;

  return createPublishedSiteMetadata({
    landing,
    title: `Reservar cita — ${brand}`,
    description:
      landing.seo.description || landing.content.hero.subtitle || "",
    pathname: "/book",
  });
}

export default function PublicBookingPage({ params }: PublicBookingPageProps) {
  return (
    <Suspense fallback={<PublicLandingSkeleton />}>
      {params.then(({ slug }) => (
        <PublicBookingContent slug={slug} />
      ))}
    </Suspense>
  );
}
