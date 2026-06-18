"use client";

import { create } from "zustand";
import { toast } from "react-toastify";
import type { LandingAnalytics } from "@/data/analytics";
import {
  formatDateInput,
  getPresetRange,
  type DateRangePreset,
} from "@/lib/analytics-date-range";

type AnalyticsState = {
  preset: DateRangePreset;
  from: string;
  to: string;
  data: LandingAnalytics | null;
  loading: boolean;
  loadAnalytics: (from: string, to: string) => Promise<void>;
  ensureLoaded: () => Promise<void>;
  setPreset: (preset: DateRangePreset) => void;
  setRange: (from: string, to: string) => void;
};

async function fetchAnalytics(from: string, to: string): Promise<LandingAnalytics> {
  const params = new URLSearchParams({ from, to });
  const response = await fetch(`/api/analytics?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to load analytics");
  }

  return response.json();
}

const initialRange = getPresetRange("30d");

export const useAnalyticsStore = create<AnalyticsState>()((set, get) => ({
  preset: "30d",
  from: formatDateInput(initialRange.from),
  to: formatDateInput(initialRange.to),
  data: null,
  loading: true,

  loadAnalytics: async (fromValue, toValue) => {
    set({ loading: true });

    try {
      const analytics = await fetchAnalytics(fromValue, toValue);
      set({ data: analytics });
    } catch {
      set({ data: null });
      toast.error("No se pudieron cargar las analíticas");
    } finally {
      set({ loading: false });
    }
  },

  ensureLoaded: async () => {
    const { data, from, to } = get();
    if (data !== null) return;

    await get().loadAnalytics(from, to);
  },

  setPreset: (nextPreset) => {
    if (nextPreset === "custom") {
      set({ preset: nextPreset });
      return;
    }

    const range = getPresetRange(nextPreset);
    const from = formatDateInput(range.from);
    const to = formatDateInput(range.to);

    set({
      preset: nextPreset,
      from,
      to,
    });

    void get().loadAnalytics(from, to);
  },

  setRange: (nextFrom, nextTo) => {
    set({
      preset: "custom",
      from: nextFrom,
      to: nextTo,
    });

    void get().loadAnalytics(nextFrom, nextTo);
  },
}));
