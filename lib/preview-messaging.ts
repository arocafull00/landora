import type {
  LandingContent,
  LandingSectionSelections,
  TemplateId,
} from "@/lib/dashboard-data";

export const PREVIEW_CONTENT_UPDATE = "landora:preview-content-update";
export const PREVIEW_CHANNEL_INIT = "landora:preview-channel-init";
export const PREVIEW_CHANNEL_READY = "landora:preview-channel-ready";
const PREVIEW_SCROLL_TO = "landora:preview-scroll-to";
const PREVIEW_HIGHLIGHT_SECTION = "landora:preview-highlight-section";
const PREVIEW_HIGHLIGHT_ELEMENT = "landora:preview-highlight-element";

export type PreviewContentMessage = {
  type: typeof PREVIEW_CONTENT_UPDATE;
  content: LandingContent;
  sectionSelections: LandingSectionSelections;
  template: TemplateId;
};

export type PreviewScrollToMessage = {
  type: typeof PREVIEW_SCROLL_TO;
  sectionId: string;
};

export type PreviewHighlightSectionMessage = {
  type: typeof PREVIEW_HIGHLIGHT_SECTION;
  sectionId: string | null;
  label?: string;
};

export function isPreviewContentMessage(data: unknown): data is PreviewContentMessage {
  if (!data || typeof data !== "object") return false;
  const message = data as PreviewContentMessage;
  if (message.type !== PREVIEW_CONTENT_UPDATE) return false;
  if (!message.content || typeof message.content !== "object") return false;
  if (!message.sectionSelections || typeof message.sectionSelections !== "object") return false;
  if (typeof message.template !== "string") return false;
  return true;
}

export function isPreviewScrollToMessage(data: unknown): data is PreviewScrollToMessage {
  if (!data || typeof data !== "object") return false;
  const message = data as PreviewScrollToMessage;
  if (message.type !== PREVIEW_SCROLL_TO) return false;
  if (typeof message.sectionId !== "string") return false;
  return true;
}

export function isPreviewHighlightSectionMessage(
  data: unknown,
): data is PreviewHighlightSectionMessage {
  if (!data || typeof data !== "object") return false;
  const message = data as PreviewHighlightSectionMessage;
  if (message.type !== PREVIEW_HIGHLIGHT_SECTION) return false;
  if (message.sectionId !== null && typeof message.sectionId !== "string") return false;
  return true;
}

export function postPreviewContent(
  target: MessagePort | null | undefined,
  payload: Omit<PreviewContentMessage, "type">
) {
  if (!target) return;
  target.postMessage({ type: PREVIEW_CONTENT_UPDATE, ...payload });
}

export function postPreviewScrollTo(
  target: MessagePort | null | undefined,
  sectionId: string
) {
  if (!target) return;
  target.postMessage({ type: PREVIEW_SCROLL_TO, sectionId });
}

export type PreviewHighlightElementMessage = {
  type: typeof PREVIEW_HIGHLIGHT_ELEMENT;
  editorId: string | null;
};

export function isPreviewHighlightElementMessage(
  data: unknown,
): data is PreviewHighlightElementMessage {
  if (!data || typeof data !== "object") return false;
  const message = data as PreviewHighlightElementMessage;
  if (message.type !== PREVIEW_HIGHLIGHT_ELEMENT) return false;
  if (message.editorId !== null && typeof message.editorId !== "string") return false;
  return true;
}

export function postPreviewHighlightSection(
  target: MessagePort | null | undefined,
  sectionId: string | null,
  label?: string,
) {
  if (!target) return;
  target.postMessage({ type: PREVIEW_HIGHLIGHT_SECTION, sectionId, label });
}

export function postPreviewHighlightElement(
  target: MessagePort | null | undefined,
  editorId: string | null,
) {
  if (!target) return;
  target.postMessage({ type: PREVIEW_HIGHLIGHT_ELEMENT, editorId });
}
