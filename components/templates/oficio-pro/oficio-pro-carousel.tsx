import type { GalleryItem } from "@/lib/dashboard-data";
import { AssetImage } from "@/components/ui/asset-image";

export function OficioProCarousel({ images }: { images: GalleryItem[] }) {
  if (images.length === 0) return null;

  return (
    <div className="flex aspect-[4/3] w-full snap-x snap-mandatory overflow-x-auto rounded-2xl bg-[var(--site-dark)] shadow-[0_24px_70px_rgba(23,33,43,0.18)] xl:max-w-[56%]">
      {images.map((image, index) => (
        <div className="relative min-w-full snap-center" key={image.id}>
          <AssetImage
            alt={image.title ?? `Servicio técnico ${index + 1}`}
            className="h-full w-full object-cover"
            fill
            sizes="(min-width: 1280px) 56vw, 100vw"
            src={image.image ?? ""}
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      ))}
    </div>
  );
}
