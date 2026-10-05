"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function useNuvoletsMotion(enabled: boolean) {
  const ref = useRef<HTMLSpanElement>(null);
  const mobile = useIsMobile();
  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>(".nuvolets");
    if (!root || !enabled) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("nuvolets-in");
        observer.unobserve(entry.target);
      }
    }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    const images = new Set<HTMLImageElement>();
    const loaded = (event: Event) => (event.target as HTMLImageElement).setAttribute("data-loaded", "true");
    const failed = (event: Event) => (event.target as HTMLImageElement).setAttribute("data-failed", "true");
    const discover = () => {
      for (const el of root.querySelectorAll<HTMLElement>(".nuvolets-reveal:not(.nuvolets-in)")) observer.observe(el);
      for (const img of root.querySelectorAll<HTMLImageElement>(".nuvolets-photo img")) {
        if (images.has(img)) continue;
        images.add(img);
        if (img.complete) img.setAttribute(img.naturalWidth ? "data-loaded" : "data-failed", "true");
        img.addEventListener("load", loaded);
        img.addEventListener("error", failed);
      }
    };
    discover();
    root.dataset.motionReady = "true";
    const changes = new MutationObserver(discover);
    changes.observe(root, { childList: true, subtree: true });
    const hero = root.querySelector<HTMLElement>("[data-nuvolets-hero]");
    let frameId = 0;
    let mx = 0;
    let my = 0;
    const frame = () => {
      frameId = 0;
      const clouds = root.querySelectorAll<HTMLElement>("[data-depth]");
      const photos = root.querySelectorAll<HTMLImageElement>(".nuvolets-parallax img");
      if (reducedMotion.matches) {
        clouds.forEach((cloud) => cloud.style.removeProperty("transform"));
        photos.forEach((img) => img.style.removeProperty("--py"));
        return;
      }
      const height = window.innerHeight;
      if (window.scrollY < height * 1.2) clouds.forEach((cloud) => {
        const depth = Number(cloud.dataset.depth);
        cloud.style.transform = `translate3d(${mx * depth * 40}px,${window.scrollY * depth * .5 + my * depth * 24}px,0)`;
      });
      photos.forEach((img) => {
        const rect = img.parentElement?.getBoundingClientRect();
        if (!rect || rect.bottom < 0 || rect.top > height) return;
        img.style.setProperty("--py", `${((rect.top + rect.height / 2 - height / 2) / height) * -36}px`);
      });
    };
    const request = () => { if (!frameId) frameId = window.requestAnimationFrame(frame); };
    const pointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      mx = event.clientX / document.documentElement.clientWidth - .5;
      my = event.clientY / window.innerHeight - .5;
      request();
    };
    const pointerLeave = () => { mx = 0; my = 0; request(); };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    reducedMotion.addEventListener("change", request);
    if (!mobile) { hero?.addEventListener("pointermove", pointerMove); hero?.addEventListener("pointerleave", pointerLeave); }
    request();
    return () => {
      observer.disconnect();
      changes.disconnect();
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      reducedMotion.removeEventListener("change", request);
      hero?.removeEventListener("pointermove", pointerMove);
      hero?.removeEventListener("pointerleave", pointerLeave);
      for (const img of images) { img.removeEventListener("load", loaded); img.removeEventListener("error", failed); img.style.removeProperty("--py"); }
      root.querySelectorAll<HTMLElement>("[data-depth]").forEach((cloud) => cloud.style.removeProperty("transform"));
      delete root.dataset.motionReady;
    };
  }, [enabled, mobile]);
  return ref;
}
