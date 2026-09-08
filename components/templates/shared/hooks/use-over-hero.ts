"use client";

import { useEffect, useState } from "react";
import { getScrollTargets } from "@/lib/scroll-parent";

const HERO_ID = "hero";
const NAV_SELECTOR = 'nav[aria-label="Principal"]';

export function useOverHero(topOffset: number) {
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById(HERO_ID);
    if (!hero) {
      return;
    }

    const update = () => {
      const nav = document.querySelector<HTMLElement>(NAV_SELECTOR);
      const threshold = nav?.getBoundingClientRect().bottom ?? topOffset;
      setOverHero(hero.getBoundingClientRect().bottom > threshold);
    };

    const targets = getScrollTargets(hero);
    const frame = window.requestAnimationFrame(update);

    for (const target of targets) {
      target.addEventListener("scroll", update, { passive: true });
    }
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", update);

    return () => {
      window.cancelAnimationFrame(frame);
      for (const target of targets) {
        target.removeEventListener("scroll", update);
      }
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
    };
  }, [topOffset]);

  return overHero;
}
