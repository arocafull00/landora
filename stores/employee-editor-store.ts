"use client";

import { create } from "zustand";
import type { BookingService, Employee, EmployeeHours } from "@/db/schema";
import {
  buildHourDrafts,
  isUniformSchedule,
  type HourDraft,
} from "@/lib/employee-schedule";

type EmployeeEditorState = {
  open: boolean;
  employee: Employee | null;
  services: BookingService[];
  name: string;
  hourDrafts: HourDraft[];
  serviceIds: string[];
  customizeDays: boolean;
  copiedHours: HourDraft[] | null;
  copiedFromName: string | null;

  setServices: (services: BookingService[]) => void;
  openEdit: (
    employee: Employee,
    hours: EmployeeHours[],
    assignedServiceIds: string[],
  ) => void;
  closeEdit: () => void;
  setName: (name: string) => void;
  setCustomizeDays: (customizeDays: boolean) => void;
  updateHourDraft: (dayOfWeek: number, draft: HourDraft) => void;
  toggleWorkingDay: (dayOfWeek: number, isWorking: boolean) => void;
  setUniformTimes: (startTime: string, endTime: string) => void;
  toggleServiceId: (serviceId: string, checked: boolean) => void;
  copyScheduleFrom: (hours: HourDraft[], fromName: string) => void;
  applyCopiedSchedule: () => void;
};

export const useEmployeeEditorStore = create<EmployeeEditorState>((set) => ({
  open: false,
  employee: null,
  services: [],
  name: "",
  hourDrafts: [],
  serviceIds: [],
  customizeDays: false,
  copiedHours: null,
  copiedFromName: null,

  setServices: (services) => set({ services }),
  openEdit: (employee, hours, assignedServiceIds) => {
    const hourDrafts = buildHourDrafts(hours);
    set({
      open: true,
      employee,
      name: employee.name,
      hourDrafts,
      serviceIds: assignedServiceIds,
      customizeDays: !isUniformSchedule(hourDrafts),
    });
  },
  closeEdit: () =>
    set({
      open: false,
      employee: null,
    }),
  setName: (name) => set({ name }),
  setCustomizeDays: (customizeDays) => set({ customizeDays }),
  updateHourDraft: (dayOfWeek, draft) =>
    set((state) => ({
      hourDrafts: state.hourDrafts.map((h) => (h.dayOfWeek === dayOfWeek ? draft : h)),
    })),
  toggleWorkingDay: (dayOfWeek, isWorking) =>
    set((state) => ({
      hourDrafts: state.hourDrafts.map((h) =>
        h.dayOfWeek === dayOfWeek ? { ...h, isWorking } : h,
      ),
    })),
  setUniformTimes: (startTime, endTime) =>
    set((state) => ({
      hourDrafts: state.hourDrafts.map((h) =>
        h.isWorking ? { ...h, startTime, endTime } : h,
      ),
    })),
  toggleServiceId: (serviceId, checked) =>
    set((state) => ({
      serviceIds: checked
        ? [...state.serviceIds, serviceId]
        : state.serviceIds.filter((id) => id !== serviceId),
    })),
  copyScheduleFrom: (hours, fromName) =>
    set({
      copiedHours: hours.map((h) => ({ ...h })),
      copiedFromName: fromName,
    }),
  applyCopiedSchedule: () =>
    set((state) => {
      if (!state.copiedHours) {
        return state;
      }
      return {
        hourDrafts: state.copiedHours.map((h) => ({ ...h })),
        customizeDays: !isUniformSchedule(state.copiedHours),
      };
    }),
}));
