"use client";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type HourDraft = {
  dayOfWeek: number;
  isWorking: boolean;
  startTime: string;
  endTime: string;
};

export function EmployeeHoursRow({
  label,
  row,
  disabled,
  onChange,
}: {
  label: string;
  row: HourDraft;
  disabled: boolean;
  onChange: (row: HourDraft) => void;
}) {
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
