"use client";

import { AssetImage } from "@/components/ui/asset-image";
import type { GalleryItem } from "@/lib/dashboard-data";

export function VelarGalleryItem({
  item,
  isHovered,
  onHover,
  onLeave,
}: {
  item: GalleryItem;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="gallery-expand-item relative h-full overflow-hidden rounded-xl cursor-pointer"
      style={{
        flex: isHovered ? "4" : "1",
        transition: "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        minWidth: 0,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {item.image ? (
        <AssetImage
          alt=""
          className="object-cover"
          fill
          sizes="(max-width: 700px) 50vw, (max-width: 1200px) 70vw, 800px"
          src={item.image}
        />
      ) : item.video ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          src={item.video}
        />
      ) : null}
    </div>
  );
}
