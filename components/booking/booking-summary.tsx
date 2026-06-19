export function BookingSummary({
  summary,
}: {
  summary: {
    serviceName?: string;
    employeeName?: string;
    date?: string;
    startsAt?: string;
  };
}) {
  const timeLabel = summary.startsAt
    ? new Intl.DateTimeFormat("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(summary.startsAt))
    : undefined;

  return (
    <aside className="h-fit rounded-xl border border-outline-variant bg-surface-container p-4 lg:sticky lg:top-4">
      <h3 className="font-body text-body-sm font-semibold text-on-surface">Resumen</h3>
      <dl className="mt-4 space-y-3 font-body text-body-sm">
        <div>
          <dt className="text-on-surface-variant">Servicio</dt>
          <dd>{summary.serviceName ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-on-surface-variant">Profesional</dt>
          <dd>{summary.employeeName ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-on-surface-variant">Fecha</dt>
          <dd>{summary.date ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-on-surface-variant">Hora</dt>
          <dd>{timeLabel ?? "—"}</dd>
        </div>
      </dl>
    </aside>
  );
}
