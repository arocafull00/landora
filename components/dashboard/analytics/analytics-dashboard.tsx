"use client";

import type { LandingAnalytics } from "@/data/analytics";
import { AnalyticsChart } from "@/components/dashboard/analytics/analytics-chart";
import { AnalyticsDateFilter } from "@/components/dashboard/analytics/analytics-date-filter";
import { AnalyticsMetricsGrid } from "@/components/dashboard/analytics/analytics-metrics-grid";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";

type DateRangePreset = "7d" | "30d" | "90d" | "custom";

function getPresetRange(preset: DateRangePreset): { from: Date; to: Date } {
  const to = new Date();
  const from = new Date();

  if (preset === "7d") {
    from.setDate(from.getDate() - 7);
    return { from, to };
  }

  if (preset === "90d") {
    from.setDate(from.getDate() - 90);
    return { from, to };
  }

  from.setDate(from.getDate() - 30);
  return { from, to };
}

function formatDateInput(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function AnalyticsDashboard({
  data,
  preset,
  from,
  to,
  loading,
  onPresetChange,
  onCustomRangeChange,
}: {
  data: LandingAnalytics | null;
  preset: DateRangePreset;
  from: string;
  to: string;
  loading: boolean;
  onPresetChange: (preset: DateRangePreset) => void;
  onCustomRangeChange: (from: string, to: string) => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <DashboardPageHeader
        title="Analíticas"
        description="Rendimiento de tu landing pública"
        actions={
          <AnalyticsDateFilter
            from={from}
            preset={preset}
            to={to}
            onCustomRangeChange={onCustomRangeChange}
            onPresetChange={onPresetChange}
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-unit-lg py-unit-lg">
        {loading ? (
          <p className="font-body text-body-md text-on-surface-variant">Cargando métricas...</p>
        ) : null}
        {!loading && !data ? (
          <p className="font-body text-body-md text-on-surface-variant">
            No se pudieron cargar las analíticas.
          </p>
        ) : null}
        {!loading && data ? (
          <div className="space-y-unit-lg">
            <AnalyticsMetricsGrid analytics={data} />
            <AnalyticsChart dailyViews={data.dailyViews} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { getPresetRange, formatDateInput };
export type { DateRangePreset };
