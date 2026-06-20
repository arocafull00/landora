"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { BookingSlotButton } from "@/components/booking/booking-slot-button";
import { BookingStepHeader } from "@/components/booking/booking-step-header";
import { BookingStepLoading } from "@/components/booking/booking-step-loading";
import { BookingEmptyState } from "@/components/booking/booking-empty-state";

type Slot = { startsAt: string; endsAt: string; employeeId: string };

export function BookingStepTime({
  slug,
  serviceId,
  employeeId,
  date,
  onSelect,
  onBack,
}: {
  slug: string;
  serviceId: string;
  employeeId: string | "any";
  date: string;
  onSelect: (slot: Slot) => void;
  onBack?: () => void;
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
    return (
      <div className="space-y-4">
        <BookingStepHeader title="Elige una hora" />
        <BookingStepLoading variant="grid" />
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="space-y-4">
        <BookingStepHeader title="Elige una hora" />
        <BookingEmptyState
          icon={Clock}
          message="No hay horarios disponibles para esta fecha."
          actionLabel={onBack ? "Elegir otra fecha" : undefined}
          onAction={onBack}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BookingStepHeader
        title="Elige una hora"
        description="Selecciona el horario que mejor te encaje."
      />
      <ToggleGroup
        type="single"
        className="grid w-full grid-cols-3 gap-2 sm:grid-cols-4"
        onValueChange={(value) => {
          if (!value) {
            return;
          }
          const slot = slots.find((item) => item.startsAt === value);
          if (!slot) {
            return;
          }
          onSelect(slot);
        }}
      >
        {slots.map((slot) => (
          <BookingSlotButton key={slot.startsAt} slot={slot} />
        ))}
      </ToggleGroup>
    </div>
  );
}
