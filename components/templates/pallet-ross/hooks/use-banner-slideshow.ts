"use client";

import { useCallback, useEffect, useState } from "react";

export function useBannerSlideshow(slideCount: number, intervalMs = 3000) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideCount);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [activeSlide, intervalMs, slideCount]);

  const goToSlide = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goToNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  return { activeSlide, goToSlide, goToPrevious, goToNext };
}
