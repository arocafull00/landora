"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ConsentStatus = "accepted" | "rejected" | null;

type ConsentState = {
  status: ConsentStatus;
  accept: () => void;
  reject: () => void;
};

export const useConsentStore = create<ConsentState>()(
  persist(
    (set) => ({
      status: null,
      accept: () => set({ status: "accepted" }),
      reject: () => set({ status: "rejected" }),
    }),
    { name: "cookie-consent" },
  ),
);
