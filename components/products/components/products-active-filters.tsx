"use client";

import type { CatalogQuery } from "@/lib/schemas/products";
import { PRODUCTS_LIST_COPY } from "../products-list-copy";

type FilterKey = "q" | "category" | "brand" | "size" | "availability";

export function ProductsActiveFilters({
  query,
  onRemove,
  onClear,
}: {
  query: CatalogQuery;
  onRemove: (key: FilterKey) => void;
  onClear: () => void;
}) {
  const chips: { key: FilterKey; label: string }[] = [];
  if (query.q) chips.push({ key: "q", label: `${PRODUCTS_LIST_COPY.filterLabels.search}: ${query.q}` });
  if (query.category) chips.push({ key: "category", label: `${PRODUCTS_LIST_COPY.filterLabels.category}: ${query.category}` });
  if (query.brand) chips.push({ key: "brand", label: `${PRODUCTS_LIST_COPY.filterLabels.brand}: ${query.brand}` });
  if (query.size) chips.push({ key: "size", label: `${PRODUCTS_LIST_COPY.filterLabels.size}: ${query.size}` });
  if (query.availability !== "all") {
    chips.push({ key: "availability", label: `${PRODUCTS_LIST_COPY.filterLabels.availability}: ${PRODUCTS_LIST_COPY.availability[query.availability]}` });
  }
  if (!chips.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface-subtle px-4 py-3">
      <span className="text-xs text-ink-subtle">{PRODUCTS_LIST_COPY.activeFilters}</span>
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => onRemove(chip.key)}
          className="rounded-full border border-line bg-surface-container-lowest px-2.5 py-1 text-xs text-ink transition-colors hover:bg-surface-container-low"
        >
          {chip.label}
        </button>
      ))}
      <button type="button" onClick={onClear} className="text-xs font-medium text-primary hover:underline">
        {PRODUCTS_LIST_COPY.clearFilters}
      </button>
    </div>
  );
}
