"use client";

import { AssetImage } from "@/components/ui/asset-image";

export function FloristeriaHeroFanImage({
  alt,
  priority,
  rotate,
  scale,
  src,
  x,
  y,
  zIndex,
}: {
  alt: string;
  priority?: boolean;
  rotate: number;
  scale: number;
  src: string;
  x: number;
  y: number;
  zIndex: number;
}) {
  return (
    <div
      className="absolute bottom-0 left-1/2 h-[105px] w-[82px] origin-bottom overflow-hidden rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] sm:h-[118px] sm:w-[92px] md:h-[138px] md:w-[108px]"
      style={{
        zIndex,
        transform: `translateX(calc(-50% + ${x * scale}px)) translateY(${y * scale}px) rotate(${rotate}deg)`,
      }}
    >
      <AssetImage
        alt={alt}
        className="object-cover"
        fill
        priority={priority}
        sizes="140px"
        src={src}
      />
    </div>
  );
}
