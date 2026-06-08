import {
  hexToLottieRgb,
  lottieRgbToHex,
  mapColorsToPalette,
} from "@/lib/background-palette";
import type { TemplatePalette } from "@/lib/template-palettes";

type LottieRgb = [number, number, number];

type LottieColorProperty = {
  a?: number;
  k?: number | number[];
};

type LottieShapeItem = {
  ty?: string;
  c?: LottieColorProperty;
  g?: {
    k?: {
      k?: number[];
    };
  };
  it?: LottieShapeItem[];
};

type LottieLayer = {
  shapes?: LottieShapeItem[];
};

type LottieAnimation = {
  layers?: LottieLayer[];
  assets?: Array<{ layers?: LottieLayer[] }>;
};

const lottieCache = new Map<string, LottieAnimation>();

function isStaticColor(
  value: LottieColorProperty | undefined
): value is LottieColorProperty & { k: number[] } {
  if (!value || value.a !== 0) return false;
  if (!Array.isArray(value.k) || value.k.length < 3) return false;
  return typeof value.k[0] === "number";
}

function rgbKey(rgb: LottieRgb): string {
  return lottieRgbToHex(rgb);
}

function collectColorsFromShapes(shapes: LottieShapeItem[] | undefined, found: Set<string>) {
  if (!shapes) return;

  for (const shape of shapes) {
    if (shape.ty === "fl" || shape.ty === "st") {
      if (isStaticColor(shape.c)) {
        found.add(rgbKey([shape.c.k[0], shape.c.k[1], shape.c.k[2]]));
      }
    }

    if (shape.ty === "gs" && shape.g?.k?.k) {
      const stops = shape.g.k.k;
      for (let index = 0; index < stops.length; index += 4) {
        const rgb: LottieRgb = [stops[index + 1], stops[index + 2], stops[index + 3]];
        found.add(rgbKey(rgb));
      }
    }

    if (shape.it) {
      collectColorsFromShapes(shape.it, found);
    }
  }
}

export function extractLottieColors(data: LottieAnimation): string[] {
  const found = new Set<string>();

  for (const layer of data.layers ?? []) {
    collectColorsFromShapes(layer.shapes, found);
  }

  for (const asset of data.assets ?? []) {
    for (const layer of asset.layers ?? []) {
      collectColorsFromShapes(layer.shapes, found);
    }
  }

  return [...found];
}

function applyMappingToRgb(rgb: LottieRgb, mapping: Map<string, string>): LottieRgb {
  const mapped = mapping.get(rgbKey(rgb));
  if (!mapped) return rgb;
  return hexToLottieRgb(mapped);
}

function applyColorsToShapes(shapes: LottieShapeItem[] | undefined, mapping: Map<string, string>) {
  if (!shapes) return;

  for (const shape of shapes) {
    if (shape.ty === "fl" || shape.ty === "st") {
      if (isStaticColor(shape.c)) {
        const mapped = applyMappingToRgb(
          [shape.c.k[0], shape.c.k[1], shape.c.k[2]],
          mapping
        );
        shape.c.k = [mapped[0], mapped[1], mapped[2], shape.c.k[3] ?? 1];
      }
    }

    if (shape.ty === "gs" && shape.g?.k?.k) {
      const stops = shape.g.k.k;
      for (let index = 0; index < stops.length; index += 4) {
        const mapped = applyMappingToRgb(
          [stops[index + 1], stops[index + 2], stops[index + 3]],
          mapping
        );
        stops[index + 1] = mapped[0];
        stops[index + 2] = mapped[1];
        stops[index + 3] = mapped[2];
      }
    }

    if (shape.it) {
      applyColorsToShapes(shape.it, mapping);
    }
  }
}

export function applyPaletteToLottie(
  data: LottieAnimation,
  palette: TemplatePalette
): LottieAnimation {
  const themed = structuredClone(data);
  const colors = extractLottieColors(themed);
  const mapping = mapColorsToPalette(colors, palette);

  for (const layer of themed.layers ?? []) {
    applyColorsToShapes(layer.shapes, mapping);
  }

  for (const asset of themed.assets ?? []) {
    for (const layer of asset.layers ?? []) {
      applyColorsToShapes(layer.shapes, mapping);
    }
  }

  return themed;
}

export async function fetchLottieAnimation(src: string): Promise<LottieAnimation | null> {
  const cached = lottieCache.get(src);
  if (cached) return cached;

  const response = await fetch(src);
  if (!response.ok) return null;

  const data = (await response.json()) as LottieAnimation;
  lottieCache.set(src, data);
  return data;
}

export type { LottieAnimation };
