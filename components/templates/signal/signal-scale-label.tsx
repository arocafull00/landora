export function SignalScaleLabel({
  label,
}: {
  label: string;
}) {
  return (
    <li
      className="font-medium uppercase tracking-[0.2em] text-[var(--site-text-muted)] text-site-content"
      data-signal-scale-label
      style={{ fontFamily: "var(--site-font-body)" }}
    >
      {label}
    </li>
  );
}
