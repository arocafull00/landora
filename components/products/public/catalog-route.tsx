import { notFound } from "next/navigation";
import { getPublicCatalog, getPreviewCatalog } from "@/lib/catalog-context";
import { getProductPage, getProductBySlug } from "@/data/products";
import { catalogQuerySchema, catalogRouteSchema, previewCatalogQuerySchema } from "@/lib/schemas/products";
import { toPublicProduct } from "@/lib/products";
import { getPreviewLandingPath, getPublicLandingUrl } from "@/lib/public-site-url";
import { CatalogShell } from "./catalog-shell";
import { CatalogList } from "./catalog-list";
import { ProductDetail } from "./product-detail";
import { StoreVisit } from "./store-visit";
import { RelatedProducts } from "./related-products";
import { getCatalogStore } from "@/lib/catalog-presentation";
import { CatalogStoreCta } from "./catalog-store-cta";

const RELATED_LIMIT = 3;

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
    const product = await getProductBySlug(landing.id, productSlug, preview);
    if (!product) notFound();
    const relatedPage = await getProductPage(landing.id, { ...catalogQuerySchema.parse({}), category: product.category }, !preview, preview);
    const related = relatedPage.products.filter((item) => item.id !== product.id).slice(0, RELATED_LIMIT).map(toPublicProduct);
    body = <>
      <ProductDetail product={product} phone={landing.content.contact.phone} publicUrl={getPublicLandingUrl(landing, `/productos/${product.slug}`)} catalogHref={catalogHref} preview={preview} hasStore={store !== null} />
      {store ? <StoreVisit store={store} /> : null}
      <RelatedProducts products={related} basePath={catalogHref} />
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

