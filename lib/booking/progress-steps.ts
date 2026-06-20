import type { BookingStep } from "@/stores/public-booking-store";

export const PROGRESS_STEPS: { id: BookingStep; label: string }[] = [
  { id: "service", label: "Servicio" },
  { id: "professional", label: "Profesional" },
  { id: "date", label: "Fecha" },
  { id: "time", label: "Hora" },
  { id: "contact", label: "Datos" },
];

export function getBookingProgressLabel(step: BookingStep) {
  const match = PROGRESS_STEPS.find((item) => item.id === step);
  if (match) {
    return match.label;
  }
  return "Confirmación";
}
