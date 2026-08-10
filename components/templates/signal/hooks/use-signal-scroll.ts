"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { getScrollTargets } from "@/lib/scroll-parent";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getPrimaryScroller(root: HTMLElement) {
  const targets = getScrollTargets(root);
  const element = targets.find((target) => target instanceof HTMLElement);
  return element instanceof HTMLElement ? element : null;
}

export function useSignalScroll(
  rootRef: RefObject<HTMLElement | null>,
  {
    enabled,
    previewMode,
  }: {
    enabled: boolean;
    previewMode: boolean;
  },
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) return;

    if (prefersReducedMotion()) {
      root.dataset.signalMotion = "reduced";
      return;
    }

    root.dataset.signalMotion = "cinematic";
    const scroller = getPrimaryScroller(root);
    const useWindowScroller = !previewMode && !scroller;
    let lenis: Lenis | null = null;
    let rafId = 0;

    const ctx = gsap.context(() => {
      if (useWindowScroller) {
        lenis = new Lenis({
          duration: 1.05,
          smoothWheel: true,
          wheelMultiplier: 0.9,
        });
        lenis.on("scroll", ScrollTrigger.update);
        const raf = (time: number) => {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
        ScrollTrigger.scrollerProxy(document.body, {
          scrollTop(value) {
            if (typeof value === "number") {
              lenis?.scrollTo(value, { immediate: true });
            }
            return lenis?.scroll ?? window.scrollY;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
        });
      }

      const scrollerOption = useWindowScroller
        ? undefined
        : (scroller ?? undefined);

      const common = {
        scrub: 0.85,
        invalidateOnRefresh: true,
        ...(scrollerOption ? { scroller: scrollerOption } : {}),
      };

      const hero = root.querySelector<HTMLElement>("[data-signal-scene='hero']");
      const portal = root.querySelector<HTMLElement>("[data-signal-scene='portal']");
      const scale = root.querySelector<HTMLElement>("[data-signal-scene='escala']");
      const capabilities = root.querySelector<HTMLElement>(
        "[data-signal-scene='capacidades']",
      );
      const index = root.querySelector<HTMLElement>("[data-signal-scene='indice']");
      const climax = root.querySelector<HTMLElement>("[data-signal-scene='climax']");
      const cta = root.querySelector<HTMLElement>("[data-signal-scene='cta']");
      const progress = root.querySelector<HTMLElement>("[data-signal-progress-fill]");
      const nav = root.querySelectorAll<HTMLElement>("[data-signal-nav-item]");

      if (hero) {
        const rest = hero.querySelector<HTMLElement>("[data-signal-hero-rest]");
        const mark = hero.querySelector<HTMLElement>("[data-signal-hero-mark]");
        const meta = hero.querySelectorAll<HTMLElement>("[data-signal-hero-meta]");
        const cue = hero.querySelector<HTMLElement>("[data-signal-scroll-cue]");
        gsap
          .timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "+=160%",
              pin: true,
              ...common,
            },
          })
          .to(meta, { yPercent: -120, opacity: 0, stagger: 0.04, duration: 0.35 }, 0)
          .to(cue, { opacity: 0, y: -24, duration: 0.25 }, 0)
          .to(rest, { xPercent: -120, opacity: 0, duration: 0.55 }, 0.05)
          .to(
            mark,
            {
              scale: 11,
              xPercent: -8,
              yPercent: 4,
              duration: 1,
              transformOrigin: "45% 55%",
            },
            0.15,
          );
      }

      if (portal) {
        const lines = portal.querySelectorAll<HTMLElement>("[data-signal-portal-line]");
        const plane = portal.querySelectorAll<HTMLElement>("[data-signal-portal-plane]");
        const rule = portal.querySelector<HTMLElement>("[data-signal-portal-rule]");
        gsap.set(lines, { yPercent: 110, opacity: 0 });
        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: portal,
              start: "top top",
              end: "+=140%",
              pin: true,
              ...common,
            },
          })
          .to(plane, { yPercent: (i) => (i % 2 === 0 ? -18 : 22), duration: 1 }, 0)
          .to(lines, { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.45 }, 0.1)
          .to(rule, { scaleX: 1, duration: 0.5 }, 0.55);
      }

      if (scale) {
        const number = scale.querySelector<HTMLElement>("[data-signal-scale-number]");
        const labels = scale.querySelectorAll<HTMLElement>("[data-signal-scale-label]");
        const values = (scale.dataset.signalScaleValues ?? "")
          .split("|")
          .filter(Boolean);
        gsap.set(labels, { opacity: 0, y: 18 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scale,
            start: "top top",
            end: "+=180%",
            pin: true,
            ...common,
          },
        });
        values.forEach((value, index) => {
          tl.to(
            number,
            {
              duration: 0.35,
              onStart: () => {
                if (number) number.textContent = value;
              },
            },
            index * 0.35,
          );
        });
        tl.to(labels, { opacity: 1, y: 0, stagger: 0.06, duration: 0.35 }, 0.2).to(
          number,
          { scale: 1.35, duration: 0.4 },
          "-=0.1",
        );
      }

      if (capabilities) {
        const scenes = capabilities.querySelectorAll<HTMLElement>(
          "[data-signal-capability]",
        );
        ScrollTrigger.create({
          trigger: capabilities,
          start: "top top",
          end: "+=220%",
          pin: true,
          ...common,
        });
        scenes.forEach((scene, index) => {
          if (index === 0) return;
          gsap.fromTo(
            scene,
            { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.4 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: capabilities,
                start: `top+=${index * 28}% top`,
                end: `top+=${(index + 1) * 28}% top`,
                ...common,
              },
            },
          );
        });
      }

      if (index) {
        const rows = index.querySelectorAll<HTMLElement>("[data-signal-index-row]");
        gsap
          .timeline({
            scrollTrigger: {
              trigger: index,
              start: "top top",
              end: "+=160%",
              pin: true,
              ...common,
            },
          })
          .to(rows, {
            color: "var(--site-accent)",
            stagger: 0.12,
            duration: 0.35,
          })
          .to(rows, {
            y: (i, targets) => {
              const total = targets.length;
              return (i - (total - 1) / 2) * -8;
            },
            duration: 0.45,
          });
      }

      if (climax) {
        const type = climax.querySelector<HTMLElement>("[data-signal-climax-type]");
        const brand = climax.querySelector<HTMLElement>("[data-signal-climax-brand]");
        gsap.set(brand, { opacity: 0, scale: 1.35 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: climax,
              start: "top top",
              end: "+=150%",
              pin: true,
              ...common,
            },
          })
          .fromTo(type, { scale: 4.2 }, { scale: 1, duration: 1 }, 0)
          .to(type, { letterSpacing: "-0.04em", duration: 0.35 }, 0.7)
          .to(type, { opacity: 0, scale: 0.85, duration: 0.35 }, 1)
          .to(brand, { opacity: 1, scale: 1, duration: 0.4 }, 1.05);
      }

      if (cta) {
        const mark = cta.querySelector<HTMLElement>("[data-signal-cta-mark]");
        gsap.fromTo(
          mark,
          { yPercent: 35 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: cta,
              start: "top bottom",
              end: "bottom top",
              ...common,
            },
          },
        );
      }

      const sceneOrder = [
        "hero",
        "portal",
        "escala",
        "capacidades",
        "indice",
        "climax",
        "cta",
        "contacto",
      ];

      sceneOrder.forEach((sceneId, sceneIndex) => {
        const scene = root.querySelector<HTMLElement>(
          `[data-signal-scene='${sceneId}']`,
        );
        if (!scene) return;
        ScrollTrigger.create({
          trigger: scene,
          start: "top center",
          end: "bottom center",
          ...common,
          onToggle: (self) => {
            if (!self.isActive) return;
            root.dataset.signalActive = sceneId;
            nav.forEach((item) => {
              item.dataset.active = item.dataset.scene === sceneId ? "true" : "false";
            });
            if (progress) {
              progress.style.transform = `scaleX(${(sceneIndex + 1) / sceneOrder.length})`;
            }
          },
        });
      });

      ScrollTrigger.refresh();
    }, root);

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      ctx.revert();
    };
  }, [enabled, previewMode, rootRef]);
}
