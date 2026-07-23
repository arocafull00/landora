import { z } from "zod";
import type {
  EditorPageTarget,
  LandingContent,
  LandingSectionSelections,
  TemplateId,
} from "@/lib/dashboard-data";

export const PREVIEW_CONTENT_UPDATE = "landora:preview-content-update";
export const PREVIEW_CHANNEL_INIT = "landora:preview-channel-init";
export const PREVIEW_CHANNEL_READY = "landora:preview-channel-ready";
export const PREVIEW_PAGE_INTENT = "landora:preview-page-intent";
export const PREVIEW_PAGE_CHANGED = "landora:preview-page-changed";
export const PREVIEW_NAVIGATE_TO = "landora:preview-navigate-to";
const PREVIEW_SCROLL_TO = "landora:preview-scroll-to";
const PREVIEW_HIGHLIGHT_SECTION = "landora:preview-highlight-section";
const PREVIEW_HIGHLIGHT_ELEMENT = "landora:preview-highlight-element";

const editorPageTargetSchema = z.discriminatedUnion("type", [
  z.strictObject({ type: z.literal("home") }),
  z.strictObject({ type: z.literal("about") }),
  z.strictObject({
    type: z.literal("project"),
    projectId: z.string().min(1).max(128),
  }),
]);

const previewChannelInitSchema = z.strictObject({
  type: z.literal(PREVIEW_CHANNEL_INIT),
});

const previewChannelReadySchema = z.strictObject({
  type: z.literal(PREVIEW_CHANNEL_READY),
});

const previewPageIntentSchema = z.strictObject({
  type: z.literal(PREVIEW_PAGE_INTENT),
  target: editorPageTargetSchema,
});

const previewPageChangedSchema = z.strictObject({
  type: z.literal(PREVIEW_PAGE_CHANGED),
  target: editorPageTargetSchema,
});

const previewNavigateToSchema = z.strictObject({
  type: z.literal(PREVIEW_NAVIGATE_TO),
  target: editorPageTargetSchema,
});

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

export type PreviewPageIntentMessage = {
  type: typeof PREVIEW_PAGE_INTENT;
  target: EditorPageTarget;
};

export type PreviewPageChangedMessage = {
  type: typeof PREVIEW_PAGE_CHANGED;
  target: EditorPageTarget;
};

export type PreviewNavigateToMessage = {
  type: typeof PREVIEW_NAVIGATE_TO;
  target: EditorPageTarget;
};

export function isPreviewChannelInitMessage(
  data: unknown,
): data is { type: typeof PREVIEW_CHANNEL_INIT } {
  return previewChannelInitSchema.safeParse(data).success;
}

export function isPreviewChannelReadyMessage(
  data: unknown,
): data is { type: typeof PREVIEW_CHANNEL_READY } {
  return previewChannelReadySchema.safeParse(data).success;
}

export function isPreviewPageIntentMessage(
  data: unknown,
): data is PreviewPageIntentMessage {
  return previewPageIntentSchema.safeParse(data).success;
}

export function isPreviewPageChangedMessage(
  data: unknown,
): data is PreviewPageChangedMessage {
  return previewPageChangedSchema.safeParse(data).success;
}

export function isPreviewNavigateToMessage(
  data: unknown,
): data is PreviewNavigateToMessage {
  return previewNavigateToSchema.safeParse(data).success;
}

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

export function postPreviewPageIntent(
  target: MessagePort | null | undefined,
  pageTarget: EditorPageTarget,
) {
  if (!target) return;
  target.postMessage({ type: PREVIEW_PAGE_INTENT, target: pageTarget });
}

export function postPreviewPageChanged(
  target: MessagePort | null | undefined,
  pageTarget: EditorPageTarget,
) {
  if (!target) return;
  target.postMessage({ type: PREVIEW_PAGE_CHANGED, target: pageTarget });
}

export function postPreviewNavigateTo(
  target: MessagePort | null | undefined,
  pageTarget: EditorPageTarget,
) {
  if (!target) return;
  target.postMessage({ type: PREVIEW_NAVIGATE_TO, target: pageTarget });
}
