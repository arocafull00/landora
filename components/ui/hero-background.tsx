"use client";

import type { TemplateId } from "@/lib/dashboard-data";
import { isBackgroundPreset } from "@/lib/background-assets";
import { getTemplatePalette } from "@/lib/template-palettes";
import { ThemedLottieBackground } from "@/components/ui/themed-lottie-background";

export function HeroBackground({
  className,
  src,
  template,
}: {
  className?: string;
  src: string;
  template: TemplateId;
}) {
  if (!src) return null;

  if (isBackgroundPreset(src)) {
    return (
      <ThemedLottieBackground
        className={className}
        palette={getTemplatePalette(template)}
        src={src}
      />
    );
  }

  return (
    <div
      className={["absolute inset-0 bg-cover bg-center bg-no-repeat", className]
        .filter(Boolean)
        .join(" ")}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}
