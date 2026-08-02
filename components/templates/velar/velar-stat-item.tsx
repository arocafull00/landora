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
        className="text-white leading-[1.1]"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "clamp(36px, 4.5vw, 72px)",
        }}
      >
        {displayValue}
      </div>
      <div
        data-editor-id={`story:stat:${stat.id}:label`}
        className="mt-[clamp(4px,0.5vw,8px)] text-white/60"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "clamp(12px, 1.1vw, 16px)",
          letterSpacing: "0.01em",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}
