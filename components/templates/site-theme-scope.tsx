import type { CSSProperties, ReactNode } from "react";
import type { LandingAppearance, TemplateId } from "@/lib/dashboard-data";
import {
  resolveLandingAppearance,
  resolvePaletteColorScheme,
} from "@/lib/site-appearance";
import { cn } from "@/lib/utils";
import { siteFontVariables } from "@/lib/site-fonts";

export function SiteThemeScope({
  appearance,
  children,
  className,
  template,
  style,
}: {
  appearance: LandingAppearance;
  children: ReactNode;
  className?: string;
  template: TemplateId;
  style?: CSSProperties;
}) {
  const resolved = resolveLandingAppearance(template, appearance);
  const colorScheme = resolvePaletteColorScheme(template, resolved.paletteId);

  return (
    <div
      className={cn(siteFontVariables, "site-theme min-h-full", className)}
      data-button-text-size={resolved.buttonTextSize}
      data-chip-text-size={resolved.chipTextSize}
      data-color-scheme={colorScheme}
      data-content-text-size={resolved.contentTextSize}
      data-palette={resolved.paletteId}
      data-site-theme=""
      data-subtitle-text-size={resolved.subtitleTextSize}
      data-template={template}
      data-title-text-size={resolved.titleTextSize}
      data-typography={resolved.typographyId}
      style={style}
    >
      {children}
    </div>
  );
}
