"use client";

import { useEffect, useRef, useState } from "react";
import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import { LandingPreview } from "@/components/dashboard/landing-preview";
import {
  PreviewToolbar,
  type PreviewDevice,
} from "@/components/dashboard/preview-toolbar";
import { getBaseWidth } from "@/components/dashboard/preview-utils";
import { cn } from "@/lib/utils";

export function ScaledLandingPreview({
  className,
  content,
  device,
  maxScale = 1,
  onDeviceChange,
  onFullscreen,
  showToolbar = true,
  template = "velar",
}: {
  className?: string;
  content: LandingContent;
  device: PreviewDevice;
  maxScale?: number;
  onDeviceChange: (device: PreviewDevice) => void;
  onFullscreen?: () => void;
  showToolbar?: boolean;
  template?: TemplateId;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);

  const baseWidth = getBaseWidth(device);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setScale(Math.min(width / baseWidth, maxScale));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [baseWidth, maxScale]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(([entry]) => {
      setContentHeight(entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height);
    });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, [content, template, device]);

  const scaledHeight = contentHeight * scale;

  return (
    <div className={cn("flex min-h-0 min-w-0 flex-col", className)}>
      {showToolbar ? (
        <PreviewToolbar
          device={device}
          onDeviceChange={onDeviceChange}
          onFullscreen={onFullscreen}
          scale={scale}
        />
      ) : null}
      <div
        className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-surface-bg"
        ref={containerRef}
      >
        <div style={{ height: scaledHeight }}>
          <div
            className="pointer-events-none"
            ref={canvasRef}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: baseWidth,
            }}
          >
            <LandingPreview content={content} template={template} />
          </div>
        </div>
      </div>
    </div>
  );
}
