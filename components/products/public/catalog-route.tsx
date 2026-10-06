import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPublicCatalog, getPreviewCatalog } from "@/lib/catalog-context";
import { getProductPage, getProductBySlug } from "@/data/products";
import { getPublicProductBySlug } from "@/data/public-products";
import { catalogQuerySchema, catalogRouteSchema, previewCatalogQuerySchema } from "@/lib/schemas/products";
import { toPublicProduct } from "@/lib/products";
import { getPreviewLandingPath, getPublicLandingUrl } from "@/lib/public-site-url";
import { CatalogShell } from "./catalog-shell";
import { CatalogList } from "./catalog-list";
import { ProductDetailContent } from "./product-detail-content";
import { ProductDetailLoading } from "./product-detail-loading";
import { ProductSecondaryContent } from "./product-secondary-content";
import { getCatalogStore } from "@/lib/catalog-presentation";
import { CatalogStoreCta } from "./catalog-store-cta";

export async function CatalogRoute({ identifier, preview, productSlug, searchParams }: { identifier: string; preview: boolean; productSlug: string | null; searchParams: Record<string, string | string[] | undefined> }) {
  if (productSlug && !catalogRouteSchema.shape.productSlug.safeParse(productSlug).success) notFound();
  const context = preview ? await getPreviewCatalog(identifier) : await getPublicCatalog(identifier);
  if (!context) notFound();
  const { landing, config } = context;
  const catalogHref = preview ? getPreviewLandingPath(landing.id, "/productos") : "/productos";
  const homeHref = preview ? getPreviewLandingPath(landing.id) : "/";
  const store = getCatalogStore(landing.content);
  let body;
  if (productSlug) {
    const productPromise = preview ? getProductBySlug(landing.id, productSlug, true) : getPublicProductBySlug(landing.id, productSlug);
    body = <>
      <Suspense fallback={<ProductDetailLoading withHeader={false} />}>
        <ProductDetailContent productPromise={productPromise} phone={landing.content.contact.phone} siteUrl={getPublicLandingUrl(landing)} catalogHref={catalogHref} preview={preview} hasStore={store !== null} />
      </Suspense>
      <Suspense fallback={null}>
        <ProductSecondaryContent productPromise={productPromise} landingId={landing.id} store={store} preview={preview} catalogHref={catalogHref} />
      </Suspense>
    </>;
  } else {
    const parsed = (preview ? previewCatalogQuerySchema : catalogQuerySchema).safeParse(searchParams);
    if (!parsed.success) notFound();
    const query = { ...parsed.data, status: "all" as const, availability: parsed.data.availability === "pending" ? "all" as const : parsed.data.availability };
    const page = await getProductPage(landing.id, query, !preview, preview);
    body = <>
      <CatalogList title={config.title} description={config.description} page={{ ...page, products: page.products.map(toPublicProduct) }} query={query} basePath={catalogHref} preview={preview} />
      {store ? <CatalogStoreCta store={store} phone={landing.content.contact.phone} /> : null}
    </>;
  }
  return <CatalogShell content={landing.content} template={landing.template} siteName={landing.name} homeHref={homeHref} catalogHref={catalogHref} hasStore={store !== null} isProductDetail={productSlug !== null}>{body}</CatalogShell>;
}

