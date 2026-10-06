import { Suspense } from "react";
import type { Metadata } from "next";
import { getPublicCatalog } from "@/lib/catalog-context";
import { getPublicProductBySlug } from "@/data/public-products";
import { catalogRouteSchema } from "@/lib/schemas/products";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";
import { CatalogRoute } from "@/components/products/public/catalog-route";
import { ProductDetailLoading } from "@/components/products/public/product-detail-loading";
type Props = { params: Promise<{ slug: string; productSlug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const parsed = catalogRouteSchema.safeParse(await params);
  if (!parsed.success || !parsed.data.productSlug) return {};
  const context = await getPublicCatalog(parsed.data.slug);
  if (!context) return {};
  const product = await getPublicProductBySlug(context.landing.id, parsed.data.productSlug);
  return product ? createPublishedSiteMetadata({ landing: context.landing, title: product.title, description: product.subtitle || product.description.slice(0, 300), pathname: `/productos/${product.slug}`, image: product.images[0]?.url }) : {};
}
export default function PublicProductPage({ params }: Props) { return <Suspense fallback={<ProductDetailLoading />}>{params.then(({ slug, productSlug }) => <CatalogRoute identifier={slug} productSlug={productSlug} preview={false} searchParams={{}} />)}</Suspense>; }
