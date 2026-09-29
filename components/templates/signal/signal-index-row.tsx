import type { BenefitItem } from "@/lib/dashboard-data";

export function SignalIndexRow({
  item,
}: {
  item: BenefitItem;
}) {
  return (
    <li
      className="grid gap-2 border-t border-[var(--site-on-dark)]/20 py-5 text-[var(--site-on-dark)] sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] sm:gap-4"
      data-signal-index-row
    >
      <span
        className="uppercase tracking-[0.12em] text-[var(--site-accent)] text-site-content"
        style={{ fontFamily: "var(--site-font-body)" }}
      >
        {item.title}
      </span>
      <span
        className="font-semibold leading-snug tracking-[-0.02em] tabular-nums text-[clamp(1rem,1.6vw,1.5rem)] sm:text-right"
        style={{ fontFamily: "var(--site-font-display)" }}
      >
        {item.description}
      </span>
    </li>
  );
}
