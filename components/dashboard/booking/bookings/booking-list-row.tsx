"use client";

import { useTransition } from "react";
import { toast } from "react-toastify";
import type { Booking, BookingStatus, Employee } from "@/lib/domain/dtos";
import { Panel } from "@/components/ui/primitives";
import { BookingStatusBadge } from "@/components/dashboard/booking/bookings/booking-status-badge";
import { BookingActionsMenu } from "@/components/dashboard/booking/bookings/booking-actions-menu";
import {
  cancelBookingAction,
  completeBookingAction,
  confirmBookingAction,
} from "@/app/actions/bookings";
import { formatBookingDateTime } from "@/lib/booking/format-datetime";

export function BookingListRow({
  booking,
  timezone,
}: {
  booking: Booking & { employee: Employee | null };
  timezone: string;
}) {
  const [pending, startTransition] = useTransition();

  const formatted = formatBookingDateTime(booking.startsAt, timezone);

  const run = (action: () => Promise<{ success: true } | { error: string }>) => {
    startTransition(async () => {
      const result = await action();
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Reserva actualizada");
    });
  };

  return (
    <Panel className="flex flex-wrap items-center justify-between gap-3 p-4">
      <div className="min-w-0">
        <p className="font-body text-body-md font-medium text-on-surface">
          {booking.customerName} · {booking.serviceNameSnapshot}
        </p>
        <p className="font-body text-body-sm text-on-surface-variant">
          {formatted} · {booking.employee?.name ?? "—"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <BookingStatusBadge status={booking.status as BookingStatus} />
        <BookingActionsMenu
          booking={booking}
          disabled={pending}
          onConfirm={() => run(() => confirmBookingAction(booking.id))}
          onComplete={() => run(() => completeBookingAction(booking.id))}
          onCancel={() => run(() => cancelBookingAction(booking.id))}
        />
      </div>
    </Panel>
  );
}
