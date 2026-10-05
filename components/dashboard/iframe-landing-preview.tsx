"use client";

import { useAuth } from "@clerk/nextjs";
import type { LandingContent, LandingSectionSelections, EditorPageTarget, TemplateId } from "@/lib/dashboard-data";
import { PreviewToolbar, type PreviewDevice } from "@/components/dashboard/preview-toolbar";
import { useIframePreviewBridge } from "@/components/dashboard/hooks/use-iframe-preview-bridge";
import { usePreviewViewport } from "./editor/hooks/use-preview-viewport";
import { cn } from "@/lib/utils";

export function IframeLandingPreview({ className, content, device, landingId, onDeviceChange, onFullscreen, onPageTargetChange, scrollTarget, sectionSelections, pageTarget = { type: "home" }, showToolbar = true, template = "velar" }: {
  className?: string; content: LandingContent; device: PreviewDevice; landingId: string;
  onDeviceChange: (device: PreviewDevice) => void; onFullscreen?: () => void;
  onPageTargetChange?: (target: EditorPageTarget) => void; scrollTarget?: string;
  sectionSelections: LandingSectionSelections; pageTarget?: EditorPageTarget; showToolbar?: boolean; template?: TemplateId;
}) {
  const { isLoaded, isSignedIn } = useAuth();
  const previewReady = isLoaded && isSignedIn;
  const { iframeRef, previewSrc } = useIframePreviewBridge({ content, enabled: previewReady, landingId, onPageTargetChange, pageTarget, scrollTarget, sectionSelections, template });
  const { containerRef, width, height, scale, offsetX } = usePreviewViewport(device);
  return <div id="tutorial-preview" className={cn("flex min-h-0 min-w-0 flex-col", className)}>
    {showToolbar ? <PreviewToolbar device={device} onDeviceChange={onDeviceChange} onFullscreen={onFullscreen} scale={scale} /> : null}
    <div ref={containerRef} className="relative min-h-0 flex-1 overflow-hidden">
      <div className="relative size-full overflow-hidden rounded-xl border border-border bg-surface">
        {previewReady ? <iframe className="absolute top-0 origin-top-left border-0" key={previewSrc} ref={iframeRef} sandbox="allow-scripts allow-same-origin" src={previewSrc} title="Vista previa del sitio" style={{ left: offsetX, width, height, transform: `scale(${scale})` }} /> : <div className="h-full w-full animate-pulse bg-muted motion-reduce:animate-none" />}
      </div>
    </div>
  </div>;
}
