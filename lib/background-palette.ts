import type { TemplatePalette } from "@/lib/template-palettes";

const MIN_SURFACE_CONTRAST = 18;

export function normalizeHex(hex: string): string {
  const value = hex.toLowerCase();
  if (value.length === 4) {
    return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
  }
  return value;
}

export function hexLuminance(hex: string): number {
  const normalized = normalizeHex(hex).slice(1);
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastWithSurface(color: string, surfaceLum: number): number {
  return Math.abs(hexLuminance(color) - surfaceLum);
}

export function getVisiblePaletteColors(palette: TemplatePalette): string[] {
  const surfaceLum = hexLuminance(palette.surface);
  const candidates = [
    palette.accent,
    palette.foreground,
    palette.primary,
    palette.secondary,
    palette.muted,
  ];

  const visible = candidates.filter(
    (color) => contrastWithSurface(color, surfaceLum) >= MIN_SURFACE_CONTRAST
  );

  if (visible.length === 0) {
    return [palette.accent, palette.foreground];
  }

  return [...new Set(visible)].sort((a, b) => hexLuminance(a) - hexLuminance(b));
}

export function getBestContrastColor(palette: TemplatePalette): string {
  const surfaceLum = hexLuminance(palette.surface);
  const candidates = getVisiblePaletteColors(palette);

  return [...candidates].sort(
    (a, b) => contrastWithSurface(b, surfaceLum) - contrastWithSurface(a, surfaceLum)
  )[0];
}

export function mapColorsToPalette(
  colors: string[],
  palette: TemplatePalette
): Map<string, string> {
  const mapping = new Map<string, string>();
  if (colors.length === 0) return mapping;

  const visibleColors = getVisiblePaletteColors(palette);
  const sorted = [...colors].sort((a, b) => hexLuminance(a) - hexLuminance(b));

  if (sorted.length === 1) {
    mapping.set(sorted[0], getBestContrastColor(palette));
    return mapping;
  }

  sorted.forEach((color, index) => {
    const slotIndex = Math.round((index / (sorted.length - 1)) * (visibleColors.length - 1));
    mapping.set(color, visibleColors[slotIndex]);
  });

  return mapping;
}

export function hexToLottieRgb(hex: string): [number, number, number] {
  const normalized = normalizeHex(hex).slice(1);
  return [
    parseInt(normalized.slice(0, 2), 16) / 255,
    parseInt(normalized.slice(2, 4), 16) / 255,
    parseInt(normalized.slice(4, 6), 16) / 255,
  ];
}

export function lottieRgbToHex(rgb: [number, number, number]): string {
  const toHex = (value: number) =>
    Math.round(Math.min(1, Math.max(0, value)) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(rgb[0])}${toHex(rgb[1])}${toHex(rgb[2])}`;
}
