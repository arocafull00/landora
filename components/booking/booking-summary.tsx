import { Separator } from "@/components/ui/separator";
import { formatSummaryDate, formatSummaryTime } from "@/lib/booking/format-datetime";
import { cn } from "@/lib/utils";

function SummaryRow({
  label,
  value,
  pending,
}: {
  label: string;
  value?: string;
  pending?: boolean;
}) {
  return (
    <div>
      <dt className="font-body text-body-sm text-on-surface-variant">{label}</dt>
      <dd
        className={cn(
          "mt-0.5 font-body text-body-sm",
          pending ? "text-on-surface-variant" : "text-on-surface",
        )}
      >
        {pending ? "Pendiente" : value}
      </dd>
    </div>
  );
}

export function BookingSummary({
  summary,
  embedded = false,
}: {
  summary: {
    serviceName?: string;
    employeeName?: string;
    date?: string;
    startsAt?: string;
  };
  embedded?: boolean;
}) {
  const timeLabel = summary.startsAt ? formatSummaryTime(summary.startsAt) : undefined;
  const dateLabel = summary.date ? formatSummaryDate(summary.date) : undefined;

  return (
    <aside
      className={cn(
        "h-fit rounded-lg border border-outline-variant bg-surface-container p-4",
        !embedded && "lg:sticky lg:top-4",
      )}
    >
      <h3 className="font-label text-label-md uppercase tracking-wide text-on-surface-variant">
        Resumen
      </h3>
      <dl className="mt-4 space-y-3">
        <SummaryRow label="Servicio" value={summary.serviceName} pending={!summary.serviceName} />
        <Separator />
        <SummaryRow
          label="Profesional"
          value={summary.employeeName}
          pending={!summary.employeeName}
        />
        <Separator />
        <SummaryRow label="Fecha" value={dateLabel} pending={!summary.date} />
        <Separator />
        <SummaryRow label="Hora" value={timeLabel} pending={!summary.startsAt} />
      </dl>
    </aside>
  );
}
