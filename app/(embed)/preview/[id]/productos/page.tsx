import type { Metadata } from "next";
import { CatalogRoute } from "@/components/products/public/catalog-route";
export const metadata: Metadata = { robots: { index: false, follow: false } };
export default async function PreviewCatalogPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) { return <CatalogRoute identifier={(await params).id} preview productSlug={null} searchParams={await searchParams} />; }
