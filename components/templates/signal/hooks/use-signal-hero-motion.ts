"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { useIsMobile } from "@/hooks/use-mobile";

export function useSignalHeroMotion(rootRef: RefObject<HTMLElement | null>) {
  const isMobile = useIsMobile();

  useEffect(() => {
    const hero = rootRef.current?.querySelector<HTMLElement>("[data-signal-scene='hero']");
    if (!hero || isMobile) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const back = hero.querySelector<HTMLElement>("[data-signal-hero-layer='flowers-back']");
      const statue = hero.querySelector<HTMLElement>("[data-signal-hero-layer='statue']");
      const front = hero.querySelector<HTMLElement>("[data-signal-hero-layer='flowers-front']");
      const light = hero.querySelector<HTMLElement>("[data-signal-hero-light]");
      if (!back || !statue || !front || !light) return;

      const ctx = gsap.context(() => {
        gsap.timeline()
          .fromTo(statue, { opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "power2.out" }, 0)
          .fromTo(back, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out" }, 0.2)
          .fromTo(front, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out" }, 0.45)
          .fromTo(hero.querySelectorAll("[data-signal-hero-line]"), { y: 24, opacity: 0, filter: "blur(4px)" }, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.85,
            stagger: 0.14,
            ease: "power3.out",
          }, 0.3)
          .fromTo(hero.querySelectorAll("[data-signal-hero-detail]"), { y: 16, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power2.out",
          }, 0.8);
      }, hero);

      const layers = [
        { element: back, x: gsap.quickTo(back, "x", { duration: 0.9, ease: "power2.out" }), y: gsap.quickTo(back, "y", { duration: 0.9, ease: "power2.out" }), distanceX: 4, distanceY: 3 },
        { element: statue, x: gsap.quickTo(statue, "x", { duration: 0.9, ease: "power2.out" }), y: gsap.quickTo(statue, "y", { duration: 0.9, ease: "power2.out" }), distanceX: 8, distanceY: 5 },
        { element: front, x: gsap.quickTo(front, "x", { duration: 0.9, ease: "power2.out" }), y: gsap.quickTo(front, "y", { duration: 0.9, ease: "power2.out" }), distanceX: -12, distanceY: 9 },
      ];

      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const bounds = hero.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
        const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
        layers.forEach((layer) => {
          layer.x(x * layer.distanceX);
          layer.y(y * layer.distanceY);
        });
        light.style.setProperty("--signal-pointer-x", `${(x + 1) * 50}%`);
        light.style.setProperty("--signal-pointer-y", `${(y + 1) * 50}%`);
      };

      const onPointerLeave = () => {
        layers.forEach((layer) => {
          layer.x(0);
          layer.y(0);
        });
        light.style.removeProperty("--signal-pointer-x");
        light.style.removeProperty("--signal-pointer-y");
      };

      hero.addEventListener("pointermove", onPointerMove, { passive: true });
      hero.addEventListener("pointerleave", onPointerLeave);

      return () => {
        hero.removeEventListener("pointermove", onPointerMove);
        hero.removeEventListener("pointerleave", onPointerLeave);
        layers.forEach((layer) => gsap.killTweensOf(layer.element));
        ctx.revert();
      };
    });

    return () => mm.revert();
  }, [isMobile, rootRef]);
}
