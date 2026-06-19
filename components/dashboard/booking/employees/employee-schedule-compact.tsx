"use client";

import { Circle, CircleCheck, Clock } from "lucide-react";
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
      <div className="flex gap-1.5">
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
                "flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-lg border px-1 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                row.isWorking
                  ? "border-primary bg-primary/5"
                  : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low",
              )}
            >
              <span
                className={cn(
                  "font-body text-body-sm font-medium",
                  row.isWorking ? "text-primary" : "text-on-surface-variant",
                )}
              >
                {DAY_LABELS[dayOfWeek]}
              </span>
              {row.isWorking ? (
                <CircleCheck className="h-4 w-4 text-primary" aria-hidden />
              ) : (
                <Circle className="h-4 w-4 text-outline" aria-hidden />
              )}
            </button>
          );
        })}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="font-body text-body-sm font-medium text-on-surface" htmlFor="schedule-start">
            Hora de entrada
          </label>
          <div className="flex h-9 overflow-hidden rounded-md border border-input bg-transparent shadow-xs focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
            <div className="flex items-center border-r border-input px-3">
              <Clock className="h-4 w-4 shrink-0 text-on-surface-variant" aria-hidden />
            </div>
            <input
              id="schedule-start"
              type="time"
              value={startTime}
              disabled={disabled || workingDays.length === 0}
              onChange={(e) => setUniformTimes(e.target.value, endTime)}
              className="min-w-0 flex-1 border-0 bg-transparent px-3 py-1 font-body text-body-sm text-on-surface outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="font-body text-body-sm font-medium text-on-surface" htmlFor="schedule-end">
            Hora de salida
          </label>
          <div className="flex h-9 overflow-hidden rounded-md border border-input bg-transparent shadow-xs focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
            <div className="flex items-center border-r border-input px-3">
              <Clock className="h-4 w-4 shrink-0 text-on-surface-variant" aria-hidden />
            </div>
            <input
              id="schedule-end"
              type="time"
              value={endTime}
              disabled={disabled || workingDays.length === 0}
              onChange={(e) => setUniformTimes(startTime, e.target.value)}
              className="min-w-0 flex-1 border-0 bg-transparent px-3 py-1 font-body text-body-sm text-on-surface outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
