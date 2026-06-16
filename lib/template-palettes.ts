import type { TemplateId } from "@/lib/dashboard-data";

export type TemplatePalette = {
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  surface: string;
  foreground: string;
};

const TEMPLATE_PALETTES: Record<TemplateId, TemplatePalette> = {
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
    primary: "#6B1A0A",
    secondary: "#140C0A",
    accent: "#C4A574",
    muted: "#F4F2EF",
    surface: "#F4F2EF",
    foreground: "#F4F2EF",
  },
  floristeria: {
    primary: "#2D5016",
    secondary: "#1a1a1a",
    accent: "#234012",
    muted: "#FAFAF7",
    surface: "#FAFAF7",
    foreground: "#ffffff",
  },
  "oficio-pro": {
    primary: "#1F4E79",
    secondary: "#17212B",
    accent: "#F59E0B",
    muted: "#EEF4F8",
    surface: "#FEFCFD",
    foreground: "#ffffff",
  },
  "coffee-shop": {
    primary: "#3B2314",
    secondary: "#1A1410",
    accent: "#B87333",
    muted: "#F7F5F2",
    surface: "#F7F5F2",
    foreground: "#F7F5F2",
  },
};

export function getTemplatePalette(template: TemplateId): TemplatePalette {
  return TEMPLATE_PALETTES[template];
}
