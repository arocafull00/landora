import type { BenefitItem } from "@/lib/dashboard-data";

export function SignalIndexRow({
  item,
}: {
  item: BenefitItem;
}) {
  return (
    <li
      className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 border-t border-[var(--site-on-dark)]/20 py-4 text-[var(--site-on-dark)]"
      data-signal-index-row
    >
      <span
        className="text-[11px] uppercase tracking-[0.2em] text-[var(--site-on-dark)]/55"
        style={{ fontFamily: "var(--site-font-body)" }}
      >
        {item.title}
      </span>
      <span
        className="text-right text-sm font-semibold uppercase tracking-[0.08em] tabular-nums md:text-base"
        style={{ fontFamily: "var(--site-font-display)" }}
      >
        {item.description}
      </span>
    </li>
  );
}
