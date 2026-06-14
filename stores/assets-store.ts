"use client";

import { create } from "zustand";
import type { AssetRow } from "@/db/schema";

type AssetsStatus = "idle" | "loading" | "ready" | "error";

type AssetsState = {
  rows: AssetRow[];
  status: AssetsStatus;
  loadedAt: number | null;
  ensureLoaded: () => Promise<void>;
  refresh: () => Promise<void>;
  prepend: (row: AssetRow) => void;
  update: (row: AssetRow) => void;
  remove: (id: string) => void;
};

let inflight: Promise<void> | null = null;

async function fetchAssets(): Promise<AssetRow[]> {
  const res = await fetch("/api/assets");
  if (!res.ok) throw new Error("Failed to fetch assets");
  const data: unknown = await res.json();
  if (!Array.isArray(data)) throw new Error("Invalid assets response");
  return data as AssetRow[];
}

export const useAssetsStore = create<AssetsState>((set, get) => ({
  rows: [],
  status: "idle",
  loadedAt: null,

  ensureLoaded: async () => {
    if (get().status === "ready") return;
    if (inflight) return inflight;

    set({ status: "loading" });

    inflight = fetchAssets()
      .then((rows) => {
        set({ rows, status: "ready", loadedAt: Date.now() });
      })
      .catch(() => {
        set({ status: "error" });
      })
      .finally(() => {
        inflight = null;
      });

    return inflight;
  },

  refresh: async () => {
    if (inflight) {
      await inflight;
      return;
    }

    set({ status: "loading" });

    inflight = fetchAssets()
      .then((rows) => {
        set({ rows, status: "ready", loadedAt: Date.now() });
      })
      .catch(() => {
        set({ status: "error" });
      })
      .finally(() => {
        inflight = null;
      });

    return inflight;
  },

  prepend: (row) =>
    set((state) => ({
      rows: [row, ...state.rows.filter((existing) => existing.id !== row.id)],
      status: "ready",
      loadedAt: state.loadedAt ?? Date.now(),
    })),

  update: (row) =>
    set((state) => ({
      rows: state.rows.map((existing) => (existing.id === row.id ? row : existing)),
    })),

  remove: (id) =>
    set((state) => ({
      rows: state.rows.filter((row) => row.id !== id),
    })),
}));
