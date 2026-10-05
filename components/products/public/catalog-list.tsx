import type { PublicProductDto, ProductPageDto } from "@/lib/domain/dtos";
import type { CatalogQuery } from "@/lib/schemas/products";
import { PublicCatalogFilters } from "./catalog-filters";
import { CatalogPagination } from "../components/catalog-pagination";
import { PublicProductCard } from "./product-card";
import { CatalogHeading } from "./catalog-heading";

const COPY = { empty: "No hay productos que coincidan con los filtros." } as const;
export function CatalogList({ title, description, page, query, basePath, preview }: { title: string; description: string; page: ProductPageDto<PublicProductDto>; query: CatalogQuery; basePath: string; preview: boolean }) {
  return <div className="mx-auto max-w-7xl space-y-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
    <PublicCatalogFilters key={JSON.stringify(query)} query={query} categories={page.categories} brands={page.brands} sizes={page.sizes} heading={<CatalogHeading title={title} description={description} total={page.total} preview={preview} />} />
    {page.products.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">{page.products.map((product, index) => <PublicProductCard key={product.id} product={product} basePath={basePath} selectedSize={query.size} index={index} />)}</div> : <p className="py-12 text-center text-ink-muted">{COPY.empty}</p>}
    <CatalogPagination query={query} total={page.total} page={page.page} basePath={basePath} />
  </div>;
}
