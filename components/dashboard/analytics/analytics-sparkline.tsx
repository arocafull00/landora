export function AnalyticsSparkline({
  data,
  color = "var(--color-primary)",
}: {
  data: number[];
  color?: string;
}) {
  const hasData = data.length >= 2 && data.some((v) => v > 0);

  if (!hasData) {
    return (
      <svg
        width="100%"
        height="28"
        viewBox="0 0 200 28"
        preserveAspectRatio="none"
        aria-hidden
      >
        <line
          x1="0"
          y1="14"
          x2="200"
          y2="14"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="3 3"
          strokeOpacity="0.4"
        />
      </svg>
    );
  }

  const max = Math.max(...data, 1);
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 200;
      const y = 22 - (v / max) * 18;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width="100%"
      height="28"
      viewBox="0 0 200 28"
      preserveAspectRatio="none"
      aria-hidden
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.6"
      />
    </svg>
  );
}
