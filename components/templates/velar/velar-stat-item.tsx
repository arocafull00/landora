import type { StatContent } from "@/lib/dashboard-data";

export function VelarStatItem({ stat }: { stat: StatContent }) {
  const displayValue =
    stat.countTo !== undefined
      ? `${stat.countTo}${stat.suffix ?? ""}`
      : stat.value;

  return (
    <div>
      <div
        data-editor-id={`story:stat:${stat.id}:value`}
        className="text-white leading-[1.1] text-site-title"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
        }}
      >
        {displayValue}
      </div>
      <div
        data-editor-id={`story:stat:${stat.id}:label`}
        className="mt-[clamp(4px,0.5vw,8px)] text-white/60 text-site-content"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          letterSpacing: "0.01em",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}
