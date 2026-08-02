"use client";

import { useEffect, useRef } from "react";
import AOS from "aos";
import { getScrollTargets } from "@/lib/scroll-parent";

function revealVisibleElements(root: HTMLElement) {
  const viewportHeight = window.innerHeight;

  root.querySelectorAll<HTMLElement>("[data-aos]").forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < viewportHeight - 80 && rect.bottom > 0) {
      element.classList.add("aos-animate");
    }
  });
}

function observeAosElements(root: HTMLElement) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("aos-animate");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -80px", threshold: 0 },
  );

  root.querySelectorAll("[data-aos]").forEach((element) => {
    if (!element.classList.contains("aos-animate")) observer.observe(element);
  });

  return observer;
}

export function useTemplateAos() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      root.querySelectorAll("[data-aos]").forEach((element) => {
        element.classList.add("aos-animate");
      });
      return;
    }

    AOS.init({
      disable: false,
      duration: 700,
      easing: "ease-out-quart",
      offset: 80,
      once: true,
    });

    const refresh = () => {
      AOS.refresh();
      revealVisibleElements(root);
    };
    const observer = observeAosElements(root);
    const scrollTargets = getScrollTargets(root);
    const firstRefresh = window.setTimeout(refresh, 150);
    const secondRefresh = window.setTimeout(refresh, 500);

    refresh();
    scrollTargets.forEach((target) => {
      target.addEventListener("scroll", refresh, { passive: true });
    });
    window.addEventListener("resize", refresh);
    window.addEventListener("hashchange", refresh);

    return () => {
      window.clearTimeout(firstRefresh);
      window.clearTimeout(secondRefresh);
      observer.disconnect();
      scrollTargets.forEach((target) => {
        target.removeEventListener("scroll", refresh);
      });
      window.removeEventListener("resize", refresh);
      window.removeEventListener("hashchange", refresh);
    };
  }, []);

  return rootRef;
}
