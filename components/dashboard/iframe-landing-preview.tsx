"use client";

import { useCallback, useEffect, useRef } from "react";
import type {
  LandingContent,
  LandingSectionSelections,
  TemplateId,
} from "@/lib/dashboard-data";
import {
  PreviewToolbar,
  type PreviewDevice,
} from "@/components/dashboard/preview-toolbar";

const MOBILE_WIDTH = 390;
import { addEditorFocusElementListener } from "@/lib/editor-element-focus";
import {
  postPreviewContent,
  postPreviewHighlightElement,
  postPreviewHighlightSection,
  postPreviewScrollTo,
  PREVIEW_CHANNEL_INIT,
  PREVIEW_CHANNEL_READY,
} from "@/lib/preview-messaging";
import { getSectionByAnchor } from "@/lib/template-sections";
import { cn } from "@/lib/utils";

export function IframeLandingPreview({
  className,
  content,
  device,
  landingId,
  onDeviceChange,
  onFullscreen,
  scrollTarget,
  sectionSelections,
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
  sectionSelections: LandingSectionSelections;
  showToolbar?: boolean;
  template?: TemplateId;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const portRef = useRef<MessagePort | null>(null);

  const sendContent = useCallback(() => {
    postPreviewContent(portRef.current, {
      content,
      sectionSelections,
      template,
    });
  }, [content, sectionSelections, template]);

  useEffect(() => {
    sendContent();
  }, [sendContent]);

  useEffect(() => {
    const sendSectionFocus = () => {
      const target = portRef.current;
      if (scrollTarget) {
        postPreviewScrollTo(target, scrollTarget);
      }
      const label = scrollTarget
        ? getSectionByAnchor(template, scrollTarget)?.label
        : undefined;
      postPreviewHighlightSection(target, scrollTarget ?? null, label);
    };

    sendSectionFocus();

    const iframe = iframeRef.current;
    if (!iframe) return;

    iframe.addEventListener("load", sendSectionFocus);
    return () => iframe.removeEventListener("load", sendSectionFocus);
  }, [scrollTarget, template]);

  useEffect(() => {
    return addEditorFocusElementListener((editorId) => {
      postPreviewHighlightElement(portRef.current, editorId);
    });
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const connectChannel = () => {
      const target = iframe.contentWindow;
      if (!target) return;

      portRef.current?.close();
      const channel = new MessageChannel();
      portRef.current = channel.port1;
      channel.port1.onmessage = (event) => {
        if (event.data?.type === PREVIEW_CHANNEL_READY) {
          sendContent();
          if (scrollTarget) {
            postPreviewScrollTo(channel.port1, scrollTarget);
          }
          const label = scrollTarget
            ? getSectionByAnchor(template, scrollTarget)?.label
            : undefined;
          postPreviewHighlightSection(
            channel.port1,
            scrollTarget ?? null,
            label,
          );
        }
      };
      channel.port1.start();
      target.postMessage({ type: PREVIEW_CHANNEL_INIT }, "*", [channel.port2]);
    };

    iframe.addEventListener("load", connectChannel);
    connectChannel();

    return () => {
      iframe.removeEventListener("load", connectChannel);
      portRef.current?.close();
      portRef.current = null;
    };
  }, [scrollTarget, sendContent, template]);

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
            src={`/preview/${landingId}?embed=1`}
            title="Landing preview"
          />
        </div>
      </div>
    </div>
  );
}
