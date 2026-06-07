"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import { getBaseWidth } from "@/components/dashboard/preview-utils";
import type { PreviewDevice } from "@/components/dashboard/preview-toolbar";

export function useScaledPreview({
  baseWidth,
  content,
  device,
  maxScale = 1,
  template,
}: {
  baseWidth: number;
  content: LandingContent;
  device: PreviewDevice;
  maxScale?: number;
  template: TemplateId;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentWidth, setContentWidth] = useState(baseWidth);
  const [contentHeight, setContentHeight] = useState(0);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = Math.max(canvas.scrollWidth, baseWidth);
    const height = canvas.scrollHeight;
    const available = container.clientWidth;

    setContentWidth(width);
    setContentHeight(height);
    setScale(Math.min(available / width, maxScale));
  }, [baseWidth, maxScale]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    measure();

    const containerObserver = new ResizeObserver(() => measure());
    const canvasObserver = new ResizeObserver(() => measure());

    containerObserver.observe(container);
    canvasObserver.observe(canvas);

    return () => {
      containerObserver.disconnect();
      canvasObserver.disconnect();
    };
  }, [baseWidth, measure, content, template, device]);

  useEffect(() => {
    measure();
  }, [baseWidth, measure, content, template, device]);

  const scaledWidth = contentWidth * scale;
  const scaledHeight = contentHeight * scale;

  return {
    canvasRef,
    containerRef,
    contentHeight,
    contentWidth,
    scale,
    scaledHeight,
    scaledWidth,
  };
}

export function usePreviewBaseWidth(device: PreviewDevice) {
  return getBaseWidth(device);
}
