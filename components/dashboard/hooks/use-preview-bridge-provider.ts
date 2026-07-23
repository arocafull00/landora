"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type {
  PreviewBridgeContextValue,
  PreviewLiveContent,
  PreviewScrollRequest,
} from "@/components/dashboard/preview-bridge-context";
import type { EditorPageTarget } from "@/lib/dashboard-data";
import {
  isPreviewChannelInitMessage,
  isPreviewContentMessage,
  isPreviewHighlightElementMessage,
  isPreviewHighlightSectionMessage,
  isPreviewNavigateToMessage,
  isPreviewScrollToMessage,
  postPreviewPageChanged,
  postPreviewPageIntent,
  PREVIEW_CHANNEL_READY,
} from "@/lib/preview-messaging";
import {
  getPreviewPageHref,
  isEditablePreviewPageTarget,
  isSameEditorPageTarget,
  resolvePreviewPageTarget,
} from "@/lib/preview-page-target";

export function usePreviewBridgeProvider(
  landingId: string,
): PreviewBridgeContextValue {
  const pathname = usePathname();
  const router = useRouter();
  const [livePreview, setLivePreview] = useState<PreviewLiveContent | null>(
    null,
  );
  const [scrollRequest, setScrollRequest] =
    useState<PreviewScrollRequest | null>(null);
  const [highlightedEditorId, setHighlightedEditorId] = useState<string | null>(
    null,
  );
  const [highlightedSectionId, setHighlightedSectionId] = useState<
    string | null
  >(null);
  const livePreviewRef = useRef<PreviewLiveContent | null>(null);
  const pathnameRef = useRef(pathname);
  const portRef = useRef<MessagePort | null>(null);
  const pendingTargetRef = useRef<EditorPageTarget | null>(null);
  const scrollRequestIdRef = useRef(0);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const reportCurrentPage = useCallback(
    (preview: PreviewLiveContent) => {
      const target = resolvePreviewPageTarget(
        pathnameRef.current,
        landingId,
        preview,
      );
      if (!target) return;

      if (
        pendingTargetRef.current &&
        isSameEditorPageTarget(pendingTargetRef.current, target)
      ) {
        pendingTargetRef.current = null;
      }
      postPreviewPageChanged(portRef.current, target);
    },
    [landingId],
  );

  useEffect(() => {
    let activePort: MessagePort | null = null;

    const connectChannel = (event: MessageEvent) => {
      if (event.source !== window.parent) return;
      if (event.origin !== window.location.origin) return;
      if (!isPreviewChannelInitMessage(event.data)) return;

      const port = event.ports[0];
      if (!port) return;

      activePort?.close();
      activePort = port;
      portRef.current = port;
      port.onmessage = (messageEvent) => {
        const data = messageEvent.data;

        if (isPreviewContentMessage(data)) {
          const nextPreview = {
            content: data.content,
            sectionSelections: data.sectionSelections,
            template: data.template,
          };
          livePreviewRef.current = nextPreview;
          setLivePreview(nextPreview);
          reportCurrentPage(nextPreview);
          return;
        }

        if (isPreviewScrollToMessage(data)) {
          scrollRequestIdRef.current += 1;
          setScrollRequest({
            id: scrollRequestIdRef.current,
            sectionId: data.sectionId,
          });
          return;
        }

        if (isPreviewHighlightSectionMessage(data)) {
          setHighlightedSectionId(data.sectionId);
          return;
        }

        if (isPreviewHighlightElementMessage(data)) {
          setHighlightedEditorId(data.editorId);
          return;
        }

        if (!isPreviewNavigateToMessage(data)) return;
        const preview = livePreviewRef.current;
        if (!preview || !isEditablePreviewPageTarget(data.target, preview)) {
          return;
        }

        const currentTarget = resolvePreviewPageTarget(
          pathnameRef.current,
          landingId,
          preview,
        );
        if (
          (currentTarget &&
            isSameEditorPageTarget(currentTarget, data.target)) ||
          (pendingTargetRef.current &&
            isSameEditorPageTarget(pendingTargetRef.current, data.target))
        ) {
          return;
        }

        pendingTargetRef.current = data.target;
        router.push(getPreviewPageHref(landingId, data.target));
      };
      port.start();
      port.postMessage({ type: PREVIEW_CHANNEL_READY });
    };

    window.addEventListener("message", connectChannel);
    return () => {
      window.removeEventListener("message", connectChannel);
      activePort?.close();
      if (portRef.current === activePort) {
        portRef.current = null;
      }
    };
  }, [landingId, reportCurrentPage, router]);

  useEffect(() => {
    const preview = livePreviewRef.current;
    if (!preview) return;
    reportCurrentPage(preview);
  }, [pathname, reportCurrentPage]);

  const announcePageTarget = useCallback((target: EditorPageTarget) => {
    const preview = livePreviewRef.current;
    if (!preview || !isEditablePreviewPageTarget(target, preview)) return;
    pendingTargetRef.current = target;
    postPreviewPageIntent(portRef.current, target);
  }, []);

  return useMemo(
    () => ({
      announcePageTarget,
      highlightedEditorId,
      highlightedSectionId,
      livePreview,
      scrollRequest,
    }),
    [
      announcePageTarget,
      highlightedEditorId,
      highlightedSectionId,
      livePreview,
      scrollRequest,
    ],
  );
}
