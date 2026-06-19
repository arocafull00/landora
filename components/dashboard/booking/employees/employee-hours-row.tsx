"use client";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useEmployeeSheetStore } from "@/stores/employee-sheet-store";

export function EmployeeHoursRow({
  dayOfWeek,
  label,
  disabled,
}: {
  dayOfWeek: number;
  label: string;
  disabled: boolean;
}) {
  const row = useEmployeeSheetStore((s) => s.hourDrafts.find((h) => h.dayOfWeek === dayOfWeek));
  const updateHourDraft = useEmployeeSheetStore((s) => s.updateHourDraft);

  if (!row) {
    return null;
  }

  const onChange = (next: typeof row) => {
    updateHourDraft(dayOfWeek, next);
  };

  return (
    <div className="grid grid-cols-[3rem_1fr_1fr_1fr] items-center gap-2">
      <span className="font-body text-body-sm text-on-surface">{label}</span>
      <Switch
        checked={row.isWorking}
        disabled={disabled}
        onCheckedChange={(checked) => onChange({ ...row, isWorking: checked })}
      />
      <Input
        type="time"
        value={row.startTime}
        disabled={disabled || !row.isWorking}
        onChange={(e) => onChange({ ...row, startTime: e.target.value })}
      />
      <Input
        type="time"
        value={row.endTime}
        disabled={disabled || !row.isWorking}
        onChange={(e) => onChange({ ...row, endTime: e.target.value })}
      />
    </div>
  );
}
