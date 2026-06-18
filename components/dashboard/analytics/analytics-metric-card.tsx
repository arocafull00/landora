import type { LucideIcon } from "lucide-react";
import { Panel } from "@/components/ui/primitives";

export function AnalyticsMetricCard({
  label,
  value,
  icon: Icon,
  featured = false,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <Panel className="border-primary/20 bg-primary/[0.06] p-unit-md">
        <div className="flex items-start justify-between gap-unit-sm">
          <p className="font-body text-body-sm text-on-surface-variant">{label}</p>
          <Icon className="h-4 w-4 shrink-0 text-primary/50" aria-hidden />
        </div>
        <p className="mt-2 font-headline text-headline-xl font-semibold text-on-surface">
          {value.toLocaleString("es-ES")}
        </p>
      </Panel>
    );
  }

  return (
    <Panel className="p-unit-md">
      <div className="flex items-start justify-between gap-unit-sm">
        <p className="font-body text-body-sm text-on-surface-variant">{label}</p>
        <Icon className="h-4 w-4 shrink-0 text-on-surface-variant/40" aria-hidden />
      </div>
      <p className="mt-2 font-headline text-headline-lg font-semibold text-on-surface">
        {value.toLocaleString("es-ES")}
      </p>
    </Panel>
  );
}
