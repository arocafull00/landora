import type { Metadata } from "next";
import { CatalogRoute } from "@/components/products/public/catalog-route";
export const metadata: Metadata = { robots: { index: false, follow: false } };
export default async function PreviewProductPage({ params }: { params: Promise<{ id: string; productSlug: string }> }) { const { id, productSlug } = await params; return <CatalogRoute identifier={id} preview productSlug={productSlug} searchParams={{}} />; }
