import type { StatContent } from "@/lib/dashboard-data";

export function StudioStatItem({ stat }: { stat: StatContent }) {
  const displayValue =
    stat.countTo !== undefined
      ? `${stat.countTo}${stat.suffix ?? ""}`
      : stat.value;

  return (
    <div>
      <div
        className="leading-[1.05] text-[var(--site-text)]"
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 700,
          fontSize: "clamp(40px, 5vw, 64px)",
          letterSpacing: "-0.02em",
        }}
      >
        {displayValue}
      </div>
      <div
        className="mt-2 text-[var(--site-text-muted)]"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "clamp(13px, 1.1vw, 15px)",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}
