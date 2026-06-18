"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DailyView } from "@/data/analytics";
import { AnalyticsChartTooltip } from "@/components/dashboard/analytics/analytics-chart-tooltip";
import { Panel } from "@/components/ui/primitives";

function formatDayLabel(day: string): string {
  const date = new Date(day);
  if (Number.isNaN(date.getTime())) return day;

  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });
}

export function AnalyticsChart({ dailyViews }: { dailyViews: DailyView[] }) {
  const chartData = dailyViews.map((item) => ({
    day: formatDayLabel(item.day),
    views: item.views,
  }));

  return (
    <Panel className="p-unit-md">
      <h3 className="font-headline text-headline-md font-semibold text-on-surface">
        Visitas por día
      </h3>
      <div className="mt-unit-md h-72 w-full">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="font-body text-body-sm text-on-surface-variant">
              No hay visitas en el rango seleccionado.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="0"
                stroke="var(--color-outline-variant)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fill: "var(--color-on-surface-variant)", fontSize: 11 }}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "var(--color-on-surface-variant)", fontSize: 11 }}
              />
              <Tooltip content={<AnalyticsChartTooltip />} />
              <Area
                type="monotone"
                dataKey="views"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                fill="url(#viewsGradient)"
                dot={{ r: 3, fill: "var(--color-primary)" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Panel>
  );
}
