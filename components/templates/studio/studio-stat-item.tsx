import type { StatContent } from "@/lib/dashboard-data";

export function StudioStatItem({ stat }: { stat: StatContent }) {
  const displayValue =
    stat.countTo !== undefined
      ? `${stat.countTo}${stat.suffix ?? ""}`
      : stat.value;

  return (
    <div>
      <div
        className="leading-[1.05] text-[var(--site-text)] text-site-title"
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        {displayValue}
      </div>
      <div
        className="mt-2 text-[var(--site-text-muted)] text-site-content"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}
