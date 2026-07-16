import type { BookingStatus } from "@/lib/domain/dtos";

const STYLES: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-900",
  confirmed: "bg-emerald-100 text-emerald-900",
  completed: "bg-slate-100 text-slate-900",
  cancelled: "bg-rose-100 text-rose-900",
};

const LABELS: Record<BookingStatus, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  completed: "Completada",
  cancelled: "Cancelada",
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 font-body text-body-xs font-medium ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
