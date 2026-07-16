"use client";

import type { LandingAppearance } from "@/lib/dashboard-data";
import { isBackgroundPreset } from "@/lib/background-assets";
import { ThemedLottieBackground } from "@/components/ui/themed-lottie-background";

export function HeroBackground({
  appearance,
  className,
  src,
}: {
  appearance: LandingAppearance;
  className?: string;
  src: string;
}) {
  if (!src) return null;

  if (isBackgroundPreset(src)) {
    return (
      <ThemedLottieBackground
        className={className}
        src={src}
        themeKey={appearance.paletteId}
      />
    );
  }

  return (
    <div
      className={[
        "absolute inset-0 bg-cover bg-no-repeat",
        className ?? "bg-bottom",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}
