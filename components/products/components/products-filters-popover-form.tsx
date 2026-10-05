"use client";

import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { CatalogQuery, ProductsFiltersValues } from "@/lib/schemas/products";
import { useProductsFiltersForm } from "../hooks/use-products-filters-form";
import { PRODUCTS_LIST_COPY } from "../products-list-copy";
import { OptionsSelect } from "./options-select";

const STATUS = [
  { value: "all", label: PRODUCTS_LIST_COPY.statusFilters.all },
  { value: "published", label: PRODUCTS_LIST_COPY.statusFilters.published },
  { value: "draft", label: PRODUCTS_LIST_COPY.statusFilters.draft },
  { value: "archived", label: PRODUCTS_LIST_COPY.statusFilters.archived },
];
const AVAILABILITY = [
  { value: "all", label: PRODUCTS_LIST_COPY.availability.all },
  { value: "available", label: PRODUCTS_LIST_COPY.availability.available },
  { value: "out", label: PRODUCTS_LIST_COPY.availability.out },
  { value: "pending", label: PRODUCTS_LIST_COPY.availability.pending },
];

export function ProductsFiltersPopoverForm({ query, categories, brands, sizes, onApply }: {
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
        name="status"
        control={form.control}
        render={({ field }) => (
          <OptionsSelect label={PRODUCTS_LIST_COPY.filterLabels.status} value={field.value} onChange={field.onChange} options={STATUS} />
        )}
      />
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
      <Button type="submit" className="w-full">{PRODUCTS_LIST_COPY.applyFilters}</Button>
    </form>
  );
}
