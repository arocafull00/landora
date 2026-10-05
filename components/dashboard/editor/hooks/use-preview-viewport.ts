"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { PreviewDevice } from "@/components/dashboard/preview-toolbar";

export function usePreviewViewport(device: PreviewDevice) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width <= 0 || entry.contentRect.height <= 0) return;
      const { width, height } = entry.contentRect;
      setSize((previous) => previous.width === width && previous.height === height ? previous : { width, height });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  const isMobile = device === "mobile";
  const baseWidth = isMobile ? 390 : 1280;
  const availableWidth = Math.max(1, size.width - 2);
  const scale = size.width > 0 ? Math.min(1, availableWidth / baseWidth) : 1;
  const width = isMobile ? baseWidth : availableWidth / scale;
  const height = size.height > 0 ? Math.max(1, size.height - 2) / scale : 720;
  const offsetX = Math.max(0, (availableWidth - width * scale) / 2);
  return { containerRef, width, height, scale, offsetX };
}
