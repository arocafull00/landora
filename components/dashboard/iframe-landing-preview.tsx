"use client";

import type {
  LandingContent,
  LandingSectionSelections,
  EditorPageTarget,
  TemplateId,
} from "@/lib/dashboard-data";
import {
  PreviewToolbar,
  type PreviewDevice,
} from "@/components/dashboard/preview-toolbar";

const MOBILE_WIDTH = 390;
import { useIframePreviewBridge } from "@/components/dashboard/hooks/use-iframe-preview-bridge";
import { cn } from "@/lib/utils";

export function IframeLandingPreview({
  className,
  content,
  device,
  landingId,
  onDeviceChange,
  onFullscreen,
  onPageTargetChange,
  scrollTarget,
  sectionSelections,
  pageTarget = { type: "home" },
  showToolbar = true,
  template = "velar",
}: {
  className?: string;
  content: LandingContent;
  device: PreviewDevice;
  landingId: string;
  onDeviceChange: (device: PreviewDevice) => void;
  onFullscreen?: () => void;
  onPageTargetChange?: (target: EditorPageTarget) => void;
  scrollTarget?: string;
  sectionSelections: LandingSectionSelections;
  pageTarget?: EditorPageTarget;
  showToolbar?: boolean;
  template?: TemplateId;
}) {
  const { iframeRef, initialSrc } = useIframePreviewBridge({
    content,
    landingId,
    onPageTargetChange,
    pageTarget,
    scrollTarget,
    sectionSelections,
    template,
  });

  const frameWidth = device === "mobile" ? MOBILE_WIDTH : "100%";

  return (
    <div id="tutorial-preview" className={cn("flex min-h-0 min-w-0 flex-col", className)}>
      {showToolbar ? (
        <PreviewToolbar
          device={device}
          onDeviceChange={onDeviceChange}
          onFullscreen={onFullscreen}
          scale={1}
        />
      ) : null}
      <div className="flex min-h-0 flex-1 justify-center overflow-hidden bg-surface-bg">
        <div
          className="h-full overflow-hidden rounded-lg border border-outline-variant"
          style={{ maxWidth: "100%", width: frameWidth }}
        >
          <iframe
            className="h-full w-full"
            ref={iframeRef}
            sandbox="allow-scripts allow-same-origin"
            src={initialSrc}
            title="Landing preview"
          />
        </div>
      </div>
    </div>
  );
}
