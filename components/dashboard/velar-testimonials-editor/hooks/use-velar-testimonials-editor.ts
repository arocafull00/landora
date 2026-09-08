"use client";

import { useState } from "react";
import { createEmptyTestimonialItem } from "@/components/dashboard/create-empty-testimonial-item";
import type { Landing, TestimonialContent } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";

export function useVelarTestimonialsEditor(landing: Landing) {
  const updateSection = useDashboardStore((state) => state.updateSection);
  const updateTestimonial = useDashboardStore((state) => state.updateTestimonial);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const items = landing.content.testimonials;

  const toggleItem = (itemId: string) => {
    setExpandedItemId((currentItemId) =>
      currentItemId === itemId ? null : itemId,
    );
  };

  const updateItem = (itemId: string, patch: Partial<TestimonialContent>) => {
    updateTestimonial(landing.id, itemId, patch);
  };

  const addItem = () => {
    const item = createEmptyTestimonialItem();
    updateSection(landing.id, "testimonials", [...items, item]);
    setExpandedItemId(item.id);
  };

  const removeItem = (itemId: string) => {
    updateSection(
      landing.id,
      "testimonials",
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
    updateSection(landing.id, "testimonials", next);
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
