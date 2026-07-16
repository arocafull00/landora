"use client";

import { create } from "zustand";
import type { BookingService } from "@/lib/domain/dtos";
import { priceCentsToEurosInput } from "@/lib/service-price";

type BookingServicesState = {
  services: BookingService[];
  setServices: (services: BookingService[]) => void;
  updateService: (service: BookingService) => void;
  removeService: (id: string) => void;
  reorderServices: (services: BookingService[]) => void;
  setServiceActive: (id: string, isActive: boolean) => void;

  editOpen: boolean;
  editingService: BookingService | null;
  editName: string;
  editDurationMinutes: string;
  editPriceEuros: string;
  editBufferAfterMinutes: string;
  editIsActive: boolean;
  openEdit: (service: BookingService) => void;
  closeEdit: () => void;
  setEditName: (name: string) => void;
  setEditDurationMinutes: (value: string) => void;
  setEditPriceEuros: (value: string) => void;
  setEditBufferAfterMinutes: (value: string) => void;
  setEditIsActive: (isActive: boolean) => void;
};

export const useBookingServicesStore = create<BookingServicesState>((set) => ({
  services: [],
  setServices: (services) => set({ services }),
  updateService: (service) =>
    set((state) => ({
      services: state.services.map((s) => (s.id === service.id ? service : s)),
    })),
  removeService: (id) =>
    set((state) => ({
      services: state.services.filter((s) => s.id !== id),
    })),
  reorderServices: (services) => set({ services }),
  setServiceActive: (id, isActive) =>
    set((state) => ({
      services: state.services.map((s) => (s.id === id ? { ...s, isActive } : s)),
    })),

  editOpen: false,
  editingService: null,
  editName: "",
  editDurationMinutes: "",
  editPriceEuros: "",
  editBufferAfterMinutes: "",
  editIsActive: true,
  openEdit: (service) =>
    set({
      editOpen: true,
      editingService: service,
      editName: service.name,
      editDurationMinutes: String(service.durationMinutes),
      editPriceEuros: priceCentsToEurosInput(service.priceCents),
      editBufferAfterMinutes: String(service.bufferAfterMinutes),
      editIsActive: service.isActive,
    }),
  closeEdit: () =>
    set({
      editOpen: false,
      editingService: null,
    }),
  setEditName: (editName) => set({ editName }),
  setEditDurationMinutes: (editDurationMinutes) => set({ editDurationMinutes }),
  setEditPriceEuros: (editPriceEuros) => set({ editPriceEuros }),
  setEditBufferAfterMinutes: (editBufferAfterMinutes) => set({ editBufferAfterMinutes }),
  setEditIsActive: (editIsActive) => set({ editIsActive }),
}));
