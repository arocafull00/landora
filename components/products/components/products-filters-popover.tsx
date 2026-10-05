"use client";

import { Controller } from "react-hook-form";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { OptionsSelect } from "./options-select";
import { PRODUCTS_LIST_COPY } from "../products-list-copy";
import { useProductsFiltersForm, type ProductsFiltersValues } from "../hooks/use-products-filters-form";
import type { CatalogQuery } from "@/lib/schemas/products";

const AVAILABILITY = [
  { value: "all", label: PRODUCTS_LIST_COPY.availability.all },
  { value: "available", label: PRODUCTS_LIST_COPY.availability.available },
  { value: "out", label: PRODUCTS_LIST_COPY.availability.out },
  { value: "pending", label: PRODUCTS_LIST_COPY.availability.pending },
];

function ProductsFiltersPopoverForm({
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
  const { form, submit } = useProductsFiltersForm(query, onApply);
  return (
    <form onSubmit={submit} className="space-y-3">
      <Controller
        name="category"
        control={form.control}
        render={({ field }) => (
          <OptionsSelect
            label={PRODUCTS_LIST_COPY.filterLabels.category}
            value={field.value}
            onChange={field.onChange}
            options={[{ value: "", label: PRODUCTS_LIST_COPY.allCategories }, ...categories.map((value) => ({ value, label: value }))]}
          />
        )}
      />
      <Controller
        name="brand"
        control={form.control}
        render={({ field }) => (
          <OptionsSelect
            label={PRODUCTS_LIST_COPY.filterLabels.brand}
            value={field.value}
            onChange={field.onChange}
            options={[{ value: "", label: PRODUCTS_LIST_COPY.allBrands }, ...brands.map((value) => ({ value, label: value }))]}
          />
        )}
      />
      <Controller
        name="size"
        control={form.control}
        render={({ field }) => (
          <OptionsSelect
            label={PRODUCTS_LIST_COPY.filterLabels.size}
            value={field.value}
            onChange={field.onChange}
            options={[{ value: "", label: PRODUCTS_LIST_COPY.allSizes }, ...sizes.map((value) => ({ value, label: value }))]}
          />
        )}
      />
      <Controller
        name="availability"
        control={form.control}
        render={({ field }) => (
          <OptionsSelect label={PRODUCTS_LIST_COPY.filterLabels.availability} value={field.value} onChange={field.onChange} options={AVAILABILITY} />
        )}
      />
      <Button type="submit" className="w-full">
        {PRODUCTS_LIST_COPY.applyFilters}
      </Button>
    </form>
  );
}

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
  const filterKey = `${query.category}:${query.brand}:${query.size}:${query.availability}`;
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
