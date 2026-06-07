"use client";

import { useEffect, type RefObject } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function getScrollTargets(el: HTMLElement | null) {
  const targets: (Window | Element)[] = [window];
  let node = el?.parentElement;

  while (node) {
    const { overflowY, overflow } = getComputedStyle(node);
    if (
      overflowY === "auto" ||
      overflowY === "scroll" ||
      overflow === "auto" ||
      overflow === "scroll"
    ) {
      targets.push(node);
    }
    node = node.parentElement;
  }

  return targets;
}

export function VelarAosInit({
  rootRef,
}: {
  rootRef?: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });

    const refresh = () => AOS.refresh();

    refresh();
    const refreshTimer = window.setTimeout(refresh, 150);

    const scrollTargets = getScrollTargets(rootRef?.current ?? null);
    for (const target of scrollTargets) {
      target.addEventListener("scroll", refresh, { passive: true });
    }
    window.addEventListener("resize", refresh);

    return () => {
      window.clearTimeout(refreshTimer);
      for (const target of scrollTargets) {
        target.removeEventListener("scroll", refresh);
      }
      window.removeEventListener("resize", refresh);
    };
  }, [rootRef]);

  return null;
}
