"use client";

import type { BookingService } from "@/db/schema";
import { Switch } from "@/components/ui/switch";

export function EmployeeServiceCheckbox({
  service,
  checked,
  disabled,
  onCheckedChange,
}: {
  service: BookingService;
  checked: boolean;
  disabled: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-2">
      <span className="font-body text-body-sm text-on-surface">{service.name}</span>
      <Switch checked={checked} disabled={disabled} onCheckedChange={onCheckedChange} />
    </label>
  );
}
