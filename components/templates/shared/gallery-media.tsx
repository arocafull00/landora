import { AssetImage } from "@/components/ui/asset-image";
import type { GalleryItem } from "@/lib/dashboard-data";

export function GalleryMedia({ item }: { item: GalleryItem }) {
  const motionClass =
    "object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100";

  if (item.image) {
    return (
      <AssetImage
        alt={item.title || "Gallery image"}
        className={motionClass}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        src={item.image}
      />
    );
  }

  if (!item.video) return null;

  return (
    <video
      autoPlay
      aria-label={item.title || "Gallery video"}
      className={`h-full w-full ${motionClass}`}
      loop
      muted
      playsInline
      src={item.video}
    />
  );
}
