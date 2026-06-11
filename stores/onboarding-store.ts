"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnboardingState = {
  tutorialSeen: boolean;
  markTutorialSeen: () => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      tutorialSeen: false,
      markTutorialSeen: () => set({ tutorialSeen: true }),
    }),
    { name: "landora-onboarding" },
  ),
);
