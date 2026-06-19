"use client";

import { cn } from "@/lib/utils";
import { DAY_LABELS, DISPLAY_DAY_ORDER } from "@/lib/employee-schedule";
import { useEmployeeEditorStore } from "@/stores/employee-editor-store";

export function EmployeeScheduleCompact({ disabled }: { disabled: boolean }) {
  const hourDrafts = useEmployeeEditorStore((s) => s.hourDrafts);
  const toggleWorkingDay = useEmployeeEditorStore((s) => s.toggleWorkingDay);
  const setUniformTimes = useEmployeeEditorStore((s) => s.setUniformTimes);

  const workingDays = hourDrafts.filter((h) => h.isWorking);
  const startTime = workingDays[0]?.startTime ?? "09:00";
  const endTime = workingDays[0]?.endTime ?? "18:00";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {DISPLAY_DAY_ORDER.map((dayOfWeek) => {
          const row = hourDrafts.find((h) => h.dayOfWeek === dayOfWeek);
          if (!row) {
            return null;
          }

          return (
            <button
              key={dayOfWeek}
              type="button"
              disabled={disabled}
              onClick={() => toggleWorkingDay(dayOfWeek, !row.isWorking)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg border font-body text-body-sm font-medium transition-colors",
                row.isWorking
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low",
              )}
            >
              {DAY_LABELS[dayOfWeek].charAt(0)}
            </button>
          );
        })}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="font-body text-body-sm text-on-surface-variant" htmlFor="schedule-start">
            Entrada
          </label>
          <input
            id="schedule-start"
            type="time"
            value={startTime}
            disabled={disabled || workingDays.length === 0}
            onChange={(e) => setUniformTimes(e.target.value, endTime)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 font-body text-body-sm text-on-surface shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="space-y-2">
          <label className="font-body text-body-sm text-on-surface-variant" htmlFor="schedule-end">
            Salida
          </label>
          <input
            id="schedule-end"
            type="time"
            value={endTime}
            disabled={disabled || workingDays.length === 0}
            onChange={(e) => setUniformTimes(startTime, e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 font-body text-body-sm text-on-surface shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
}
