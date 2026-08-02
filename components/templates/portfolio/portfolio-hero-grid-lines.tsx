
export function PortfolioHeroGridLines({
  bottom = false,
  left = false,
  right = false,
  top = false,
}: {
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
}) {
  return (
    <>
      {top ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left bg-portfolio-line"
        />
      ) : null}
      {left ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-px origin-top bg-portfolio-line"
        />
      ) : null}
      {bottom ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px origin-left bg-portfolio-line"
        />
      ) : null}
      {right ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-px origin-top bg-portfolio-line"
        />
      ) : null}
    </>
  );
}
