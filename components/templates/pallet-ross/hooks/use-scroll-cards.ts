"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function useScrollCards(containerRef: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [currentProgress, setCurrentProgress] = useState(0);
  const [lockProgress, setLockProgress] = useState(0.99);
  const [scrollableHeight, setScrollableHeight] = useState(0);
  const [sectionTwoTop, setSectionTwoTop] = useState(0);
  const [sectionTwoHeight, setSectionTwoHeight] = useState(0);
  const [introDone, setIntroDone] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setCurrentProgress(value);
  });

  const measureLayout = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const sectionTwo = container.querySelector('[data-section="two"]');
    if (!sectionTwo) return;

    const containerRect = container.getBoundingClientRect();
    const containerTop = containerRect.top + window.scrollY;
    const containerScrollHeight = container.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrollable = containerScrollHeight - innerHeight;

    const sectionRect = sectionTwo.getBoundingClientRect();
    const sectionTop = sectionRect.top + window.scrollY;

    setScrollableHeight(scrollable);
    setSectionTwoTop(sectionTop);
    setSectionTwoHeight(sectionRect.height);

    if (scrollable <= 0) {
      setLockProgress(0.99);
      return;
    }

    const lp = clamp((sectionTop - containerTop) / scrollable, 0.05, 0.99);
    setLockProgress(lp);
  }, [containerRef]);

  useEffect(() => {
    measureLayout();
    const timeout = window.setTimeout(measureLayout, 300);
    window.addEventListener("resize", measureLayout);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("resize", measureLayout);
    };
  }, [measureLayout]);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
    measureLayout();
  }, [measureLayout]);

  return {
    scrollYProgress,
    currentProgress,
    lockProgress,
    scrollableHeight,
    sectionTwoTop,
    sectionTwoHeight,
    introDone,
    handleIntroComplete,
    measureLayout,
  };
}
