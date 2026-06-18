import type { LandingAnalytics } from "@/data/analytics";
import { AnalyticsMetricCard } from "@/components/dashboard/analytics/analytics-metric-card";

export function AnalyticsMetricsGrid({ analytics }: { analytics: LandingAnalytics }) {
  const metrics = [
    { label: "Visitas totales", value: analytics.totalViews },
    { label: "Visitas últimos 7 días", value: analytics.views7d },
    { label: "Visitas últimos 30 días", value: analytics.views30d },
    { label: "Conversiones", value: analytics.leads },
    { label: "Clics en WhatsApp", value: analytics.whatsappClicks },
    { label: "Clics en teléfono", value: analytics.phoneClicks },
  ];

  return (
    <div className="grid gap-unit-md sm:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => (
        <AnalyticsMetricCard key={metric.label} label={metric.label} value={metric.value} />
      ))}
    </div>
  );
}
