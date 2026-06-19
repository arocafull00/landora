"use client";

import { useEffect, useState } from "react";
import { BookingSlotButton } from "@/components/booking/booking-slot-button";

type Slot = { startsAt: string; endsAt: string; employeeId: string };

export function BookingStepTime({
  slug,
  serviceId,
  employeeId,
  date,
  onSelect,
}: {
  slug: string;
  serviceId: string;
  employeeId: string | "any";
  date: string;
  onSelect: (slot: Slot) => void;
}) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `/api/booking/availability?slug=${encodeURIComponent(slug)}&serviceId=${encodeURIComponent(serviceId)}&employeeId=${encodeURIComponent(employeeId)}&date=${encodeURIComponent(date)}`,
    )
      .then((res) => res.json())
      .then((json) => setSlots(json.data ?? []))
      .finally(() => setLoading(false));
  }, [slug, serviceId, employeeId, date]);

  if (loading) {
    return <p className="font-body text-body-sm">Cargando horarios...</p>;
  }

  if (slots.length === 0) {
    return <p className="font-body text-body-sm">No hay horarios disponibles.</p>;
  }

  return (
    <div className="space-y-3">
      <h3 className="font-body text-body-md font-semibold">Elige una hora</h3>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {slots.map((slot) => (
          <BookingSlotButton key={slot.startsAt} slot={slot} onSelect={() => onSelect(slot)} />
        ))}
      </div>
    </div>
  );
}
