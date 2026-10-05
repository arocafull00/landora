"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { CatalogQuery } from "@/lib/schemas/products";

function buildHref(pathname: string, query: CatalogQuery) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (key === "page" && value === 1) continue;
    if (key === "status" && value === "all") continue;
    if (key === "availability" && value === "all") continue;
    if (key === "sort" && value === "newest") continue;
    if (String(value)) params.set(key, String(value));
  }
  const search = params.toString();
  return search ? `${pathname}?${search}` : pathname;
}

export function useProductsNavigation(query: CatalogQuery) {
  const router = useRouter();
  const pathname = usePathname();
  const push = useCallback(
    (next: CatalogQuery) => router.push(buildHref(pathname, next)),
    [pathname, router]
  );
  const setStatus = useCallback(
    (status: CatalogQuery["status"]) => push({ ...query, status, page: 1 }),
    [push, query]
  );
  const setSearch = useCallback(
    (q: string) => push({ ...query, q, page: 1 }),
    [push, query]
  );
  const setSort = useCallback(
    (sort: CatalogQuery["sort"]) => push({ ...query, sort, page: 1 }),
    [push, query]
  );
  const applyFilters = useCallback(
    (values: Pick<CatalogQuery, "category" | "brand" | "size" | "availability">) =>
      push({ ...query, ...values, page: 1 }),
    [push, query]
  );
  const removeFilter = useCallback(
    (key: "q" | "category" | "brand" | "size" | "availability") => {
      if (key === "q") return push({ ...query, q: "", page: 1 });
      if (key === "availability") return push({ ...query, availability: "all", page: 1 });
      return push({ ...query, [key]: "", page: 1 });
    },
    [push, query]
  );
  const clearFilters = useCallback(
    () => push({ ...query, q: "", category: "", brand: "", size: "", availability: "all", page: 1 }),
    [push, query]
  );
  const pageHref = useCallback((page: number) => buildHref(pathname, { ...query, page }), [pathname, query]);
  return { setStatus, setSearch, setSort, applyFilters, removeFilter, clearFilters, pageHref };
}
