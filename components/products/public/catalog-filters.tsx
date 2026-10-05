"use client";

import type { CatalogQuery } from "@/lib/schemas/products";
import type { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { useCatalogFilters } from "../hooks/use-catalog-filters";
import { PublicCatalogFilterForm } from "./catalog-filter-form";
import { OptionsSelect } from "../components/options-select";

const COPY = { sort: "Ordenar productos" } as const;
const SORT = [{ value: "newest", label: "Más recientes" }, { value: "price-asc", label: "Precio menor" }, { value: "price-desc", label: "Precio mayor" }];

export function PublicCatalogFilters({ query, categories, brands, sizes, heading }: { query: CatalogQuery; categories: string[]; brands: string[]; sizes: string[]; heading: ReactNode }) {
  const { form, submit, reset, changeAvailability, changeSort } = useCatalogFilters(query);
  return (
    <form onSubmit={submit} className="space-y-8">
      <PublicCatalogFilterForm form={form} categories={categories} brands={brands} sizes={sizes} reset={reset} changeAvailability={changeAvailability} showNewest={() => changeSort("newest")} />
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end sm:gap-8">
        {heading}
        <div className="w-full shrink-0 sm:w-48">
          <Controller name="sort" control={form.control} render={({ field }) => <OptionsSelect label={COPY.sort} value={field.value ?? "newest"} onChange={(value) => changeSort(value as CatalogQuery["sort"])} options={SORT} className="data-[size=default]:h-11 rounded-full border-border bg-catalog-canvas px-4 text-ink shadow-none" />} />
        </div>
      </header>
    </form>
  );
}
