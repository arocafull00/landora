"use client";

import { useCallback, useEffect, useRef } from "react";
import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import {
  PreviewToolbar,
  type PreviewDevice,
} from "@/components/dashboard/preview-toolbar";
import { MOBILE_WIDTH } from "@/components/dashboard/preview-utils";
import { postPreviewContent, postPreviewScrollTo } from "@/lib/preview-messaging";
import { cn } from "@/lib/utils";

export function IframeLandingPreview({
  className,
  content,
  device,
  landingId,
  onDeviceChange,
  onFullscreen,
  scrollTarget,
  showToolbar = true,
  template = "velar",
}: {
  className?: string;
  content: LandingContent;
  device: PreviewDevice;
  landingId: string;
  onDeviceChange: (device: PreviewDevice) => void;
  onFullscreen?: () => void;
  scrollTarget?: string;
  showToolbar?: boolean;
  template?: TemplateId;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendContent = useCallback(() => {
    postPreviewContent(iframeRef.current?.contentWindow, { content, template });
  }, [content, template]);

  useEffect(() => {
    sendContent();
  }, [sendContent]);

  useEffect(() => {
    if (!scrollTarget) return;

    const scroll = () => postPreviewScrollTo(iframeRef.current?.contentWindow, scrollTarget);
    scroll();

    const iframe = iframeRef.current;
    if (!iframe) return;

    iframe.addEventListener("load", scroll);
    return () => iframe.removeEventListener("load", scroll);
  }, [scrollTarget]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== "landora:preview-content-update:ready") return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      sendContent();
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [sendContent]);

  const frameWidth = device === "mobile" ? MOBILE_WIDTH : "100%";

  return (
    <div className={cn("flex min-h-0 min-w-0 flex-col", className)}>
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
          className="h-full overflow-hidden rounded-lg border border-outline-variant shadow-sm"
          style={{ maxWidth: "100%", width: frameWidth }}
        >
          <iframe
            className="h-full w-full"
            onLoad={sendContent}
            ref={iframeRef}
            src={`/preview/${landingId}?embed=1`}
            title="Landing preview"
          />
        </div>
      </div>
    </div>
  );
}
