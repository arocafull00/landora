"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, m, useAnimationControls, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const COPY = {
  more: "Leer más",
  less: "Leer menos",
} as const;

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function PortfolioAboutStoryBody({ body }: { body: string }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const contentId = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const textControls = useAnimationControls();
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const measure = () => {
      if (expanded) return;
      setCanExpand(el.scrollHeight > el.clientHeight + 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [body, expanded]);

  const handleToggle = async () => {
    if (isAnimating) return;

    if (reduceMotion) {
      setExpanded((value) => !value);
      return;
    }

    setIsAnimating(true);
    await textControls.start({
      opacity: 0.45,
      y: 6,
      transition: { duration: 0.14, ease: EASE_OUT_EXPO },
    });
    setExpanded((value) => !value);
    await textControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.38, ease: EASE_OUT_EXPO },
    });
    setIsAnimating(false);
  };

  return (
    <div className="flex h-full w-full flex-col justify-center gap-5">
      <div className="relative">
        <m.p
          ref={textRef}
          animate={textControls}
          className={cn(
            "whitespace-pre-line text-pretty text-lg font-light leading-relaxed text-[var(--site-on-dark)]/75 sm:text-xl lg:text-xl",
            !expanded && "line-clamp-[9]",
          )}
          data-editor-id="about-story-body"
          id={contentId}
          initial={false}
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {body}
        </m.p>
        <AnimatePresence>
          {!expanded && canExpand ? (
            <m.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[var(--site-dark)] to-transparent"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
            />
          ) : null}
        </AnimatePresence>
      </div>
      {canExpand ? (
        <button
          type="button"
          className="inline-flex items-center gap-1.5 self-start text-left text-sm font-semibold text-[var(--site-accent)] transition-colors hover:text-[var(--site-accent)]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-dark)]"
          style={{ fontFamily: "var(--font-syne)" }}
          aria-controls={contentId}
          aria-expanded={expanded}
          disabled={isAnimating}
          onClick={() => {
            void handleToggle();
          }}
        >
          <span className="relative inline-grid overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              <m.span
                key={expanded ? "less" : "more"}
                className="col-start-1 row-start-1"
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
              >
                {expanded ? COPY.less : COPY.more}
              </m.span>
            </AnimatePresence>
          </span>
          <m.span
            aria-hidden
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.28, ease: EASE_OUT_EXPO }
            }
            className="inline-flex"
          >
            <ChevronDown className="size-4" />
          </m.span>
        </button>
      ) : null}
    </div>
  );
}
