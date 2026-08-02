import { AssetImage } from "@/components/ui/asset-image";
import type { GalleryItem } from "@/lib/dashboard-data";

export function VelarGalleryItem({
  item,
}: {
  item: GalleryItem;
}) {
  return (
    <div
      aria-label={item.title || "Gallery item"}
      className="gallery-expand-item relative h-full min-w-[82vw] snap-center overflow-hidden rounded-xl sm:min-w-[48%] lg:min-w-[32%]"
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
          aria-label={item.title || "Gallery video"}
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
