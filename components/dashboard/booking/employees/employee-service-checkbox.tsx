"use client";

import type { BookingService } from "@/lib/domain/dtos";
import { Scissors } from "lucide-react";
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
    <div className="flex items-center justify-between gap-3 rounded-lg border border-outline-variant px-3 py-2.5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
          <Scissors className="h-4 w-4 text-primary" aria-hidden />
        </div>
        <span className="truncate font-body text-body-sm font-medium text-on-surface">
          {service.name}
        </span>
      </div>
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={(next) => toggleServiceId(service.id, next)}
      />
    </div>
  );
}
