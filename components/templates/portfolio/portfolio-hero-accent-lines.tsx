const horizontalLines = [
  { top: "20%", delay: "150ms" },
  { top: "50%", delay: "280ms" },
  { top: "80%", delay: "410ms" },
] as const;

const verticalLines = [
  { left: "20%", delay: "520ms" },
  { left: "50%", delay: "640ms" },
  { left: "80%", delay: "760ms" },
] as const;

export function PortfolioHeroAccentLines() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {horizontalLines.map((line) => (
        <div
          key={`h-${line.top}`}
          className="portfolio-hero-line-h absolute left-0 right-0 bg-[#27272a]"
          style={
            {
              top: line.top,
              animationDelay: line.delay,
              "--line-delay": line.delay,
            } as React.CSSProperties
          }
        />
      ))}
      {verticalLines.map((line) => (
        <div
          key={`v-${line.left}`}
          className="portfolio-hero-line-v absolute top-0 bottom-0 bg-[#27272a]"
          style={
            {
              left: line.left,
              animationDelay: line.delay,
              "--line-delay": line.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
