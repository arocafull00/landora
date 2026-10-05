import { Suspense } from "react";
import type { Metadata } from "next";
import { getPublicCatalog } from "@/lib/catalog-context";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";
import { CatalogRoute } from "@/components/products/public/catalog-route";
import { PublicLandingLoading } from "@/components/templates/public-landing-loading";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const context = await getPublicCatalog((await params).slug);
  return context ? createPublishedSiteMetadata({ landing: context.landing, title: context.config.title, description: context.config.description, pathname: "/productos" }) : {};
}
export default function PublicCatalogPage({ params, searchParams }: Props) {
  return <Suspense fallback={<PublicLandingLoading />}>{Promise.all([params, searchParams]).then(([{ slug }, query]) => <CatalogRoute identifier={slug} preview={false} productSlug={null} searchParams={query} />)}</Suspense>;
}
