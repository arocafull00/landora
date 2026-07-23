"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  EditorPageTarget,
  LandingContent,
  LandingSectionSelections,
  TemplateId,
} from "@/lib/dashboard-data";
import { addEditorFocusElementListener } from "@/lib/editor-element-focus";
import {
  isPreviewChannelReadyMessage,
  isPreviewPageChangedMessage,
  isPreviewPageIntentMessage,
  postPreviewContent,
  postPreviewHighlightElement,
  postPreviewHighlightSection,
  postPreviewNavigateTo,
  postPreviewScrollTo,
  PREVIEW_CHANNEL_INIT,
} from "@/lib/preview-messaging";
import {
  getPreviewPageHref,
  isEditablePreviewPageTarget,
  isSameEditorPageTarget,
} from "@/lib/preview-page-target";
import { getSectionByAnchor } from "@/lib/template-sections";

type IframePreviewBridgeParams = {
  content: LandingContent;
  landingId: string;
  onPageTargetChange?: (target: EditorPageTarget) => void;
  pageTarget: EditorPageTarget;
  scrollTarget?: string;
  sectionSelections: LandingSectionSelections;
  template: TemplateId;
};

export function useIframePreviewBridge({
  content,
  landingId,
  onPageTargetChange,
  pageTarget,
  scrollTarget,
  sectionSelections,
  template,
}: IframePreviewBridgeParams) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const portRef = useRef<MessagePort | null>(null);
  const [initialSrc] = useState(
    () => `${getPreviewPageHref(landingId, pageTarget)}?embed=1`,
  );
  const latestRef = useRef({
    content,
    onPageTargetChange,
    pageTarget,
    scrollTarget,
    sectionSelections,
    template,
  });

  useEffect(() => {
    latestRef.current = {
      content,
      onPageTargetChange,
      pageTarget,
      scrollTarget,
      sectionSelections,
      template,
    };
  }, [
    content,
    onPageTargetChange,
    pageTarget,
    scrollTarget,
    sectionSelections,
    template,
  ]);

  const sendContent = useCallback(
    (target: MessagePort | null = portRef.current) => {
      const latest = latestRef.current;
      postPreviewContent(target, {
        content: latest.content,
        sectionSelections: latest.sectionSelections,
        template: latest.template,
      });
    },
    [],
  );

  const sendSectionFocus = useCallback(
    (target: MessagePort | null = portRef.current) => {
      const latest = latestRef.current;
      if (latest.scrollTarget) {
        postPreviewScrollTo(target, latest.scrollTarget);
      }
      const label = latest.scrollTarget
        ? getSectionByAnchor(latest.template, latest.scrollTarget)?.label
        : undefined;
      postPreviewHighlightSection(
        target,
        latest.scrollTarget ?? null,
        label,
      );
    },
    [],
  );

  const sendPageTarget = useCallback(
    (target: MessagePort | null = portRef.current) => {
      postPreviewNavigateTo(target, latestRef.current.pageTarget);
    },
    [],
  );

  useEffect(() => {
    postPreviewContent(portRef.current, {
      content,
      sectionSelections,
      template,
    });
  }, [content, sectionSelections, template]);

  useEffect(() => {
    if (scrollTarget) {
      postPreviewScrollTo(portRef.current, scrollTarget);
    }
    const label = scrollTarget
      ? getSectionByAnchor(template, scrollTarget)?.label
      : undefined;
    postPreviewHighlightSection(portRef.current, scrollTarget ?? null, label);
  }, [scrollTarget, template]);

  useEffect(() => {
    postPreviewNavigateTo(portRef.current, pageTarget);
  }, [pageTarget]);

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
        const data = event.data;

        if (isPreviewChannelReadyMessage(data)) {
          sendContent(channel.port1);
          sendSectionFocus(channel.port1);
          sendPageTarget(channel.port1);
          return;
        }

        if (
          !isPreviewPageIntentMessage(data) &&
          !isPreviewPageChangedMessage(data)
        ) {
          return;
        }

        const latest = latestRef.current;
        if (
          !isEditablePreviewPageTarget(data.target, {
            content: latest.content,
            template: latest.template,
          }) ||
          isSameEditorPageTarget(data.target, latest.pageTarget)
        ) {
          return;
        }
        latest.onPageTargetChange?.(data.target);
      };
      channel.port1.start();
      target.postMessage(
        { type: PREVIEW_CHANNEL_INIT },
        window.location.origin,
        [channel.port2],
      );
    };

    iframe.addEventListener("load", connectChannel);
    connectChannel();

    return () => {
      iframe.removeEventListener("load", connectChannel);
      activePort?.close();
      if (portRef.current === activePort) {
        portRef.current = null;
      }
    };
  }, [landingId, sendContent, sendPageTarget, sendSectionFocus]);

  return { iframeRef, initialSrc };
}
