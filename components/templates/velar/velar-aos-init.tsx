"use client";

import { useEffect, type RefObject } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePreviewScrollContainer } from "@/lib/preview-scroll-context";
import { getScrollTargets } from "@/lib/scroll-parent";

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

export function VelarAosInit({
  rootRef,
}: {
  rootRef?: RefObject<HTMLElement | null>;
}) {
  const scrollContainer = usePreviewScrollContainer();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
      disable: false,
    });

    const refresh = () => AOS.refresh();

    refresh();
    const t1 = window.setTimeout(refresh, 150);
    const t2 = window.setTimeout(refresh, 500);

    const observer = setupIntersectionFallback(rootRef?.current ?? null);

    const scrollTargets = getScrollTargets(
      rootRef?.current ?? null,
      scrollContainer
    );
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
  }, [rootRef, scrollContainer]);

  return null;
}
