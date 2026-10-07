"use client";

import { useEffect, useRef } from "react";

export function useRistoranteMotion(topOffset: number) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = root.querySelector<HTMLElement>(".ristorante-nav");
    const hero = root.querySelector<HTMLElement>("#inicio");
    const pizza = root.querySelector<HTMLElement>(".ristorante-cursor");
    const parallax = root.querySelectorAll<HTMLElement>("[data-parallax]");
    let frame = 0;

    const updateScroll = () => {
      if (nav) nav.dataset.scrolled = String(window.scrollY > 20);
      const viewportHeight = document.documentElement.clientHeight;
      parallax.forEach((element) => {
        if (reducedMotion.matches) {
          element.style.translate = "";
          return;
        }
        const rect = element.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - viewportHeight / 2;
        element.style.translate = `0 ${center / viewportHeight * Number(element.dataset.parallax)}px`;
      });
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateScroll);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!hero || !pizza || event.pointerType !== "mouse" || reducedMotion.matches) return;
      const rect = hero.getBoundingClientRect();
      pizza.style.transform = `translate(${((event.clientX - rect.left) / rect.width - .5) * 12}px, ${((event.clientY - rect.top) / rect.height - .5) * 10}px)`;
    };
    const resetPointer = () => {
      if (pizza) pizza.style.transform = "";
    };
    const onMotionChange = () => {
      resetPointer();
      onScroll();
    };
    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (!anchor) return;
      const target = root.querySelector<HTMLElement>(`[id="${CSS.escape(anchor.hash.slice(1))}"]`);
      if (!target) return;
      event.preventDefault();
      window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - topOffset - 76, behavior: reducedMotion.matches ? "instant" : "smooth" });
      if (anchor.classList.contains("ristorante-skip")) target.focus({ preventScroll: true });
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.visible = "true";
        observer.unobserve(entry.target);
      });
    }, { threshold: .14 });
    root.querySelectorAll(".ristorante-reveal").forEach((element) => observer.observe(element));
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    reducedMotion.addEventListener("change", onMotionChange);
    hero?.addEventListener("pointermove", onPointerMove, { passive: true });
    hero?.addEventListener("pointerleave", resetPointer);
    root.addEventListener("click", onAnchorClick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reducedMotion.removeEventListener("change", onMotionChange);
      hero?.removeEventListener("pointermove", onPointerMove);
      hero?.removeEventListener("pointerleave", resetPointer);
      root.removeEventListener("click", onAnchorClick);
    };
  }, [topOffset]);

  return rootRef;
}
