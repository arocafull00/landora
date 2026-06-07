import type { LandingContent, TemplateId } from "@/lib/dashboard-data";

export const PREVIEW_CONTENT_UPDATE = "landora:preview-content-update";

export type PreviewContentMessage = {
  type: typeof PREVIEW_CONTENT_UPDATE;
  content: LandingContent;
  template: TemplateId;
};

export function isPreviewContentMessage(data: unknown): data is PreviewContentMessage {
  if (!data || typeof data !== "object") return false;
  const message = data as PreviewContentMessage;
  if (message.type !== PREVIEW_CONTENT_UPDATE) return false;
  if (!message.content || typeof message.content !== "object") return false;
  if (typeof message.template !== "string") return false;
  return true;
}

export function postPreviewContent(
  target: Window | null | undefined,
  payload: Omit<PreviewContentMessage, "type">
) {
  if (!target) return;
  target.postMessage(
    { type: PREVIEW_CONTENT_UPDATE, ...payload },
    window.location.origin
  );
}
