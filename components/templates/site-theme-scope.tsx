import type { ReactNode } from "react";
import type { LandingAppearance, TemplateId } from "@/lib/dashboard-data";
import {
  resolveLandingAppearance,
  resolvePaletteColorScheme,
} from "@/lib/site-appearance";
import { cn } from "@/lib/utils";

export function SiteThemeScope({
  appearance,
  children,
  className,
  template,
}: {
  appearance: LandingAppearance;
  children: ReactNode;
  className?: string;
  template: TemplateId;
}) {
  const resolved = resolveLandingAppearance(template, appearance);
  const colorScheme = resolvePaletteColorScheme(template, resolved.paletteId);

  return (
    <div
      className={cn("site-theme min-h-full", className)}
      data-color-scheme={colorScheme}
      data-palette={resolved.paletteId}
      data-site-theme=""
      data-template={template}
      data-typography={resolved.typographyId}
    >
      {children}
    </div>
  );
}
