"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { getScrollTargets } from "@/lib/scroll-parent";
import type { LandingContent } from "@/lib/dashboard-data";

gsap.registerPlugin(ScrollTrigger);

function getPrimaryScroller(root: HTMLElement) {
  const element = getScrollTargets(root).find((target) => target instanceof HTMLElement);
  return element instanceof HTMLElement ? element : null;
}

export function useSignalScroll(
  rootRef: RefObject<HTMLElement | null>,
  { enabled, previewMode, content }: { enabled: boolean; previewMode: boolean; content: LandingContent },
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) return;

    const scenes = Array.from(root.querySelectorAll<HTMLElement>("[data-signal-scene]"));
    const nav = root.querySelectorAll<HTMLElement>("[data-signal-nav-item]");
    const progress = root.querySelector<HTMLElement>("[data-signal-progress-fill]");
    const scrollTargets = getScrollTargets(root);
    let activeFrame = 0;

    const updateActiveScene = () => {
      activeFrame = 0;
      const midpoint = window.innerHeight * 0.55;
      const sceneIndex = Math.max(
        0,
        scenes.findLastIndex((scene) => scene.getBoundingClientRect().top <= midpoint),
      );
      const activeScene = scenes[sceneIndex];
      if (!activeScene) return;
      const sceneId = activeScene.dataset.signalScene ?? "";
      root.dataset.signalActive = sceneId;
      nav.forEach((item) => {
        item.dataset.active = item.dataset.scene === sceneId ? "true" : "false";
      });
      if (progress) {
        progress.style.transform = `scaleX(${(sceneIndex + 1) / scenes.length})`;
      }
    };

    const scheduleActiveUpdate = () => {
      if (!activeFrame) activeFrame = requestAnimationFrame(updateActiveScene);
    };

    scrollTargets.forEach((target) => target.addEventListener("scroll", scheduleActiveUpdate, { passive: true }));
    window.addEventListener("resize", scheduleActiveUpdate);
    scheduleActiveUpdate();

    const mm = gsap.matchMedia();
    mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
      root.dataset.signalMotion = "reduced";
      scheduleActiveUpdate();
    });

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      root.dataset.signalMotion = "cinematic";
      const scroller = getPrimaryScroller(root);
      const scrollerOption = scroller ?? undefined;
      const common = {
        scrub: 0.85,
        invalidateOnRefresh: true,
        ...(scrollerOption ? { scroller: scrollerOption } : {}),
      };
      let lenis: Lenis | null = null;
      let rafId = 0;
      let active = true;

      if (!previewMode && !scroller) {
        lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 });
        lenis.on("scroll", ScrollTrigger.update);
        const raf = (time: number) => {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      }

      const ctx = gsap.context(() => {
        const hero = root.querySelector<HTMLElement>("[data-signal-scene='hero']");
        const capabilities = root.querySelector<HTMLElement>("[data-signal-scene='capacidades']");
        const index = root.querySelector<HTMLElement>("[data-signal-scene='indice']");
        const climax = root.querySelector<HTMLElement>("[data-signal-scene='climax']");
        const cta = root.querySelector<HTMLElement>("[data-signal-scene='cta']");

        if (hero) {
          gsap.to(hero.querySelector("[data-signal-hero-content]"), {
            y: -48,
            opacity: 0,
            stagger: 0.05,
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom center", ...common },
          });
          gsap.to(hero.querySelector("[data-signal-hero-art]"), {
            y: -36,
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom center", ...common },
          });
          gsap.to(hero.querySelector("[data-signal-hero-shade]"), {
            opacity: 0.45,
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom center", ...common },
          });
        }

        if (capabilities) {
          const cards = capabilities.querySelectorAll<HTMLElement>("[data-signal-capability]");
          if (cards.length > 1) {
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: capabilities,
                start: "top top",
                end: () => `+=${cards.length * window.innerHeight * 0.8}`,
                pin: true,
                ...common,
              },
            });
            cards.forEach((card, index) => {
              if (index === 0) return;
              timeline.fromTo(
                card,
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 },
                index - 1,
              );
            });
          }
        }

        if (index) {
          const rows = index.querySelectorAll<HTMLElement>("[data-signal-index-row]");
          gsap.fromTo(rows, { y: 24, opacity: 0.5 }, {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            scrollTrigger: { trigger: index, start: "top 80%", end: "center 30%", ...common },
          });
        }

        if (climax) {
          const type = climax.querySelector<HTMLElement>("[data-signal-climax-type]");
          const brand = climax.querySelector<HTMLElement>("[data-signal-climax-brand]");
          gsap.timeline({
            scrollTrigger: { trigger: climax, start: "top top", end: "+=150%", pin: true, ...common },
          })
            .fromTo(type, { scale: 2.3 }, { scale: 1, duration: 1 }, 0)
            .to(type, { opacity: 0, scale: 0.85, duration: 0.35 }, 1)
            .fromTo(brand, { opacity: 0, scale: 1.35 }, { opacity: 1, scale: 1, duration: 0.4 }, 1.05);
        }

        if (cta) {
          const mark = cta.querySelector<HTMLElement>("[data-signal-cta-mark]");
          gsap.fromTo(mark, { yPercent: 35 }, {
            yPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: cta, start: "top bottom", end: "bottom top", ...common },
          });
        }

        ScrollTrigger.refresh();
      }, root);

      const refresh = () => {
        if (active) ScrollTrigger.refresh();
      };
      const images = root.querySelectorAll("img");
      images.forEach((image) => image.addEventListener("load", refresh));
      void document.fonts.ready.then(refresh);
      scheduleActiveUpdate();

      return () => {
        active = false;
        images.forEach((image) => image.removeEventListener("load", refresh));
        cancelAnimationFrame(rafId);
        lenis?.destroy();
        ctx.revert();
      };
    });

    return () => {
      scrollTargets.forEach((target) => target.removeEventListener("scroll", scheduleActiveUpdate));
      window.removeEventListener("resize", scheduleActiveUpdate);
      cancelAnimationFrame(activeFrame);
      mm.revert();
    };
  }, [enabled, previewMode, rootRef, content]);
}
