import type { TemplateId } from "@/lib/dashboard-data";

export type TemplatePalette = {
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  surface: string;
  foreground: string;
};

export const TEMPLATE_PALETTES: Record<TemplateId, TemplatePalette> = {
  velar: {
    primary: "#213138",
    secondary: "#171717",
    accent: "#8a8278",
    muted: "#e8e4df",
    surface: "#f5f0ea",
    foreground: "#ffffff",
  },
  studio: {
    primary: "#8b7355",
    secondary: "#1a1a1a",
    accent: "#6b6560",
    muted: "#e5e2dd",
    surface: "#faf9f7",
    foreground: "#ffffff",
  },
  portfolio: {
    primary: "#0a0a0a",
    secondary: "#141414",
    accent: "#2dd4bf",
    muted: "#1f1f1f",
    surface: "#0a0a0a",
    foreground: "#ffffff",
  },
  ristorante: {
    primary: "#8B2500",
    secondary: "#1C1917",
    accent: "#7a1f00",
    muted: "#FAF7F2",
    surface: "#FAF7F2",
    foreground: "#ffffff",
  },
  floristeria: {
    primary: "#2D5016",
    secondary: "#1a1a1a",
    accent: "#234012",
    muted: "#FAFAF7",
    surface: "#FAFAF7",
    foreground: "#ffffff",
  },
};

export function getTemplatePalette(template: TemplateId): TemplatePalette {
  return TEMPLATE_PALETTES[template];
}
