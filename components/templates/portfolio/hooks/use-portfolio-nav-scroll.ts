"use client";

import { useEffect, useState, type RefObject } from "react";
import { getScrollTargets } from "@/lib/scroll-parent";

const SCROLL_THRESHOLD = 16;

function getScrollTop(targets: (Window | Element)[]) {
  return Math.max(
    ...targets.map((target) =>
      target === window ? window.scrollY : (target as Element).scrollTop
    )
  );
}

export function usePortfolioNavScroll(navRef: RefObject<HTMLElement | null>) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scrollTargets = getScrollTargets(navRef.current);
    const updateScrolled = () => {
      setScrolled(getScrollTop(scrollTargets) > SCROLL_THRESHOLD);
    };

    updateScrolled();

    for (const target of scrollTargets) {
      target.addEventListener("scroll", updateScrolled, { passive: true });
    }

    return () => {
      for (const target of scrollTargets) {
        target.removeEventListener("scroll", updateScrolled);
      }
    };
  }, [navRef]);

  return scrolled;
}
