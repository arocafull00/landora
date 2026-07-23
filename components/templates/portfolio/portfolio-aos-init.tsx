"use client";

import { useEffect, type RefObject } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { getScrollTargets } from "@/lib/scroll-parent";

function revealVisibleAosElements(scope: ParentNode) {
  const elements = scope.querySelectorAll<HTMLElement>("[data-aos]");
  for (const el of elements) {
    if (el.classList.contains("aos-animate")) continue;
    const rect = el.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) continue;
    el.classList.add("aos-animate");
  }
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

    const scope = rootRef?.current ?? document;
    const refresh = () => {
      AOS.refresh();
      revealVisibleAosElements(scope);
    };

    refresh();
    const t1 = window.setTimeout(refresh, 150);
    const t2 = window.setTimeout(refresh, 500);

    const observer = setupIntersectionFallback(rootRef?.current ?? null);

    const scrollTargets = getScrollTargets(rootRef?.current ?? null, null);
    for (const target of scrollTargets) {
      target.addEventListener("scroll", refresh, { passive: true });
    }
    window.addEventListener("resize", refresh);
    window.addEventListener("hashchange", refresh);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      observer.disconnect();
      for (const target of scrollTargets) {
        target.removeEventListener("scroll", refresh);
      }
      window.removeEventListener("resize", refresh);
      window.removeEventListener("hashchange", refresh);
    };
  }, [rootRef]);

  return null;
}
