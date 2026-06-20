"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "react-day-picker/style.css";
import { BookingStepHeader } from "@/components/booking/booking-step-header";
import { BookingStepLoading } from "@/components/booking/booking-step-loading";

export function BookingStepDate({ onSelect }: { onSelect: (date: string) => void }) {
  const [minDate, setMinDate] = useState<Date | null>(null);

  useEffect(() => {
    setMinDate(new Date());
  }, []);

  if (!minDate) {
    return (
      <div className="space-y-4">
        <BookingStepHeader title="Elige una fecha" />
        <BookingStepLoading variant="grid" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BookingStepHeader
        title="Elige una fecha"
        description="Solo se muestran fechas a partir de hoy."
      />
      <div className="booking-calendar mx-auto flex w-full max-w-sm justify-center">
        <DayPicker
          mode="single"
          locale={es}
          disabled={{ before: minDate }}
          onSelect={(date) => {
            if (!date) {
              return;
            }
            onSelect(format(date, "yyyy-MM-dd"));
          }}
        />
      </div>
    </div>
  );
}
