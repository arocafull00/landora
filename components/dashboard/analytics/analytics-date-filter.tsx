"use client";

import type { DateRangePreset } from "@/lib/analytics-date-range";
import { useAnalyticsStore } from "@/stores/analytics-store";

const presets: Array<{ id: DateRangePreset; label: string }> = [
  { id: "7d", label: "7 días" },
  { id: "30d", label: "30 días" },
  { id: "90d", label: "90 días" },
  { id: "custom", label: "Personalizado" },
];

export function AnalyticsDateFilter() {
  const preset = useAnalyticsStore((state) => state.preset);
  const from = useAnalyticsStore((state) => state.from);
  const to = useAnalyticsStore((state) => state.to);
  const setPreset = useAnalyticsStore((state) => state.setPreset);
  const setRange = useAnalyticsStore((state) => state.setRange);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {presets.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`rounded-full px-3 py-1.5 font-body text-body-sm transition-colors ${
            preset === item.id
              ? "bg-primary text-on-primary"
              : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
          }`}
          onClick={() => setPreset(item.id)}
        >
          {item.label}
        </button>
      ))}
      {preset === "custom" ? (
        <div className="flex flex-wrap items-center gap-2">
          <input
            className="rounded-md border border-outline-variant bg-surface-container-lowest px-2 py-1.5 font-body text-body-sm text-on-surface"
            type="date"
            value={from}
            onChange={(event) => setRange(event.target.value, to)}
          />
          <span className="font-body text-body-sm text-on-surface-variant">—</span>
          <input
            className="rounded-md border border-outline-variant bg-surface-container-lowest px-2 py-1.5 font-body text-body-sm text-on-surface"
            type="date"
            value={to}
            onChange={(event) => setRange(from, event.target.value)}
          />
        </div>
      ) : null}
    </div>
  );
}
