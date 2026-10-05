"use client";

import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PRODUCTS_LIST_COPY } from "../products-list-copy";
import { ProductsFiltersPopover } from "./products-filters-popover";
import { ProductsSortMenu } from "./products-sort-menu";
import type { CatalogQuery } from "@/lib/schemas/products";
import type { ProductsFiltersValues } from "../hooks/use-products-filters-form";

export function ProductsToolbar({
  query,
  total,
  categories,
  brands,
  sizes,
  onSearch,
  onApplyFilters,
  onSortChange,
}: {
  query: CatalogQuery;
  total: number;
  categories: string[];
  brands: string[];
  sizes: string[];
  onSearch: (q: string) => void;
  onApplyFilters: (values: ProductsFiltersValues) => void;
  onSortChange: (sort: CatalogQuery["sort"]) => void;
}) {
  const [search, setSearch] = useState(query.q);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(search.trim());
  };
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-line p-4">
      <form onSubmit={handleSubmit} className="relative min-w-[12rem] max-w-[500px] flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" aria-hidden />
        <Input
          aria-label={PRODUCTS_LIST_COPY.searchLabel}
          placeholder={PRODUCTS_LIST_COPY.search}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-10 rounded-lg border-line bg-surface-container-lowest pr-3 pl-9 text-sm shadow-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary-subtle-border"
        />
      </form>
      <ProductsFiltersPopover query={query} categories={categories} brands={brands} sizes={sizes} onApply={onApplyFilters} />
      <ProductsSortMenu sort={query.sort} onSortChange={onSortChange} />
      <span className="ml-auto text-xs text-ink-subtle">
        {total} {PRODUCTS_LIST_COPY.productsCount}
      </span>
    </div>
  );
}
