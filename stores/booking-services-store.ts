"use client";

import { create } from "zustand";
import type { BookingService } from "@/db/schema";

type BookingServicesState = {
  services: BookingService[];
  setServices: (services: BookingService[]) => void;
  updateService: (service: BookingService) => void;
  reorderServices: (services: BookingService[]) => void;
  setServiceActive: (id: string, isActive: boolean) => void;

  editOpen: boolean;
  editingServiceId: string | null;
  editName: string;
  editDurationMinutes: string;
  editBufferAfterMinutes: string;
  openEdit: (service: BookingService) => void;
  closeEdit: () => void;
  setEditName: (name: string) => void;
  setEditDurationMinutes: (value: string) => void;
  setEditBufferAfterMinutes: (value: string) => void;
};

export const useBookingServicesStore = create<BookingServicesState>((set) => ({
  services: [],
  setServices: (services) => set({ services }),
  updateService: (service) =>
    set((state) => ({
      services: state.services.map((s) => (s.id === service.id ? service : s)),
    })),
  reorderServices: (services) => set({ services }),
  setServiceActive: (id, isActive) =>
    set((state) => ({
      services: state.services.map((s) => (s.id === id ? { ...s, isActive } : s)),
    })),

  editOpen: false,
  editingServiceId: null,
  editName: "",
  editDurationMinutes: "",
  editBufferAfterMinutes: "",
  openEdit: (service) =>
    set({
      editOpen: true,
      editingServiceId: service.id,
      editName: service.name,
      editDurationMinutes: String(service.durationMinutes),
      editBufferAfterMinutes: String(service.bufferAfterMinutes),
    }),
  closeEdit: () =>
    set({
      editOpen: false,
      editingServiceId: null,
    }),
  setEditName: (editName) => set({ editName }),
  setEditDurationMinutes: (editDurationMinutes) => set({ editDurationMinutes }),
  setEditBufferAfterMinutes: (editBufferAfterMinutes) => set({ editBufferAfterMinutes }),
}));
