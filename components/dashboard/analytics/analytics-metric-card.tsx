import { Panel } from "@/components/ui/primitives";

export function AnalyticsMetricCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <Panel className="p-unit-md">
      <p className="font-body text-body-sm text-on-surface-variant">{label}</p>
      <p className="mt-2 font-headline text-headline-lg font-semibold text-on-surface">
        {value.toLocaleString("es-ES")}
      </p>
    </Panel>
  );
}
