"use client";

import { useMemo, useState } from "react";
import { createEmptyGalleryItem } from "@/components/dashboard/create-empty-gallery-item";
import type { GalleryItem, Landing } from "@/lib/dashboard-data";
import { useAssetsStore } from "@/stores/assets-store";
import { useDashboardStore } from "@/stores/dashboard-store";

const EMPTY_GALLERY: GalleryItem[] = [];

export function usePortfolioProjectsEditor(landing: Landing) {
  const updateSection = useDashboardStore((state) => state.updateSection);
  const updateSectionItem = useDashboardStore((state) => state.updateSectionItem);
  const setActivePageTarget = useDashboardStore((state) => state.setActivePageTarget);
  const assetRows = useAssetsStore((state) => state.rows);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const items = landing.content.gallery ?? EMPTY_GALLERY;

  const assetNameByUrl = useMemo(
    () => new Map(assetRows.map((asset) => [asset.url, asset.name])),
    [assetRows],
  );

  const toggleItem = (itemId: string) => {
    setExpandedItemId((currentItemId) =>
      currentItemId === itemId ? null : itemId,
    );
  };

  const updateItem = (itemId: string, patch: Partial<GalleryItem>) => {
    updateSectionItem(landing.id, "gallery", itemId, patch);
  };

  const addItem = () => {
    const item = createEmptyGalleryItem();
    updateSection(landing.id, "gallery", [...items, item]);
    setExpandedItemId(item.id);
  };

  const removeItem = (itemId: string) => {
    updateSection(
      landing.id,
      "gallery",
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
    updateSection(landing.id, "gallery", next);
  };

  const editProjectPage = (itemId: string) => {
    setActivePageTarget({
      type: "project",
      projectId: itemId,
    });
  };

  const getAssetName = (imageUrl?: string) => {
    if (!imageUrl) return "";
    return assetNameByUrl.get(imageUrl) ?? "";
  };

  return {
    addItem,
    editProjectPage,
    expandedItemId,
    getAssetName,
    items,
    moveItem,
    removeItem,
    toggleItem,
    updateItem,
  };
}
