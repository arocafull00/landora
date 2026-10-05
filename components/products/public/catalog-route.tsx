import { notFound } from "next/navigation";
import { getPublicCatalog, getPreviewCatalog } from "@/lib/catalog-context";
import { getProductPage, getProductBySlug } from "@/data/products";
import { catalogQuerySchema, catalogRouteSchema } from "@/lib/schemas/products";
import { toPublicProduct } from "@/lib/products";
import { getPreviewLandingPath, getPublicLandingUrl } from "@/lib/public-site-url";
import { CatalogShell } from "./catalog-shell";
import { CatalogList } from "./catalog-list";
import { ProductDetail } from "./product-detail";

export async function CatalogRoute({ identifier, preview, productSlug, searchParams }: { identifier: string; preview: boolean; productSlug: string | null; searchParams: Record<string, string | string[] | undefined> }) {
  if (productSlug && !catalogRouteSchema.shape.productSlug.safeParse(productSlug).success) notFound();
  const context = preview ? await getPreviewCatalog(identifier) : await getPublicCatalog(identifier);
  if (!context) notFound();
  const { landing, config } = context;
  const catalogHref = preview ? getPreviewLandingPath(landing.id, "/productos") : "/productos";
  const homeHref = preview ? getPreviewLandingPath(landing.id) : "/";
  let body;
  if (productSlug) {
    const product = await getProductBySlug(landing.id, productSlug, preview);
    if (!product) notFound();
    body = <ProductDetail product={product} phone={config.whatsappPhone} publicUrl={getPublicLandingUrl(landing, `/productos/${product.slug}`)} catalogHref={catalogHref} preview={preview} />;
  } else {
    const parsed = catalogQuerySchema.safeParse(searchParams);
    if (!parsed.success) notFound();
    const query = { ...parsed.data, status: "all" as const, availability: parsed.data.availability === "pending" ? "all" as const : parsed.data.availability };
    const page = await getProductPage(landing.id, query, !preview, preview);
    body = <CatalogList title={config.title} description={config.description} page={{ ...page, products: page.products.map(toPublicProduct) }} query={query} basePath={catalogHref} preview={preview} />;
  }
  return <CatalogShell content={landing.content} template={landing.template} siteName={landing.name} homeHref={homeHref} catalogHref={catalogHref}>{body}</CatalogShell>;
}
