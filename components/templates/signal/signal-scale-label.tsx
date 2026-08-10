export function SignalScaleLabel({
  label,
}: {
  label: string;
}) {
  return (
    <li
      className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--site-text-muted)]"
      data-signal-scale-label
      style={{ fontFamily: "var(--site-font-body)" }}
    >
      {label}
    </li>
  );
}
