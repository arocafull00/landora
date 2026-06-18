type TooltipPayload = {
  value?: number;
};

export function AnalyticsChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  const value = payload[0]?.value;
  if (value === undefined) return null;

  return (
    <div className="rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 shadow-sm">
      <p className="font-body text-body-sm text-on-surface-variant">{label}</p>
      <p className="font-body text-body-md font-semibold text-on-surface">
        {value.toLocaleString("es-ES")} visitas
      </p>
    </div>
  );
}
