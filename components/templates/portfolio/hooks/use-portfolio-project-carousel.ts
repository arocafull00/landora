"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePortfolioProjectCarousel(slideCount: number) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const clampedIndex = Math.max(0, Math.min(index, slideCount - 1));
      scroller.scrollTo({
        left: clampedIndex * scroller.clientWidth,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    },
    [slideCount],
  );

  const scrollPrev = useCallback(() => {
    scrollToIndex(activeIndex - 1);
  }, [activeIndex, scrollToIndex]);

  const scrollNext = useCallback(() => {
    scrollToIndex(activeIndex + 1);
  }, [activeIndex, scrollToIndex]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const syncActiveIndex = () => {
      const width = scroller.clientWidth;
      if (width === 0) return;

      const nextIndex = Math.round(scroller.scrollLeft / width);
      setActiveIndex(Math.max(0, Math.min(nextIndex, slideCount - 1)));
    };

    syncActiveIndex();
    scroller.addEventListener("scroll", syncActiveIndex, { passive: true });
    window.addEventListener("resize", syncActiveIndex);

    return () => {
      scroller.removeEventListener("scroll", syncActiveIndex);
      window.removeEventListener("resize", syncActiveIndex);
    };
  }, [slideCount]);

  return {
    activeIndex,
    canScrollNext: activeIndex < slideCount - 1,
    canScrollPrev: activeIndex > 0,
    scrollerRef,
    scrollNext,
    scrollPrev,
    scrollToIndex,
  };
}
