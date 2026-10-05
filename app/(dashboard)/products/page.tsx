import Link from "next/link";
import { getEffectiveClientId } from "@/lib/auth";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { requireProductsAccess } from "@/lib/require-products-access";
import { getProductPage } from "@/data/products";
import { catalogQuerySchema } from "@/lib/schemas/products";
import { PRODUCTS_COPY } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { CatalogFilters } from "@/components/products/components/catalog-filters";
import { CatalogPagination } from "@/components/products/components/catalog-pagination";
import { ProductListItem } from "@/components/products/components/product-list-item";
import { ImportProductsButton } from "@/components/products/components/import-products-button";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const userId = await getEffectiveClientId();
  if (!userId) return null;
  const landing = await getLandingPageByUserId(userId);
  if (!landing || !await requireProductsAccess(landing.id)) return null;
  const parsed = catalogQuerySchema.safeParse(await searchParams);
  if (!parsed.success) return <main id="products-main" className="p-8"><p>{PRODUCTS_COPY.invalidFilters}</p><Link href="/products">{PRODUCTS_COPY.resetFilters}</Link></main>;
  const page = await getProductPage(landing.id, parsed.data, false);
  return <main id="products-main" className="mx-auto max-w-7xl space-y-6 p-5 md:p-8">
    <header className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-3xl font-semibold">{PRODUCTS_COPY.title}</h1><p className="mt-2 text-on-surface-variant">{PRODUCTS_COPY.description}</p></div><div className="flex flex-wrap gap-2"><Button asChild variant="outline"><Link href="/products/settings">{PRODUCTS_COPY.configure}</Link></Button>{landing.template === "nuvolets" ? <ImportProductsButton landingId={landing.id} /> : null}<Button asChild><Link href="/products/new">{PRODUCTS_COPY.new}</Link></Button></div></header>
    <CatalogFilters key={JSON.stringify(parsed.data)} query={parsed.data} categories={page.categories} brands={page.brands} sizes={page.sizes} privateView />
    <p className="text-sm text-on-surface-variant">{page.total} {PRODUCTS_COPY.count}</p>
    <div className="overflow-hidden rounded-xl border border-border bg-surface">{page.products.length ? page.products.map((product) => <ProductListItem key={product.id} product={product} />) : <p className="p-8">{PRODUCTS_COPY.empty}</p>}</div>
    <CatalogPagination query={parsed.data} page={page.page} total={page.total} basePath="/products" />
  </main>;
}
