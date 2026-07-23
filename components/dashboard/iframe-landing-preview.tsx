"use client";

import { useCallback, useEffect, useRef } from "react";
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
  scrollTarget?: string;
  sectionSelections: LandingSectionSelections;
  pageTarget?: EditorPageTarget;
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
    let activePort: MessagePort | null = null;

    const connectChannel = () => {
      const target = iframe.contentWindow;
      if (!target) return;

      activePort?.close();
      const channel = new MessageChannel();
      activePort = channel.port1;
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
      activePort?.close();
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
            src={
              pageTarget.type === "about"
                ? `/preview/${landingId}/about?embed=1`
                : pageTarget.type === "project"
                  ? `/preview/${landingId}/proyectos/${encodeURIComponent(
                      pageTarget.projectId,
                    )}?embed=1`
                  : `/preview/${landingId}?embed=1`
            }
            title="Landing preview"
          />
        </div>
      </div>
    </div>
  );
}
