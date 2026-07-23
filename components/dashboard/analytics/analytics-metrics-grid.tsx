import { MessageCircle, Phone, TrendingUp, type LucideIcon } from "lucide-react";
import type { LandingAnalyticsDto } from "@/lib/domain/dtos";
import { AnalyticsMetricCard } from "@/components/dashboard/analytics/analytics-metric-card";

type MetricConfig = {
  label: string;
  value: number;
  subtitle: string;
  icon: LucideIcon;
  iconBgClass: string;
  iconColorClass: string;
  sparklineColor: string;
};

function toPercent(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function AnalyticsMetricsGrid({
  analytics,
  periodViews,
}: {
  analytics: LandingAnalyticsDto;
  periodViews: number;
}) {
  const metrics: MetricConfig[] = [
    {
      label: "Conversiones",
      value: analytics.leads,
      subtitle: `${toPercent(analytics.leads, periodViews)}% conversión`,
      icon: TrendingUp,
      iconBgClass: "bg-primary/10",
      iconColorClass: "text-primary",
      sparklineColor: "var(--color-primary)",
    },
    {
      label: "Clics en WhatsApp",
      value: analytics.whatsappClicks,
      subtitle: `CTR ${toPercent(analytics.whatsappClicks, periodViews)}%`,
      icon: MessageCircle,
      iconBgClass: "bg-success/10",
      iconColorClass: "text-success",
      sparklineColor: "var(--color-success)",
    },
    {
      label: "Clics en teléfono",
      value: analytics.phoneClicks,
      subtitle: `CTR ${toPercent(analytics.phoneClicks, periodViews)}%`,
      icon: Phone,
      iconBgClass: "bg-secondary/10",
      iconColorClass: "text-secondary",
      sparklineColor: "var(--color-secondary)",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-unit-md sm:grid-cols-3">
      {metrics.map((metric) => (
        <AnalyticsMetricCard
          key={metric.label}
          label={metric.label}
          value={metric.value}
          subtitle={metric.subtitle}
          icon={metric.icon}
          iconBgClass={metric.iconBgClass}
          iconColorClass={metric.iconColorClass}
          percentage={toPercent(metric.value, periodViews)}
          sparklineColor={metric.sparklineColor}
        />
      ))}
    </div>
  );
}
