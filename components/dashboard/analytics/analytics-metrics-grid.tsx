import {
  Calendar,
  CalendarDays,
  Eye,
  MessageCircle,
  Phone,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import type { LandingAnalytics } from "@/data/analytics";
import { AnalyticsMetricCard } from "@/components/dashboard/analytics/analytics-metric-card";

type MetricConfig = {
  label: string;
  value: number;
  icon: LucideIcon;
};

export function AnalyticsMetricsGrid({ analytics }: { analytics: LandingAnalytics }) {
  const featuredMetric: MetricConfig = {
    label: "Visitas totales",
    value: analytics.totalViews,
    icon: Eye,
  };

  const metrics: MetricConfig[] = [
    { label: "Visitas últimos 7 días", value: analytics.views7d, icon: CalendarDays },
    { label: "Visitas últimos 30 días", value: analytics.views30d, icon: Calendar },
    { label: "Conversiones", value: analytics.leads, icon: UserPlus },
    { label: "Clics en WhatsApp", value: analytics.whatsappClicks, icon: MessageCircle },
    { label: "Clics en teléfono", value: analytics.phoneClicks, icon: Phone },
  ];

  return (
    <div className="grid gap-unit-md sm:grid-cols-2 xl:grid-cols-3">
      <div className="col-span-1 sm:col-span-2 xl:col-span-1">
        <AnalyticsMetricCard
          label={featuredMetric.label}
          value={featuredMetric.value}
          icon={featuredMetric.icon}
          featured
        />
      </div>
      {metrics.map((metric) => (
        <AnalyticsMetricCard
          key={metric.label}
          label={metric.label}
          value={metric.value}
          icon={metric.icon}
        />
      ))}
    </div>
  );
}
