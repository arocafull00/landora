"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import { LandingPreview } from "@/components/dashboard/landing-preview";
import {
  PreviewToolbar,
  type PreviewDevice,
} from "@/components/dashboard/preview-toolbar";
import { getBaseWidth } from "@/components/dashboard/preview-utils";

export function PreviewFullscreenOverlay({
  content,
  device,
  onClose,
  onDeviceChange,
  template = "velar",
}: {
  content: LandingContent;
  device: PreviewDevice;
  onClose: () => void;
  onDeviceChange: (device: PreviewDevice) => void;
  template?: TemplateId;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);

  const baseWidth = getBaseWidth(device);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setScale(Math.min(width / baseWidth, 1));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [baseWidth]);

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
    <div className="fixed inset-0 z-50 flex flex-col bg-surface-bg">
      <div className="flex shrink-0 items-center border-b border-outline-variant bg-surface-container-lowest">
        <div className="flex-1">
          <PreviewToolbar
            device={device}
            onDeviceChange={onDeviceChange}
            scale={scale}
            showFullscreen={false}
          />
        </div>
        <button
          aria-label="Close fullscreen preview"
          className="mr-unit-md inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary"
          onClick={onClose}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div
        className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto p-unit-lg"
        ref={containerRef}
      >
        <div className="mx-auto" style={{ height: scaledHeight, width: baseWidth * scale }}>
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
