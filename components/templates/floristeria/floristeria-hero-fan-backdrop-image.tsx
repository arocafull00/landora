"use client";

import { AssetImage } from "@/components/ui/asset-image";

const SIZE_CLASSES = {
  sm: "h-[68px] w-[52px] sm:h-[78px] sm:w-[60px] md:h-[88px] md:w-[68px]",
  md: "h-[80px] w-[62px] sm:h-[92px] sm:w-[72px] md:h-[104px] md:w-[82px]",
  lg: "h-[92px] w-[72px] sm:h-[108px] sm:w-[84px] md:h-[120px] md:w-[94px]",
} as const;

export function FloristeriaHeroFanBackdropImage({
  alt,
  bottom,
  className = "",
  left,
  opacity,
  right,
  rotate,
  size = "md",
  src,
  top,
  zIndex = 0,
}: {
  alt: string;
  bottom?: string;
  className?: string;
  left?: string;
  opacity: number;
  right?: string;
  rotate: number;
  size?: "sm" | "md" | "lg";
  src: string;
  top?: string;
  zIndex?: number;
}) {
  return (
    <div
      className={`pointer-events-none absolute origin-center overflow-hidden rounded-2xl ${SIZE_CLASSES[size]} ${className}`}
      style={{
        bottom,
        left,
        opacity,
        right,
        top,
        zIndex,
        transform: `rotate(${rotate}deg)`,
        maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
      }}
    >
      <AssetImage alt={alt} className="object-cover" fill sizes="120px" src={src} />
    </div>
  );
}
