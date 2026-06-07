import type { PreviewDevice } from "@/components/dashboard/preview-toolbar";

export const DESKTOP_WIDTH = 1280;
export const MOBILE_WIDTH = 390;

export function getBaseWidth(device: PreviewDevice) {
  return device === "desktop" ? DESKTOP_WIDTH : MOBILE_WIDTH;
}
