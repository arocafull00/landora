import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { resolveTenantBySlug } from "@/lib/booking/resolve-tenant";
import { BookingWidget } from "@/components/booking/booking-widget";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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

export default async function PublicBookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [landing, tenant] = await Promise.all([
    getPublishedLandingBySlug(slug),
    resolveTenantBySlug(slug),
  ]);

  if (!landing || !tenant?.enabled) notFound();

  const brand = landing.content.brand || landing.name;

  return (
    <SiteThemeScope
      appearance={landing.content.appearance}
      template={landing.template}
    >
      <main className="min-h-screen bg-surface-container-low py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-6 lg:mb-8">
            <p className="font-body text-body-sm text-on-surface-variant">{brand}</p>
            <h1 className="font-headline text-headline-md font-semibold text-on-surface">
              Reservar cita
            </h1>
          </div>
          <BookingWidget slug={slug} />
        </div>
      </main>
    </SiteThemeScope>
  );
}
