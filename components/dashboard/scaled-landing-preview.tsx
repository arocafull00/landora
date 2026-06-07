"use client";

import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import { LandingPreview } from "@/components/dashboard/landing-preview";
import {
  PreviewToolbar,
  type PreviewDevice,
} from "@/components/dashboard/preview-toolbar";
import { MOBILE_WIDTH } from "@/components/dashboard/preview-utils";
import { useScaledPreview } from "@/components/dashboard/use-scaled-preview";
import { useViewportWidth } from "@/components/dashboard/use-viewport-width";
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
    maxScale,
    template,
  });

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
