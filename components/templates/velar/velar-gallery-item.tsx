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
      className="gallery-expand-item group relative h-full min-w-[82vw] snap-center overflow-hidden rounded-xl sm:min-w-[48%] lg:min-w-0 lg:flex-1 lg:transition-[flex-grow] lg:duration-500 lg:ease-out lg:hover:flex-[1.8] motion-reduce:transition-none"
    >
      {item.image ? (
        <AssetImage
          alt=""
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
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
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
          src={item.video}
        />
      ) : null}
    </div>
  );
}
