export const BACKGROUND_IMAGE_OPTIONS = [
  { value: "/backgrounds/lottie/dots.json", label: "Puntos" },
  { value: "/backgrounds/lottie/waves.json", label: "Ondas" },
  { value: "/backgrounds/lottie/waves-2.json", label: "Ondas 2" },
  { value: "/backgrounds/lottie/waves-3.json", label: "Ondas 3" },
  { value: "/backgrounds/lottie/waves-bottom.json", label: "Onda inferior" },
  { value: "/backgrounds/lottie/waves-top.json", label: "Onda top" },
  { value: "/backgrounds/lottie/waves-light.json", label: "Ondas suaves" },
  { value: "/backgrounds/lottie/circle.json", label: "Círculos" },
] as const;

export function isBackgroundPreset(url: string): boolean {
  if (!url) return false;
  return url.startsWith("/backgrounds/lottie/");
}

export function isLottieAsset(url: string, mimeType?: string): boolean {
  if (isBackgroundPreset(url)) return true;
  if (mimeType?.toLowerCase().includes("json")) return true;

  return url.toLowerCase().split(/[?#]/, 1)[0]?.endsWith(".json") ?? false;
}
