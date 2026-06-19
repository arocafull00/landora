"use client";

import { create } from "zustand";

export type BookingSelection = {
  serviceId: string;
  serviceName: string;
  employeeId: string | "any";
  employeeName: string;
  date: string;
  startsAt: string;
  endsAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
};

const STEPS = ["service", "professional", "date", "time", "contact", "confirmation"] as const;
export type BookingStep = (typeof STEPS)[number];

type PublicBookingState = {
  step: BookingStep;
  stepIndex: number;
  selection: Partial<BookingSelection>;
  publicToken: string | null;
  setStep: (step: BookingStep) => void;
  goBack: () => void;
  setSelection: (patch: Partial<BookingSelection>) => void;
  setPublicToken: (token: string) => void;
  reset: () => void;
};

const initialState = {
  step: "service" as BookingStep,
  stepIndex: 0,
  selection: {} as Partial<BookingSelection>,
  publicToken: null,
};

export const usePublicBookingStore = create<PublicBookingState>((set) => ({
  ...initialState,
  setStep: (step) => set({ step, stepIndex: STEPS.indexOf(step) }),
  goBack: () =>
    set((state) => {
      const prev = Math.max(state.stepIndex - 1, 0);
      return { step: STEPS[prev], stepIndex: prev };
    }),
  setSelection: (patch) =>
    set((state) => ({ selection: { ...state.selection, ...patch } })),
  setPublicToken: (publicToken) => set({ publicToken }),
  reset: () => set(initialState),
}));
