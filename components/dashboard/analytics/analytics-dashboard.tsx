import { BarChart2, Info } from "lucide-react";
import { AnalyticsChart } from "@/components/dashboard/analytics/analytics-chart";
import { AnalyticsDateFilter } from "@/components/dashboard/analytics/analytics-date-filter";
import { AnalyticsMetricsGrid } from "@/components/dashboard/analytics/analytics-metrics-grid";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Panel } from "@/components/ui/primitives";
import type { DateRangePreset } from "@/lib/analytics-date-range";
import type { LandingAnalyticsDto } from "@/lib/domain/dtos";

export function AnalyticsDashboard({
  data,
  from,
  preset,
  to,
}: {
  data: LandingAnalyticsDto | null;
  from: string;
  preset: DateRangePreset;
  to: string;
}) {
  const periodViews =
    data?.dailyViews.reduce((sum, day) => sum + day.views, 0) ?? 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <DashboardPageHeader
        actions={<AnalyticsDateFilter from={from} preset={preset} to={to} />}
        description="Rendimiento de tu landing pública"
        title="Analíticas"
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-unit-lg py-unit-lg">
        {!data ? (
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
        ) : (
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
        )}
      </div>
    </div>
  );
}
