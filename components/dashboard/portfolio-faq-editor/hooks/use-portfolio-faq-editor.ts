"use client";

import { useState } from "react";
import { createEmptyFaqItem } from "@/components/dashboard/create-empty-faq-item";
import type { FaqItem, Landing } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";

const EMPTY_FAQ: FaqItem[] = [];

export function usePortfolioFaqEditor(landing: Landing) {
  const updateSection = useDashboardStore((state) => state.updateSection);
  const updateSectionItem = useDashboardStore((state) => state.updateSectionItem);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const items = landing.content.faq ?? EMPTY_FAQ;

  const toggleItem = (itemId: string) => {
    setExpandedItemId((currentItemId) =>
      currentItemId === itemId ? null : itemId,
    );
  };

  const updateItem = (itemId: string, patch: Partial<FaqItem>) => {
    updateSectionItem(landing.id, "faq", itemId, patch);
  };

  const addItem = () => {
    const item = createEmptyFaqItem();
    updateSection(landing.id, "faq", [...items, item]);
    setExpandedItemId(item.id);
  };

  const removeItem = (itemId: string) => {
    updateSection(
      landing.id,
      "faq",
      items.filter((item) => item.id !== itemId),
    );
    setExpandedItemId((currentItemId) =>
      currentItemId === itemId ? null : currentItemId,
    );
  };

  const moveItem = (itemId: string, direction: "up" | "down") => {
    const index = items.findIndex((item) => item.id === itemId);
    if (index === -1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const next = [...items];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    updateSection(landing.id, "faq", next);
  };

  return {
    addItem,
    expandedItemId,
    items,
    moveItem,
    removeItem,
    toggleItem,
    updateItem,
  };
}
