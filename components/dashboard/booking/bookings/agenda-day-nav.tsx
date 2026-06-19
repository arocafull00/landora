"use client";

import { addDays, format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";

export function AgendaDayNav({
  date,
  onNavigate,
}: {
  date: string;
  onNavigate: (date: string) => void;
}) {
  const current = parseISO(`${date}T12:00:00`);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={() => onNavigate(format(addDays(current, -1), "yyyy-MM-dd"))}
      >
        Anterior
      </Button>
      <Button variant="outline" onClick={() => onNavigate(format(new Date(), "yyyy-MM-dd"))}>
        Hoy
      </Button>
      <Button
        variant="outline"
        onClick={() => onNavigate(format(addDays(current, 1), "yyyy-MM-dd"))}
      >
        Siguiente
      </Button>
      <span className="font-body text-body-sm text-on-surface-variant">{date}</span>
    </div>
  );
}
