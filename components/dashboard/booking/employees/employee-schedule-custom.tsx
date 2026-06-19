"use client";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DAY_LABELS, DISPLAY_DAY_ORDER } from "@/lib/employee-schedule";
import { useEmployeeEditorStore } from "@/stores/employee-editor-store";
import { ArrowRight } from "lucide-react";

export function EmployeeScheduleCustom({ disabled }: { disabled: boolean }) {
  const hourDrafts = useEmployeeEditorStore((s) => s.hourDrafts);
  const updateHourDraft = useEmployeeEditorStore((s) => s.updateHourDraft);

  return (
    <div className="space-y-3">
      {DISPLAY_DAY_ORDER.map((dayOfWeek) => {
        const row = hourDrafts.find((h) => h.dayOfWeek === dayOfWeek);
        if (!row) {
          return null;
        }

        const onChange = (next: typeof row) => {
          updateHourDraft(dayOfWeek, next);
        };

        return (
          <div key={dayOfWeek} className="flex items-center gap-3">
            <span className="w-8 shrink-0 font-body text-body-sm font-medium text-on-surface">
              {DAY_LABELS[dayOfWeek]}
            </span>
            <Switch
              checked={row.isWorking}
              disabled={disabled}
              onCheckedChange={(checked) => onChange({ ...row, isWorking: checked })}
            />
            {row.isWorking ? (
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <Input
                  type="time"
                  value={row.startTime}
                  disabled={disabled}
                  onChange={(e) => onChange({ ...row, startTime: e.target.value })}
                  className="min-w-0"
                />
                <ArrowRight className="h-4 w-4 shrink-0 text-on-surface-variant" />
                <Input
                  type="time"
                  value={row.endTime}
                  disabled={disabled}
                  onChange={(e) => onChange({ ...row, endTime: e.target.value })}
                  className="min-w-0"
                />
              </div>
            ) : (
              <span className="font-body text-body-sm text-on-surface-variant">Libre</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
