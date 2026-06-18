"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DailyView } from "@/data/analytics";
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
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline-variant)" />
              <XAxis dataKey="day" tick={{ fill: "var(--color-on-surface-variant)", fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: "var(--color-on-surface-variant)", fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Panel>
  );
}
