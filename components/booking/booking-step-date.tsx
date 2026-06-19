"use client";

import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "react-day-picker/style.css";

export function BookingStepDate({ onSelect }: { onSelect: (date: string) => void }) {
  return (
    <div className="space-y-3">
      <h3 className="font-body text-body-md font-semibold">Elige una fecha</h3>
      <DayPicker
        mode="single"
        locale={es}
        disabled={{ before: new Date() }}
        onSelect={(date) => {
          if (!date) {
            return;
          }
          onSelect(format(date, "yyyy-MM-dd"));
        }}
      />
    </div>
  );
}
