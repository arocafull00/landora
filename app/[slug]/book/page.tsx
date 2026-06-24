import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLandingPageBySlug } from "@/data/landing-pages";
import { resolveTenantBySlug } from "@/lib/booking/resolve-tenant";
import { BookingWidget } from "@/components/booking/booking-widget";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const landing = await getLandingPageBySlug(slug);

  if (!landing) return {};

  const brand = landing.branding?.brand || landing.name;

  return {
    title: `Reservar cita — ${brand}`,
    icons: landing.seo?.favicon ? { icon: landing.seo.favicon } : undefined,
  };
}

export default async function PublicBookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [landing, tenant] = await Promise.all([
    getLandingPageBySlug(slug),
    resolveTenantBySlug(slug),
  ]);

  if (!landing || !tenant?.enabled) notFound();

  const brand = landing.branding?.brand || landing.name;

  return (
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
  );
}
