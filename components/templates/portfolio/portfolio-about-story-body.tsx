"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const COPY = {
  more: "Leer más",
  less: "Leer menos",
} as const;

export function PortfolioAboutStoryBody({ body }: { body: string }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const contentId = useId();
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

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

  return (
    <div className="flex h-full w-full flex-col justify-center gap-5">
      <p
        ref={textRef}
        className={cn(
          "whitespace-pre-line text-pretty text-lg font-light leading-relaxed text-[var(--site-on-dark)]/75 sm:text-xl lg:text-xl",
          !expanded && "line-clamp-[9]",
        )}
        data-editor-id="about-story-body"
        id={contentId}
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {body}
      </p>
      {canExpand ? (
        <button
          type="button"
          className="self-start text-left text-sm font-semibold text-[var(--site-accent)] transition-colors hover:text-[var(--site-accent)]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-dark)]"
          style={{ fontFamily: "var(--font-syne)" }}
          aria-controls={contentId}
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? COPY.less : COPY.more}
        </button>
      ) : null}
    </div>
  );
}
