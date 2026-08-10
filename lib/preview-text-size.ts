import type { LandingAppearance, TextSizePreset } from "@/lib/dashboard-data";

const PREVIEW_TEXT_SIZE_EVENT = "landora:preview-text-size";

export type PreviewTextSizeProperty = keyof Pick<
  LandingAppearance,
  | "buttonTextSize"
  | "chipTextSize"
  | "contentTextSize"
  | "subtitleTextSize"
  | "titleTextSize"
>;

type PreviewTextSizeDetail = {
  landingId: string;
  property: PreviewTextSizeProperty;
  value: TextSizePreset;
};

export function dispatchPreviewTextSize(detail: PreviewTextSizeDetail) {
  window.dispatchEvent(
    new CustomEvent(PREVIEW_TEXT_SIZE_EVENT, { detail }),
  );
}

export function addPreviewTextSizeListener(
  handler: (detail: PreviewTextSizeDetail) => void,
): () => void {
  const listener = (event: Event) => {
    handler((event as CustomEvent<PreviewTextSizeDetail>).detail);
  };
  window.addEventListener(PREVIEW_TEXT_SIZE_EVENT, listener);
  return () => window.removeEventListener(PREVIEW_TEXT_SIZE_EVENT, listener);
}
