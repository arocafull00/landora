"use client";

import { createContext } from "react";
import type {
  EditorPageTarget,
  LandingContent,
  LandingSectionSelections,
  TemplateId,
} from "@/lib/dashboard-data";

export type PreviewLiveContent = {
  content: LandingContent;
  sectionSelections: LandingSectionSelections;
  template: TemplateId;
};

export type PreviewScrollRequest = {
  id: number;
  sectionId: string;
};

export type PreviewBridgeContextValue = {
  announcePageTarget: (target: EditorPageTarget) => void;
  highlightedEditorId: string | null;
  highlightedSectionId: string | null;
  livePreview: PreviewLiveContent | null;
  scrollRequest: PreviewScrollRequest | null;
};

export const PreviewBridgeContext =
  createContext<PreviewBridgeContextValue | null>(null);
