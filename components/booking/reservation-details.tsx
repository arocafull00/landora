"use client";

import { useTransition } from "react";
import { toast } from "react-toastify";
import type { Booking, BookingStatus } from "@/db/schema";
import { Panel } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { BookingStatusBadge } from "@/components/dashboard/booking/bookings/booking-status-badge";
import { cancelBookingByTokenAction } from "@/app/actions/cancel-by-token";
import { formatFullDateTime } from "@/lib/booking/format-datetime";

export function ReservationDetails({
  booking,
  timezone,
}: {
  booking: Booking & {
    employee: { name: string } | null;
    service: { name: string } | null;
  };
  timezone: string;
}) {
  const [pending, startTransition] = useTransition();

  const formatted = formatFullDateTime(booking.startsAt, timezone);

  const canCancel =
    booking.status !== "cancelled" &&
    booking.status !== "completed" &&
    booking.startsAt.getTime() > new Date().getTime();

  const cancel = () => {
    startTransition(async () => {
      const result = await cancelBookingByTokenAction(booking.publicToken);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Reserva cancelada");
      window.location.reload();
    });
  };

  return (
    <Panel className="w-full max-w-lg space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-headline-md font-semibold">Tu reserva</h1>
        <BookingStatusBadge status={booking.status as BookingStatus} />
      </div>
      <dl className="space-y-3 font-body text-body-sm">
        <div>
          <dt className="text-on-surface-variant">Servicio</dt>
          <dd>{booking.serviceNameSnapshot}</dd>
        </div>
        <div>
          <dt className="text-on-surface-variant">Profesional</dt>
          <dd>{booking.employee?.name ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-on-surface-variant">Fecha y hora</dt>
          <dd>{formatted}</dd>
        </div>
        <div>
          <dt className="text-on-surface-variant">Cliente</dt>
          <dd>{booking.customerName}</dd>
        </div>
        {booking.notes ? (
          <div>
            <dt className="text-on-surface-variant">Notas</dt>
            <dd>{booking.notes}</dd>
          </div>
        ) : null}
      </dl>
      {canCancel ? (
        <Button variant="destructive" disabled={pending} onClick={cancel}>
          Cancelar reserva
        </Button>
      ) : null}
    </Panel>
  );
}
