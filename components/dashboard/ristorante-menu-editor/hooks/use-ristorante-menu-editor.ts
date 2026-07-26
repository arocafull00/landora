"use client";

import { useMemo, useState } from "react";
import { createEmptyServiceMenuItem } from "@/components/dashboard/create-empty-service-menu-item";
import type { Landing, ServiceMenuItem } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";

const ALL_CATEGORIES = "all";
const EMPTY_MENU_ITEMS: ServiceMenuItem[] = [];
const UNCATEGORIZED_CATEGORY = "uncategorized";
const UNCATEGORIZED_LABEL = "Sin categoría";

function normalizeSearchValue(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getCategoryValue(category: string) {
  const trimmedCategory = category.trim();
  return trimmedCategory
    ? `category:${trimmedCategory}`
    : UNCATEGORIZED_CATEGORY;
}

export function useRistoranteMenuEditor(landing: Landing) {
  const updateSection = useDashboardStore((state) => state.updateSection);
  const updateSectionItem = useDashboardStore(
    (state) => state.updateSectionItem,
  );
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const items = landing.content.serviceMenu ?? EMPTY_MENU_ITEMS;

  const categoryOptions = useMemo(() => {
    const categories = new Map<string, string>();

    for (const item of items) {
      const category = item.category.trim();
      const value = getCategoryValue(category);
      categories.set(value, category || UNCATEGORIZED_LABEL);
    }

    return [
      { label: "Todas las categorías", value: ALL_CATEGORIES },
      ...Array.from(categories, ([value, label]) => ({ label, value })),
    ];
  }, [items]);

  const resolvedCategory = categoryOptions.some(
    (category) => category.value === activeCategory,
  )
    ? activeCategory
    : ALL_CATEGORIES;
  const normalizedSearch = normalizeSearchValue(search);

  const visibleItems = useMemo(
    () =>
      items.filter((item) => {
        const matchesCategory =
          resolvedCategory === ALL_CATEGORIES ||
          getCategoryValue(item.category) === resolvedCategory;

        if (!matchesCategory) return false;
        if (!normalizedSearch) return true;

        return normalizeSearchValue(
          `${item.category} ${item.name} ${item.description} ${item.price}`,
        ).includes(normalizedSearch);
      }),
    [items, normalizedSearch, resolvedCategory],
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setExpandedItemId(null);
  };

  const clearFilters = () => {
    setSearch("");
    setActiveCategory(ALL_CATEGORIES);
  };

  const toggleItem = (itemId: string) => {
    setExpandedItemId((currentItemId) =>
      currentItemId === itemId ? null : itemId,
    );
  };

  const updateItem = (itemId: string, patch: Partial<ServiceMenuItem>) => {
    updateSectionItem(landing.id, "serviceMenu", itemId, patch);
  };

  const addItem = () => {
    const item = createEmptyServiceMenuItem();
    updateSection(landing.id, "serviceMenu", [...items, item]);
    setSearch("");
    setActiveCategory(ALL_CATEGORIES);
    setExpandedItemId(item.id);
  };

  const removeItem = (itemId: string) => {
    updateSection(
      landing.id,
      "serviceMenu",
      items.filter((item) => item.id !== itemId),
    );
    setExpandedItemId((currentItemId) =>
      currentItemId === itemId ? null : currentItemId,
    );
  };

  return {
    activeCategory: resolvedCategory,
    addItem,
    categoryOptions,
    clearFilters,
    expandedItemId,
    handleCategoryChange,
    hasActiveFilters:
      Boolean(search.trim()) || resolvedCategory !== ALL_CATEGORIES,
    removeItem,
    search,
    setSearch,
    toggleItem,
    totalItems: items.length,
    updateItem,
    visibleItems,
  };
}
