"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RistoranteMenuEditorToolbar({
  activeCategory,
  categories,
  hasActiveFilters,
  onCategoryChange,
  onClearFilters,
  onSearchChange,
  resultCount,
  search,
  totalItems,
}: {
  activeCategory: string;
  categories: { label: string; value: string }[];
  hasActiveFilters: boolean;
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
  onSearchChange: (search: string) => void;
  resultCount: number;
  search: string;
  totalItems: number;
}) {
  return (
    <div className="sticky top-0 z-20 -mx-unit-lg space-y-3 border-y border-outline-variant bg-surface-container-low/95 px-unit-lg py-unit-md backdrop-blur-md">
      <label
        className="relative block"
        htmlFor="ristorante-menu-editor-search"
      >
        <span className="sr-only">Buscar platos</span>
        <Search
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-on-surface-variant"
        />
        <Input
          className="border-outline-variant bg-surface pl-9 text-on-surface placeholder:text-on-surface-variant focus-visible:border-primary focus-visible:ring-primary/20"
          id="ristorante-menu-editor-search"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por nombre, categoría o precio"
          type="search"
          value={search}
        />
      </label>

      <Select onValueChange={onCategoryChange} value={activeCategory}>
        <SelectTrigger
          aria-label="Filtrar platos por categoría"
          className="w-full border-outline-variant bg-surface text-on-surface focus-visible:border-primary focus-visible:ring-primary/20"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="start">
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex min-h-6 items-center justify-between gap-3">
        <p
          aria-live="polite"
          className="font-label text-label-sm text-on-surface-variant"
        >
          {resultCount === totalItems
            ? `${totalItems} ${totalItems === 1 ? "plato" : "platos"}`
            : `${resultCount} de ${totalItems} platos`}
        </p>
        {hasActiveFilters ? (
          <Button
            className="h-6 px-2 text-label-sm"
            onClick={onClearFilters}
            size="xs"
            type="button"
            variant="ghost"
          >
            <X aria-hidden />
            Limpiar filtros
          </Button>
        ) : null}
      </div>
    </div>
  );
}
