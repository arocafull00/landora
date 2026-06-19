"use client";

import { create } from "zustand";
import type { BookingService, Employee, EmployeeHours } from "@/db/schema";

export type HourDraft = {
  dayOfWeek: number;
  isWorking: boolean;
  startTime: string;
  endTime: string;
};

function buildDefaultHours(existing: EmployeeHours[]): HourDraft[] {
  return Array.from({ length: 7 }, (_, dayOfWeek) => {
    const row = existing.find((h) => h.dayOfWeek === dayOfWeek);
    if (!row) {
      return {
        dayOfWeek,
        isWorking: dayOfWeek >= 1 && dayOfWeek <= 5,
        startTime: "09:00",
        endTime: "18:00",
      };
    }
    return {
      dayOfWeek: row.dayOfWeek,
      isWorking: row.isWorking,
      startTime: row.startTime,
      endTime: row.endTime,
    };
  });
}

type EmployeeSheetState = {
  open: boolean;
  employee: Employee | null;
  services: BookingService[];
  dayLabels: string[];
  name: string;
  hourDrafts: HourDraft[];
  serviceIds: string[];

  setServices: (services: BookingService[]) => void;
  setDayLabels: (dayLabels: string[]) => void;
  openSheet: (
    employee: Employee,
    hours: EmployeeHours[],
    assignedServiceIds: string[],
  ) => void;
  closeSheet: () => void;
  setName: (name: string) => void;
  updateHourDraft: (dayOfWeek: number, draft: HourDraft) => void;
  toggleServiceId: (serviceId: string, checked: boolean) => void;
};

export const useEmployeeSheetStore = create<EmployeeSheetState>((set) => ({
  open: false,
  employee: null,
  services: [],
  dayLabels: [],
  name: "",
  hourDrafts: [],
  serviceIds: [],

  setServices: (services) => set({ services }),
  setDayLabels: (dayLabels) => set({ dayLabels }),
  openSheet: (employee, hours, assignedServiceIds) =>
    set({
      open: true,
      employee,
      name: employee.name,
      hourDrafts: buildDefaultHours(hours),
      serviceIds: assignedServiceIds,
    }),
  closeSheet: () =>
    set({
      open: false,
      employee: null,
    }),
  setName: (name) => set({ name }),
  updateHourDraft: (dayOfWeek, draft) =>
    set((state) => ({
      hourDrafts: state.hourDrafts.map((h) => (h.dayOfWeek === dayOfWeek ? draft : h)),
    })),
  toggleServiceId: (serviceId, checked) =>
    set((state) => ({
      serviceIds: checked
        ? [...state.serviceIds, serviceId]
        : state.serviceIds.filter((id) => id !== serviceId),
    })),
}));
