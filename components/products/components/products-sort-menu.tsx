"use client";

import { ArrowUpDown } from "lucide-react";
import type { CatalogQuery } from "@/lib/schemas/products";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PRODUCTS_LIST_COPY } from "../products-list-copy";

const SORT_OPTIONS = [
  { value: "newest", label: PRODUCTS_LIST_COPY.sortOptions.newest },
  { value: "price-asc", label: PRODUCTS_LIST_COPY.sortOptions.priceAsc },
  { value: "price-desc", label: PRODUCTS_LIST_COPY.sortOptions.priceDesc },
] as const;

export function ProductsSortMenu({
  sort,
  onSortChange,
}: {
  sort: CatalogQuery["sort"];
  onSortChange: (sort: CatalogQuery["sort"]) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" className="h-10 gap-2 rounded-lg border-line bg-surface-container-lowest px-3 text-ink hover:bg-surface-subtle">
          <ArrowUpDown className="size-4" aria-hidden />
          {PRODUCTS_LIST_COPY.sort}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={sort} onValueChange={(value) => onSortChange(value as CatalogQuery["sort"])}>
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
