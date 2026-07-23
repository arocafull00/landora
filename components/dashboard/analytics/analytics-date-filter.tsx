import Link from "next/link";
import type { DateRangePreset } from "@/lib/analytics-date-range";

const presets: Array<{ id: DateRangePreset; label: string }> = [
  { id: "7d", label: "7 días" },
  { id: "30d", label: "30 días" },
  { id: "90d", label: "90 días" },
  { id: "custom", label: "Personalizado" },
];

export function AnalyticsDateFilter({
  from,
  preset,
  to,
}: {
  from: string;
  preset: DateRangePreset;
  to: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {presets.map((item) => (
        <Link
          className={`rounded-full px-3 py-1.5 font-body text-body-sm transition-colors ${
            preset === item.id
              ? "bg-primary text-on-primary"
              : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
          }`}
          href={
            item.id === "custom"
              ? `/analytics?range=custom&from=${from}&to=${to}`
              : `/analytics?range=${item.id}`
          }
          key={item.id}
        >
          {item.label}
        </Link>
      ))}
      {preset === "custom" ? (
        <form action="/analytics" className="flex flex-wrap items-center gap-2" method="get">
          <input name="range" type="hidden" value="custom" />
          <label className="font-body text-body-sm text-on-surface-variant" htmlFor="analytics-from">
            Desde
          </label>
          <input
            className="rounded-md border border-outline-variant bg-surface-container-lowest px-2 py-1.5 font-body text-body-sm text-on-surface"
            defaultValue={from}
            id="analytics-from"
            name="from"
            type="date"
          />
          <span className="font-body text-body-sm text-on-surface-variant">—</span>
          <label className="font-body text-body-sm text-on-surface-variant" htmlFor="analytics-to">
            Hasta
          </label>
          <input
            className="rounded-md border border-outline-variant bg-surface-container-lowest px-2 py-1.5 font-body text-body-sm text-on-surface"
            defaultValue={to}
            id="analytics-to"
            name="to"
            type="date"
          />
          <button
            className="rounded-md bg-primary px-3 py-1.5 font-body text-body-sm text-on-primary transition-colors hover:bg-primary-fixed-variant"
            type="submit"
          >
            Aplicar
          </button>
        </form>
      ) : null}
    </div>
  );
}
