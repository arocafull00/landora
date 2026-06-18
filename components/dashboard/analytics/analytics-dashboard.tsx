"use client";

import { Info, BarChart2 } from "lucide-react";
import { AnalyticsChart } from "@/components/dashboard/analytics/analytics-chart";
import { AnalyticsDateFilter } from "@/components/dashboard/analytics/analytics-date-filter";
import { AnalyticsLoadingSkeleton } from "@/components/dashboard/analytics/analytics-loading-skeleton";
import { AnalyticsMetricsGrid } from "@/components/dashboard/analytics/analytics-metrics-grid";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Panel } from "@/components/ui/primitives";
import { useAnalyticsStore } from "@/stores/analytics-store";

export function AnalyticsDashboard() {
  const data = useAnalyticsStore((state) => state.data);
  const loading = useAnalyticsStore((state) => state.loading);

  const periodViews = data
    ? data.dailyViews.reduce((sum, d) => sum + d.views, 0)
    : 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <DashboardPageHeader
        title="Analíticas"
        description="Rendimiento de tu landing pública"
        actions={<AnalyticsDateFilter />}
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-unit-lg py-unit-lg">
        {loading ? <AnalyticsLoadingSkeleton /> : null}
        {!loading && !data ? (
          <Panel className="flex flex-col items-center gap-unit-md p-unit-xl text-center">
            <BarChart2 className="h-8 w-8 text-on-surface-variant" aria-hidden />
            <div>
              <p className="font-headline text-headline-md font-semibold text-on-surface">
                No se pudieron cargar las analíticas
              </p>
              <p className="mt-1 font-body text-body-sm text-on-surface-variant">
                Cambia el rango de fechas o vuelve a intentarlo más tarde.
              </p>
            </div>
          </Panel>
        ) : null}
        {!loading && data ? (
          <div className="space-y-unit-lg">
            <AnalyticsChart
              dailyViews={data.dailyViews}
              previousPeriodViews={data.previousPeriodViews}
            />
            <AnalyticsMetricsGrid analytics={data} periodViews={periodViews} />
            <p className="flex items-center gap-1.5 font-body text-body-sm text-on-surface-variant">
              <Info className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Los datos se actualizan diariamente. La información puede tener un pequeño retraso.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
