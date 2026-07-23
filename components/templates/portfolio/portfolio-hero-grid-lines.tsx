import { m } from "motion/react";

const lineTransition = {
  duration: 0.65,
  ease: [0.16, 1, 0.3, 1],
} as const;

export function PortfolioHeroGridLines({
  bottom = false,
  delay,
  left = false,
  reduceMotion,
  right = false,
  top = false,
}: {
  bottom?: boolean;
  delay: number;
  left?: boolean;
  reduceMotion: boolean;
  right?: boolean;
  top?: boolean;
}) {
  const transition = { ...lineTransition, delay };

  return (
    <>
      {top ? (
        <m.span
          animate={{ scaleX: 1 }}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left bg-portfolio-line"
          initial={reduceMotion ? false : { scaleX: 0 }}
          transition={transition}
        />
      ) : null}
      {left ? (
        <m.span
          animate={{ scaleY: 1 }}
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-px origin-top bg-portfolio-line"
          initial={reduceMotion ? false : { scaleY: 0 }}
          transition={transition}
        />
      ) : null}
      {bottom ? (
        <m.span
          animate={{ scaleX: 1 }}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px origin-left bg-portfolio-line"
          initial={reduceMotion ? false : { scaleX: 0 }}
          transition={transition}
        />
      ) : null}
      {right ? (
        <m.span
          animate={{ scaleY: 1 }}
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-px origin-top bg-portfolio-line"
          initial={reduceMotion ? false : { scaleY: 0 }}
          transition={transition}
        />
      ) : null}
    </>
  );
}
