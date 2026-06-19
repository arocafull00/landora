"use client";

import type { BookingService } from "@/db/schema";
import { Switch } from "@/components/ui/switch";
import { useEmployeeSheetStore } from "@/stores/employee-sheet-store";

export function EmployeeServiceCheckbox({
  service,
  disabled,
}: {
  service: BookingService;
  disabled: boolean;
}) {
  const checked = useEmployeeSheetStore((s) => s.serviceIds.includes(service.id));
  const toggleServiceId = useEmployeeSheetStore((s) => s.toggleServiceId);

  return (
    <label className="flex items-center justify-between gap-2">
      <span className="font-body text-body-sm text-on-surface">{service.name}</span>
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={(next) => toggleServiceId(service.id, next)}
      />
    </label>
  );
}
