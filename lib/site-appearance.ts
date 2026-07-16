import type { LandingAppearance, TemplateId } from "@/lib/dashboard-data";

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

export type PaletteOption = {
  id: string;
  label: string;
  description: string;
};

export const TEMPLATE_PALETTE_OPTIONS: Record<TemplateId, readonly PaletteOption[]> = {
  velar: [
    { id: "default", label: "Original", description: "Verde mineral y arena." },
    { id: "terracotta", label: "Terracota", description: "Arcilla cálida y crema." },
    { id: "slate", label: "Pizarra", description: "Azul grisáceo y piedra." },
  ],
  studio: [
    { id: "default", label: "Original", description: "Bronce suave y marfil." },
    { id: "smoked-rose", label: "Rosa humo", description: "Rosa profundo y porcelana." },
    { id: "sage", label: "Salvia", description: "Verde sereno y lino." },
  ],
  portfolio: [
    { id: "default", label: "Original", description: "Negro tinta y turquesa." },
    { id: "lime", label: "Lima", description: "Carbón y verde eléctrico." },
    { id: "coral", label: "Coral", description: "Grafito y coral vivo." },
  ],
  ristorante: [
    { id: "default", label: "Original", description: "Vino, carbón y dorado." },
    { id: "olive", label: "Oliva", description: "Oliva oscuro y pergamino." },
    { id: "midnight", label: "Medianoche", description: "Azul noche y cobre." },
  ],
  floristeria: [
    { id: "default", label: "Original", description: "Verde hoja y blanco cálido." },
    { id: "clay", label: "Arcilla", description: "Terracota, salvia y crema." },
    { id: "lavender", label: "Lavanda", description: "Ciruela suave y lavanda." },
  ],
  "oficio-pro": [
    { id: "default", label: "Original", description: "Azul técnico y ámbar." },
    { id: "industrial", label: "Industrial", description: "Azul acero y naranja." },
    { id: "graphite", label: "Grafito", description: "Carbón y amarillo señal." },
  ],
  "coffee-shop": [
    { id: "default", label: "Original", description: "Café tostado y cobre." },
    { id: "coffee-green", label: "Verde café", description: "Verde bosque y crema." },
    { id: "burgundy", label: "Borgoña", description: "Borgoña y rosa tostado." },
  ],
};

export const DEFAULT_LANDING_APPEARANCE: LandingAppearance = {
  paletteId: "default",
  typographyId: "default",
};

export function isValidTypographyId(value: string): value is TypographyId {
  return TYPOGRAPHY_OPTIONS.some((option) => option.id === value);
}

export function isValidPaletteId(template: TemplateId, value: string) {
  return TEMPLATE_PALETTE_OPTIONS[template].some((option) => option.id === value);
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

  return { paletteId, typographyId };
}
