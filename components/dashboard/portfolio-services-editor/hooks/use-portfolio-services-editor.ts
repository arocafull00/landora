"use client";

import { useState } from "react";
import { createEmptyServiceMenuItem } from "@/components/dashboard/create-empty-service-menu-item";
import type { Landing, ServiceMenuItem } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";

const EMPTY_SERVICE_MENU: ServiceMenuItem[] = [];

export function usePortfolioServicesEditor(landing: Landing) {
  const updateSection = useDashboardStore((state) => state.updateSection);
  const updateSectionItem = useDashboardStore((state) => state.updateSectionItem);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const items = landing.content.serviceMenu ?? EMPTY_SERVICE_MENU;

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

  const moveItem = (itemId: string, direction: "up" | "down") => {
    const index = items.findIndex((item) => item.id === itemId);
    if (index === -1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const next = [...items];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    updateSection(landing.id, "serviceMenu", next);
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
