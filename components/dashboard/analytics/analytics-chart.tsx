"use client";

import { ChevronDown, TrendingDown, TrendingUp } from "lucide-react";
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

function computeChange(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return Math.round(((current - previous) / previous) * 100);
}

export function AnalyticsChart({
  dailyViews,
  previousPeriodViews,
}: {
  dailyViews: DailyView[];
  previousPeriodViews: number;
}) {
  const periodViews = dailyViews.reduce((sum, d) => sum + d.views, 0);
  const change = computeChange(periodViews, previousPeriodViews);

  const chartData = dailyViews.map((item) => ({
    day: formatDayLabel(item.day),
    views: item.views,
  }));

  return (
    <Panel className="p-unit-lg">
      <div className="flex items-center justify-between gap-unit-md">
        <h3 className="font-body text-body-lg font-semibold text-on-surface">Visitas</h3>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md border border-outline-variant px-3 py-1.5 font-body text-body-sm text-on-surface-variant transition-colors hover:bg-surface-container-high"
        >
          Visitas por día
          <ChevronDown className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>

      <div className="mt-unit-md">
        <p className="font-headline text-6xl font-bold leading-none text-on-surface">
          {periodViews.toLocaleString("es-ES")}
        </p>
        <p className="mt-1.5 font-body text-body-sm text-on-surface-variant">visitas totales</p>
        {change !== null ? (
          <div className="mt-2 flex items-center gap-1.5">
            {change >= 0 ? (
              <TrendingUp className="h-4 w-4 text-success" aria-hidden />
            ) : (
              <TrendingDown className="h-4 w-4 text-danger" aria-hidden />
            )}
            <span
              className={`font-body text-body-sm font-semibold ${change >= 0 ? "text-success" : "text-danger"}`}
            >
              {change >= 0 ? "+" : ""}
              {change}%
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">
              respecto al período anterior
            </span>
          </div>
        ) : null}
      </div>

      <div className="mt-unit-lg h-72 w-full">
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
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "var(--color-on-surface-variant)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<AnalyticsChartTooltip />} />
              <Area
                type="monotone"
                dataKey="views"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                fill="url(#viewsGradient)"
                dot={{ r: 3, fill: "var(--color-primary)", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "var(--color-primary)", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Panel>
  );
}
