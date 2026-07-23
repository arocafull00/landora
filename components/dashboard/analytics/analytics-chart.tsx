"use client";

import dynamic from "next/dynamic";
import type { DailyViewDto } from "@/lib/domain/dtos";
import { Panel } from "@/components/ui/primitives";

const AnalyticsChartArea = dynamic(
  () =>
    import("@/components/dashboard/analytics/analytics-chart-area").then(
      (module) => module.AnalyticsChartArea,
    ),
  {
    ssr: false,
    loading: () => (
      <Panel className="flex h-96 items-center justify-center p-unit-lg">
        <p className="font-body text-body-sm text-on-surface-variant">Cargando gráfico…</p>
      </Panel>
    ),
  },
);

export function AnalyticsChart({
  dailyViews,
  previousPeriodViews,
}: {
  dailyViews: DailyViewDto[];
  previousPeriodViews: number;
}) {
  return <AnalyticsChartArea dailyViews={dailyViews} previousPeriodViews={previousPeriodViews} />;
}
