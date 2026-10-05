import type { PublicProductDto, ProductPageDto } from "@/lib/domain/dtos";
import type { CatalogQuery } from "@/lib/schemas/products";
import { CatalogFilters } from "../components/catalog-filters";
import { CatalogPagination } from "../components/catalog-pagination";
import { PublicProductCard } from "./product-card";

const COPY = { empty: "No hay productos que coincidan con los filtros.", preview: "Vista previa: incluye productos en borrador." } as const;
export function CatalogList({ title, description, page, query, basePath, preview }: { title: string; description: string; page: ProductPageDto<PublicProductDto>; query: CatalogQuery; basePath: string; preview: boolean }) {
  return <div className="space-y-8"><header><h1 className="font-headline text-4xl font-semibold md:text-5xl">{title}</h1>{description ? <p className="mt-4 max-w-2xl text-ink-secondary">{description}</p> : null}{preview ? <p className="mt-3 text-sm text-warning">{COPY.preview}</p> : null}</header>
    <CatalogFilters key={JSON.stringify(query)} query={query} categories={page.categories} brands={page.brands} sizes={page.sizes} />
    {page.products.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{page.products.map((product) => <PublicProductCard key={product.id} product={product} basePath={basePath} selectedSize={query.size} />)}</div> : <p className="py-12 text-center text-ink-muted">{COPY.empty}</p>}
    <CatalogPagination query={query} total={page.total} page={page.page} basePath={basePath} />
  </div>;
}
