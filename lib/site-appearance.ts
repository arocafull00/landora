import { DEFAULT_LANDING_APPEARANCE } from "@/lib/templates/appearance-defaults";
import { getRegisteredTemplates } from "@/lib/template-registry";
import type { PaletteOption } from "@/lib/templates/types";
import type { LandingAppearance, TemplateId, TextSizePreset } from "@/lib/dashboard-data";

export const TYPOGRAPHY_OPTIONS = [
  {
    id: "default",
    label: "Original",
    description: "La combinación diseñada para esta plantilla.",
  },
  {
    id: "editorial",
    label: "Editorial",
    description: "Playfair Display para títulos y Source Sans 3 para textos.",
  },
  {
    id: "contemporary",
    label: "Contemporánea",
    description: "Syne para títulos y DM Sans para textos.",
  },
  {
    id: "artisan",
    label: "Artesanal",
    description: "Fraunces para títulos y DM Sans para textos.",
  },
] as const;

export type TypographyId = (typeof TYPOGRAPHY_OPTIONS)[number]["id"];

export type SitePalette = {
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  surface: string;
  foreground: string;
};

export type PaletteColorScheme = "light" | "dark";

export const TEMPLATE_PALETTE_OPTIONS = Object.fromEntries(
  getRegisteredTemplates().map((template) => [template.id, template.paletteOptions]),
) as Record<TemplateId, readonly PaletteOption[]>;

export const TEXT_SIZE_PRESET_OPTIONS = [
  { id: "xsmall", label: "Muy pequeño" },
  { id: "small", label: "Pequeño" },
  { id: "default", label: "Normal" },
  { id: "large", label: "Grande" },
  { id: "xlarge", label: "Muy grande" },
] as const satisfies ReadonlyArray<{ id: TextSizePreset; label: string }>;

export function isValidTextSizePreset(value: string): value is TextSizePreset {
  return TEXT_SIZE_PRESET_OPTIONS.some((option) => option.id === value);
}

function resolveTextSizePreset(
  value: string | null | undefined,
  fallback: TextSizePreset,
): TextSizePreset {
  if (typeof value === "string" && isValidTextSizePreset(value)) {
    return value;
  }
  return fallback;
}

export function isValidTypographyId(value: string): value is TypographyId {
  return TYPOGRAPHY_OPTIONS.some((option) => option.id === value);
}

export function isValidPaletteId(template: TemplateId, value: string) {
  return TEMPLATE_PALETTE_OPTIONS[template].some((option) => option.id === value);
}

export function resolvePaletteColorScheme(
  template: TemplateId,
  paletteId: string,
): PaletteColorScheme {
  const palette = TEMPLATE_PALETTE_OPTIONS[template].find(
    (option) => option.id === paletteId,
  );
  return palette?.colorScheme ?? "light";
}

export function resolveLandingAppearance(
  template: TemplateId,
  appearance: Partial<LandingAppearance> | null | undefined,
): LandingAppearance {
  const paletteId =
    typeof appearance?.paletteId === "string" &&
    isValidPaletteId(template, appearance.paletteId)
      ? appearance.paletteId
      : DEFAULT_LANDING_APPEARANCE.paletteId;
  const typographyId =
    typeof appearance?.typographyId === "string" &&
    isValidTypographyId(appearance.typographyId)
      ? appearance.typographyId
      : DEFAULT_LANDING_APPEARANCE.typographyId;

  return {
    paletteId,
    typographyId,
    buttonTextSize: resolveTextSizePreset(
      appearance?.buttonTextSize,
      DEFAULT_LANDING_APPEARANCE.buttonTextSize,
    ),
    chipTextSize: resolveTextSizePreset(
      appearance?.chipTextSize,
      DEFAULT_LANDING_APPEARANCE.chipTextSize,
    ),
    titleTextSize: resolveTextSizePreset(
      appearance?.titleTextSize,
      DEFAULT_LANDING_APPEARANCE.titleTextSize,
    ),
    subtitleTextSize: resolveTextSizePreset(
      appearance?.subtitleTextSize,
      DEFAULT_LANDING_APPEARANCE.subtitleTextSize,
    ),
    contentTextSize: resolveTextSizePreset(
      appearance?.contentTextSize,
      DEFAULT_LANDING_APPEARANCE.contentTextSize,
    ),
  };
}
