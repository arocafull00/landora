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

export type PaletteColorScheme = "light" | "dark";

export type PaletteOption = {
  id: string;
  label: string;
  description: string;
  colorScheme: PaletteColorScheme;
};

export const TEMPLATE_PALETTE_OPTIONS: Record<TemplateId, readonly PaletteOption[]> = {
  velar: [
    { id: "default", label: "Original", description: "Verde mineral y arena.", colorScheme: "light" },
    { id: "terracotta", label: "Terracota", description: "Arcilla cálida y crema.", colorScheme: "light" },
    { id: "slate", label: "Pizarra", description: "Azul grisáceo y piedra.", colorScheme: "light" },
  ],
  studio: [
    { id: "default", label: "Original", description: "Bronce suave y marfil.", colorScheme: "light" },
    { id: "smoked-rose", label: "Rosa humo", description: "Rosa profundo y porcelana.", colorScheme: "light" },
    { id: "sage", label: "Salvia", description: "Verde sereno y lino.", colorScheme: "light" },
  ],
  portfolio: [
    { id: "default", label: "Original", description: "Negro tinta y turquesa.", colorScheme: "dark" },
    { id: "lime", label: "Lima", description: "Carbón y verde eléctrico.", colorScheme: "dark" },
    { id: "coral", label: "Coral", description: "Grafito y coral vivo.", colorScheme: "dark" },
    { id: "ivory", label: "Marfil", description: "Marfil cálido y azul cobalto.", colorScheme: "light" },
    { id: "sand", label: "Arena", description: "Arena suave y terracota.", colorScheme: "light" },
    { id: "mist", label: "Niebla", description: "Gris niebla y violeta.", colorScheme: "light" },
    { id: "sky", label: "Cielo", description: "Azul cielo y océano.", colorScheme: "light" },
    { id: "blush", label: "Rubor", description: "Rosa claro y borgoña.", colorScheme: "light" },
  ],
  ristorante: [
    { id: "default", label: "Original", description: "Negro tinta y turquesa.", colorScheme: "dark" },
    { id: "lime", label: "Lima", description: "Carbón y verde eléctrico.", colorScheme: "dark" },
    { id: "coral", label: "Coral", description: "Grafito y coral vivo.", colorScheme: "dark" },
    { id: "ivory", label: "Marfil", description: "Marfil cálido y azul cobalto.", colorScheme: "light" },
    { id: "sand", label: "Arena", description: "Arena suave y terracota.", colorScheme: "light" },
    { id: "mist", label: "Niebla", description: "Gris niebla y violeta.", colorScheme: "light" },
    { id: "sky", label: "Cielo", description: "Azul cielo y océano.", colorScheme: "light" },
    { id: "blush", label: "Rubor", description: "Rosa claro y borgoña.", colorScheme: "light" },
  ],
  floristeria: [
    { id: "default", label: "Original", description: "Verde hoja y blanco cálido.", colorScheme: "light" },
    { id: "clay", label: "Arcilla", description: "Terracota, salvia y crema.", colorScheme: "light" },
    { id: "lavender", label: "Lavanda", description: "Ciruela suave y lavanda.", colorScheme: "light" },
  ],
  "oficio-pro": [
    { id: "default", label: "Original", description: "Azul técnico y ámbar.", colorScheme: "light" },
    { id: "industrial", label: "Industrial", description: "Azul acero y naranja.", colorScheme: "light" },
    { id: "graphite", label: "Grafito", description: "Carbón y amarillo señal.", colorScheme: "light" },
  ],
  "coffee-shop": [
    { id: "default", label: "Original", description: "Café tostado y cobre.", colorScheme: "light" },
    { id: "coffee-green", label: "Verde café", description: "Verde bosque y crema.", colorScheme: "light" },
    { id: "burgundy", label: "Borgoña", description: "Borgoña y rosa tostado.", colorScheme: "light" },
  ],
  signal: [
    { id: "default", label: "Original", description: "Tinta, papel cálido y señal lima.", colorScheme: "light" },
    { id: "graphite", label: "Grafito", description: "Carbón y ámbar técnico.", colorScheme: "light" },
    { id: "noir", label: "Noir", description: "Negro profundo y blanco frío.", colorScheme: "light" },
  ],
  "pallet-ross": [
    { id: "default", label: "Original", description: "Off-white, teal y rojo editorial.", colorScheme: "light" },
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

  return { paletteId, typographyId };
}
