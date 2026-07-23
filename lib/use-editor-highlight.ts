"use client";

import { usePreviewBridge } from "@/components/dashboard/hooks/use-preview-bridge";

export function useEditorHighlight(sectionId: string) {
  const previewBridge = usePreviewBridge();
  return previewBridge?.highlightedSectionId === sectionId;
}
