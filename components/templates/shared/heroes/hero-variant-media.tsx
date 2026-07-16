"use client";

import type { LandingAppearance } from "@/lib/dashboard-data";
import { isLottieAsset } from "@/lib/background-assets";
import { AssetImage } from "@/components/ui/asset-image";
import { ThemedLottieBackground } from "@/components/ui/themed-lottie-background";

export function HeroVariantMedia({
  alt,
  appearance,
  className,
  priority,
  sizes,
  src,
}: {
  alt: string;
  appearance: LandingAppearance;
  className?: string;
  priority?: boolean;
  sizes: string;
  src: string;
}) {
  if (!src) return null;

  if (isLottieAsset(src)) {
    return (
      <ThemedLottieBackground
        className={className}
        src={src}
        themeKey={appearance.paletteId}
      />
    );
  }

  return (
    <AssetImage
      alt={alt}
      className={className}
      fill
      priority={priority}
      sizes={sizes}
      src={src}
    />
  );
}
