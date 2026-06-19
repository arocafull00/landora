"use client";

import type { BookingService } from "@/db/schema";
import { Switch } from "@/components/ui/switch";
import { useEmployeeEditorStore } from "@/stores/employee-editor-store";

export function EmployeeServiceCheckbox({
  service,
  disabled,
}: {
  service: BookingService;
  disabled: boolean;
}) {
  const checked = useEmployeeEditorStore((s) => s.serviceIds.includes(service.id));
  const toggleServiceId = useEmployeeEditorStore((s) => s.toggleServiceId);

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
