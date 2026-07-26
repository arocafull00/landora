"use client";

import { useMemo, useState } from "react";
import type { ServiceMenuItem } from "@/lib/dashboard-data";

const ALL_CATEGORIES = "all";
const UNCATEGORIZED_LABEL = "Otros";

function normalizeSearchValue(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export type RistoranteMenuGroup = {
  category: string;
  items: ServiceMenuItem[];
};

export function useRistoranteMenu(items: ServiceMenuItem[]) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);
  const [search, setSearch] = useState("");

  const groups = useMemo(() => {
    const groupedItems = new Map<string, ServiceMenuItem[]>();

    for (const item of items) {
      const category = item.category.trim() || UNCATEGORIZED_LABEL;
      const categoryItems = groupedItems.get(category);
      if (categoryItems) {
        categoryItems.push(item);
        continue;
      }
      groupedItems.set(category, [item]);
    }

    return [...groupedItems.entries()].map(([category, categoryItems]) => ({
      category,
      items: categoryItems,
    }));
  }, [items]);

  const categories = useMemo(
    () => groups.map((group) => group.category),
    [groups],
  );
  const selectedCategory =
    activeCategory === ALL_CATEGORIES || categories.includes(activeCategory)
      ? activeCategory
      : ALL_CATEGORIES;
  const normalizedSearch = normalizeSearchValue(search);

  const visibleGroups = useMemo(
    () =>
      groups
        .filter(
          (group) =>
            selectedCategory === ALL_CATEGORIES ||
            group.category === selectedCategory,
        )
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => {
            if (!normalizedSearch) return true;
            return normalizeSearchValue(
              `${group.category} ${item.name} ${item.description}`,
            ).includes(normalizedSearch);
          }),
        }))
        .filter((group) => group.items.length > 0),
    [groups, normalizedSearch, selectedCategory],
  );

  return {
    activeCategory: selectedCategory,
    categories,
    hasResults: visibleGroups.length > 0,
    search,
    setActiveCategory,
    setSearch,
    visibleGroups,
  };
}
