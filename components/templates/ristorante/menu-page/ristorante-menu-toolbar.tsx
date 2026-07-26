"use client";

import { Search } from "lucide-react";

export function RistoranteMenuToolbar({
  activeCategory,
  categories,
  onCategoryChange,
  onSearchChange,
  search,
}: {
  activeCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
  search: string;
}) {
  const categoryOptions = [
    { label: "Toda la carta", value: "all" },
    ...categories.map((category) => ({ label: category, value: category })),
  ];

  return (
    <div
      aria-label="Filtros de la carta"
      className="sticky top-2 z-30 grid gap-2 rounded-[1.25rem] border border-[var(--site-border)] bg-[var(--ristorante-surface)]/90 p-3 shadow-lg backdrop-blur-xl md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
    >
      <div
        aria-label="Categorías"
        className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categoryOptions.map((category) => {
          const active = category.value === activeCategory;
          return (
            <button
              aria-pressed={active}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)] ${
                active
                  ? "bg-[var(--ristorante-secondary)] text-[var(--ristorante-foreground)]"
                  : "text-[var(--site-text-muted)] hover:bg-[var(--ristorante-muted)] hover:text-[var(--site-text)]"
              }`}
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              style={{ fontFamily: "var(--font-ristorante-body)" }}
              type="button"
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <label className="relative block md:w-64">
        <span className="sr-only">Buscar un plato</span>
        <Search
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--site-text-muted)]"
        />
        <input
          className="w-full rounded-full border border-[var(--site-border)] bg-[var(--ristorante-surface)] py-2.5 pl-11 pr-4 text-sm text-[var(--site-text)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--site-text-muted)] focus:border-[var(--ristorante-primary)] focus:ring-4 focus:ring-[var(--ristorante-primary)]/10"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar un plato…"
          type="search"
          value={search}
        />
      </label>
    </div>
  );
}
