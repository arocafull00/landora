import type { LucideIcon } from "lucide-react";
import { Panel } from "@/components/ui/primitives";
import { AnalyticsSparkline } from "@/components/dashboard/analytics/analytics-sparkline";

export function AnalyticsMetricCard({
  label,
  value,
  subtitle,
  icon: Icon,
  iconBgClass,
  iconColorClass,
  percentage,
  sparklineColor,
}: {
  label: string;
  value: number;
  subtitle: string;
  icon: LucideIcon;
  iconBgClass: string;
  iconColorClass: string;
  percentage: number;
  sparklineColor: string;
}) {
  return (
    <Panel className="flex flex-col p-unit-md">
      <div className="flex items-start gap-unit-sm">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconBgClass}`}
        >
          <Icon className={`h-5 w-5 ${iconColorClass}`} aria-hidden />
        </div>
        <div className="flex flex-1 items-start justify-between gap-2 pt-0.5">
          <p className="font-body text-body-sm text-on-surface-variant">{label}</p>
          <span className="shrink-0 rounded-md bg-success/10 px-1.5 py-0.5 font-body text-label-md font-semibold text-success">
            {percentage}%
          </span>
        </div>
      </div>
      <p className="mt-unit-md font-headline text-headline-lg font-semibold leading-none text-on-surface">
        {value.toLocaleString("es-ES")}
      </p>
      <p className="mt-1 font-body text-body-sm text-on-surface-variant">{subtitle}</p>
      <div className="mt-unit-sm">
        <AnalyticsSparkline data={[]} color={sparklineColor} />
      </div>
    </Panel>
  );
}
