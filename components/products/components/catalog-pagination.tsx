import Link from "next/link";
import type { CatalogQuery } from "@/lib/schemas/products";
import { PRODUCT_PAGE_SIZE } from "@/lib/products";

const COPY = { previous: "Anterior", next: "Siguiente", page: "Página", label: "Paginación del catálogo" } as const;
export function CatalogPagination({ query, page, total, basePath }: { query: CatalogQuery; page: number; total: number; basePath: string }) {
  const pages = Math.max(1, Math.ceil(total / PRODUCT_PAGE_SIZE));
  const href = (target: number) => `${basePath}?${new URLSearchParams({ ...Object.fromEntries(Object.entries(query).map(([key, value]) => [key, String(value)])), page: String(target) })}`;
  return <nav aria-label={COPY.label} className="flex items-center justify-between gap-4 py-6 text-sm">
    {page > 1 ? <Link href={href(page - 1)} className="underline">{COPY.previous}</Link> : <span />}
    <span>{COPY.page} {page} / {pages}</span>
    {page < pages ? <Link href={href(page + 1)} className="underline">{COPY.next}</Link> : <span />}
  </nav>;
}
