"use client";

import { useEffect, useRef } from "react";
import AOS from "aos";
import { getScrollTargets } from "@/lib/scroll-parent";

const HERO_ANIMATION_OPTIONS = {
  duration: 900,
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  fill: "both",
} satisfies KeyframeAnimationOptions;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function animateElement(
  element: HTMLElement,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions,
) {
  const animation = element.animate(keyframes, options);
  void animation.finished
    .then(() => animation.cancel())
    .catch(() => undefined);
  return animation;
}

function playHeroAnimation(root: HTMLElement) {
  const animations: Animation[] = [];
  const background = root.querySelector<HTMLElement>("[data-velar-hero-background]");
  const house = root.querySelector<HTMLElement>("[data-velar-house-entry]");
  const revealElements = root.querySelectorAll<HTMLElement>("[data-velar-hero-reveal]");

  if (background) {
    animations.push(
      animateElement(
        background,
        [
          { opacity: 0.65, transform: "scale(1.08)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { ...HERO_ANIMATION_OPTIONS, duration: 1400 },
      ),
    );
  }

  revealElements.forEach((element, index) => {
    animations.push(
      animateElement(
        element,
        [
          { opacity: 0, transform: "translate3d(0, 2.25rem, 0)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)" },
        ],
        { ...HERO_ANIMATION_OPTIONS, delay: 140 + index * 110 },
      ),
    );
  });

  if (house) {
    animations.push(
      animateElement(
        house,
        [
          { opacity: 0, transform: "translate3d(0, 4.5rem, 0) scale(0.96)" },
          { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
        ],
        { ...HERO_ANIMATION_OPTIONS, delay: 500, duration: 1050 },
      ),
    );
  }

  return animations;
}

function setupAosFallback(root: HTMLElement) {
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

function startAos(root: HTMLElement) {
  AOS.init({
    disable: false,
    duration: 800,
    easing: "ease-in-out",
    offset: 100,
    once: true,
  });

  const refresh = () => AOS.refresh();
  refresh();
  const firstRefresh = window.setTimeout(refresh, 150);
  const secondRefresh = window.setTimeout(refresh, 500);
  const observer = setupAosFallback(root);
  const scrollTargets = getScrollTargets(root);

  scrollTargets.forEach((target) => {
    target.addEventListener("scroll", refresh, { passive: true });
  });
  window.addEventListener("resize", refresh);

  return () => {
    window.clearTimeout(firstRefresh);
    window.clearTimeout(secondRefresh);
    observer.disconnect();
    scrollTargets.forEach((target) => {
      target.removeEventListener("scroll", refresh);
    });
    window.removeEventListener("resize", refresh);
  };
}

function getViewport(scrollContainer?: Element) {
  if (!scrollContainer) {
    return {
      bottom: window.innerHeight,
      height: window.innerHeight,
      top: 0,
    };
  }

  const rect = scrollContainer.getBoundingClientRect();
  return { bottom: rect.bottom, height: rect.height, top: rect.top };
}

function updateScrollMotion({
  heroHouse,
  heroShell,
  heroTransition,
  scrollContainer,
}: {
  heroHouse: HTMLElement | null;
  heroShell: HTMLElement | null;
  heroTransition: HTMLElement | null;
  scrollContainer?: Element;
}) {
  const viewport = getViewport(scrollContainer);

  if (heroShell && heroTransition && heroHouse) {
    const viewportHeight = viewport.height;
    const viewportWidth = window.innerWidth;
    const heroRect = heroShell.getBoundingClientRect();
    const transitionRect = heroTransition.getBoundingClientRect();
    const image = heroHouse.querySelector("img");
    const imageHeight = image?.offsetHeight || image?.naturalHeight || 1;
    const baseWidth = viewportWidth < 1024 ? viewportWidth : Math.max(viewportWidth, 1400);
    const triggerPoint = -(heroShell.offsetHeight * 0.3);
    const endPoint = heroRect.top - (transitionRect.bottom - viewport.bottom);
    const denominator = endPoint - triggerPoint;
    const progress = denominator === 0
      ? 0
      : clamp((heroRect.top - triggerPoint) / denominator);
    const firstSmoothstep = progress * progress * (3 - 2 * progress);
    const easedProgress = firstSmoothstep * firstSmoothstep * (3 - 2 * firstSmoothstep);

    heroHouse.style.opacity = progress < 1 ? "1" : "0";
    heroHouse.style.visibility = progress < 1 ? "visible" : "hidden";

    if (progress <= 0) {
      heroHouse.style.removeProperty("bottom");
      heroHouse.style.removeProperty("left");
      heroHouse.style.removeProperty("top");
      heroHouse.style.removeProperty("transform");
      heroHouse.style.removeProperty("transform-origin");
    } else {
      const startX = (viewportWidth - baseWidth) / 2;
      const startY = viewportHeight - imageHeight;
      const finalScale = 1.45;
      const finalX = (viewportWidth - baseWidth * finalScale) / 2;
      const mobileOffset = viewportWidth < 1024 ? -250 : 4;
      const finalY = transitionRect.bottom - imageHeight * finalScale + 500 + mobileOffset;
      const currentX = startX + (finalX - startX) * easedProgress;
      const currentY = startY + (finalY - startY) * easedProgress;
      const currentScale = 1 + (finalScale - 1) * easedProgress;

      heroHouse.style.bottom = "auto";
      heroHouse.style.left = "0";
      heroHouse.style.top = "0";
      heroHouse.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
      heroHouse.style.transformOrigin = "top left";
    }
  }

}

function startScrollMotion(root: HTMLElement) {
  const scrollTargets = getScrollTargets(root);
  const scrollContainer = scrollTargets.find(
    (target): target is Element => target !== window,
  );
  const motionElements = {
    heroHouse: root.querySelector<HTMLElement>("[data-velar-hero-house]"),
    heroShell: root.querySelector<HTMLElement>("[data-velar-hero-shell]"),
    heroTransition: root.querySelector<HTMLElement>("[data-velar-hero-transition]"),
    scrollContainer,
  };
  let frameId = 0;

  const requestUpdate = () => {
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(() => updateScrollMotion(motionElements));
  };

  scrollTargets.forEach((target) => {
    target.addEventListener("scroll", requestUpdate, { passive: true });
  });
  window.addEventListener("resize", requestUpdate, { passive: true });
  motionElements.heroHouse?.querySelector("img")?.addEventListener("load", requestUpdate);
  requestUpdate();

  return () => {
    cancelAnimationFrame(frameId);
    scrollTargets.forEach((target) => {
      target.removeEventListener("scroll", requestUpdate);
    });
    window.removeEventListener("resize", requestUpdate);
    motionElements.heroHouse?.querySelector("img")?.removeEventListener("load", requestUpdate);
  };
}

function clearScrollMotion(root: HTMLElement) {
  root
    .querySelectorAll<HTMLElement>(
      "[data-velar-hero-house]",
    )
    .forEach((element) => {
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
      element.style.removeProperty("visibility");
      element.style.removeProperty("bottom");
      element.style.removeProperty("left");
      element.style.removeProperty("top");
      element.style.removeProperty("transform-origin");
    });
}

export function useVelarMotion() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const heroAnimations = reducedMotion.matches ? [] : playHeroAnimation(root);
    const stopAos = reducedMotion.matches
      ? () => undefined
      : startAos(root);
    if (reducedMotion.matches) {
      root.querySelectorAll("[data-aos]").forEach((element) => {
        element.classList.add("aos-animate");
      });
    }
    const stopScrollMotion = startScrollMotion(root);

    return () => {
      heroAnimations.forEach((animation) => animation.cancel());
      stopAos();
      stopScrollMotion();
      clearScrollMotion(root);
    };
  }, []);

  return rootRef;
}
