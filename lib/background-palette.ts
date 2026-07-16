import type { SitePalette } from "@/lib/site-appearance";

const MIN_SURFACE_CONTRAST = 18;

function normalizeHex(hex: string): string {
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

function getVisiblePaletteColors(palette: SitePalette): string[] {
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

  return [...new Set(visible)].toSorted((a, b) => hexLuminance(a) - hexLuminance(b));
}

function getBestContrastColor(palette: SitePalette): string {
  const surfaceLum = hexLuminance(palette.surface);
  const candidates = getVisiblePaletteColors(palette);

  return candidates.reduce((best, color) =>
    contrastWithSurface(color, surfaceLum) > contrastWithSurface(best, surfaceLum) ? color : best
  );
}

export function mapColorsToPalette(
  colors: string[],
  palette: SitePalette
): Map<string, string> {
  const mapping = new Map<string, string>();
  if (colors.length === 0) return mapping;

  const visibleColors = getVisiblePaletteColors(palette);
  const sorted = colors.toSorted((a, b) => hexLuminance(a) - hexLuminance(b));

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
