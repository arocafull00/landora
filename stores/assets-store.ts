"use client";

import {
  createContext,
  createElement,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { createStore, useStore } from "zustand";
import type { AssetDto } from "@/lib/domain/dtos";

type AssetsState = {
  rows: AssetDto[];
  prepend: (row: AssetDto) => void;
  update: (row: AssetDto) => void;
  remove: (id: string) => void;
};

function createAssetsStore(initialRows: AssetDto[]) {
  return createStore<AssetsState>((set) => ({
    rows: initialRows,
    prepend: (row) =>
      set((state) => ({
        rows: [row, ...state.rows.filter((existing) => existing.id !== row.id)],
      })),
    update: (row) =>
      set((state) => ({
        rows: state.rows.map((existing) =>
          existing.id === row.id ? row : existing,
        ),
      })),
    remove: (id) =>
      set((state) => ({
        rows: state.rows.filter((row) => row.id !== id),
      })),
  }));
}

type AssetsStore = ReturnType<typeof createAssetsStore>;

const AssetsStoreContext = createContext<AssetsStore | null>(null);

export function AssetsStoreProvider({
  children,
  initialRows,
}: {
  children: ReactNode;
  initialRows: AssetDto[];
}) {
  const [store] = useState(() => createAssetsStore(initialRows));

  return createElement(
    AssetsStoreContext.Provider,
    { value: store },
    children,
  );
}

export function useAssetsStore<T>(selector: (state: AssetsState) => T): T {
  const store = useContext(AssetsStoreContext);
  if (!store) {
    throw new Error("useAssetsStore must be used within AssetsStoreProvider");
  }

  return useStore(store, selector);
}
