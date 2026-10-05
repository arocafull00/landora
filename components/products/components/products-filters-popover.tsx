"use client";

import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { PRODUCTS_LIST_COPY } from "../products-list-copy";
import type { CatalogQuery, ProductsFiltersValues } from "@/lib/schemas/products";
import { ProductsFiltersPopoverForm } from "./products-filters-popover-form";

export function ProductsFiltersPopover({
  query,
  categories,
  brands,
  sizes,
  onApply,
}: {
  query: CatalogQuery;
  categories: string[];
  brands: string[];
  sizes: string[];
  onApply: (values: ProductsFiltersValues) => void;
}) {
  const filterKey = `${query.status}:${query.category}:${query.brand}:${query.size}:${query.availability}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" className="h-10 gap-2 rounded-lg border-line bg-surface-container-lowest px-3 text-ink hover:bg-surface-subtle">
          <ListFilter className="size-4" aria-hidden />
          {PRODUCTS_LIST_COPY.filters}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80 space-y-4 bg-surface">
        <PopoverHeader>
          <PopoverTitle>{PRODUCTS_LIST_COPY.filtersTitle}</PopoverTitle>
        </PopoverHeader>
        <ProductsFiltersPopoverForm key={filterKey} query={query} categories={categories} brands={brands} sizes={sizes} onApply={onApply} />
      </PopoverContent>
    </Popover>
  );
}
