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

function setupIntersectionFallback(root: HTMLElement | null) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("aos-animate");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0, rootMargin: "0px 0px -80px 0px" }
  );

  const scope = root ?? document;
  const elements = scope.querySelectorAll("[data-aos]");
  for (const el of elements) {
    if (!el.classList.contains("aos-animate")) {
      observer.observe(el);
    }
  }

  return observer;
}

export function PortfolioAosInit({
  rootRef,
}: {
  rootRef?: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-quart",
      once: true,
      offset: 80,
      disable: false,
    });

    const refresh = () => AOS.refresh();

    refresh();
    const t1 = window.setTimeout(refresh, 150);
    const t2 = window.setTimeout(refresh, 500);

    const observer = setupIntersectionFallback(rootRef?.current ?? null);

    const scrollTargets = getScrollTargets(rootRef?.current ?? null);
    for (const target of scrollTargets) {
      target.addEventListener("scroll", refresh, { passive: true });
    }
    window.addEventListener("resize", refresh);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      observer.disconnect();
      for (const target of scrollTargets) {
        target.removeEventListener("scroll", refresh);
      }
      window.removeEventListener("resize", refresh);
    };
  }, [rootRef]);

  return null;
}
