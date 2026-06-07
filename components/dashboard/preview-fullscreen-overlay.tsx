"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import { LandingPreview } from "@/components/dashboard/landing-preview";
import {
  PreviewToolbar,
  type PreviewDevice,
} from "@/components/dashboard/preview-toolbar";
import { MOBILE_WIDTH } from "@/components/dashboard/preview-utils";
import { useScaledPreview } from "@/components/dashboard/use-scaled-preview";
import { useViewportWidth } from "@/components/dashboard/use-viewport-width";

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
  const viewportWidth = useViewportWidth();
  const baseWidth = device === "mobile" ? MOBILE_WIDTH : viewportWidth;
  const {
    canvasRef,
    containerRef,
    scale,
    scaledHeight,
    scaledWidth,
  } = useScaledPreview({
    baseWidth,
    content,
    device,
    maxScale: 1,
    template,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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
        <div
          className="mx-auto overflow-hidden"
          style={{ height: scaledHeight, width: scaledWidth }}
        >
          <div
            className="pointer-events-none"
            ref={canvasRef}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: baseWidth,
            }}
          >
            <LandingPreview clip={false} content={content} template={template} />
          </div>
        </div>
      </div>
    </div>
  );
}
