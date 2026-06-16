"use client";

import { AssetImage } from "@/components/ui/asset-image";

export function FloristeriaHeroFanEdge({
  alt,
  side,
  src,
}: {
  alt: string;
  side: "left" | "right";
  src: string;
}) {
  return (
    <div
      className={`absolute bottom-[-32px] hidden h-[105px] w-[82px] overflow-hidden rounded-2xl opacity-70 lg:block ${
        side === "left" ? "left-[8%] -rotate-[10deg]" : "right-[8%] rotate-[10deg]"
      }`}
      style={{
        maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
      }}
    >
      <AssetImage alt={alt} className="object-cover" fill sizes="120px" src={src} />
    </div>
  );
}
