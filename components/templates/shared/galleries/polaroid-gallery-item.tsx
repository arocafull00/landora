import { GalleryMedia } from "@/components/templates/shared/gallery-media";
import type { GalleryItem } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export function PolaroidGalleryItem({
  index,
  item,
  positionClass,
}: {
  index: number;
  item: GalleryItem;
  positionClass: string;
}) {
  return (
    <article
      className={cn(
        "group relative z-10 w-full bg-[var(--site-surface-raised)] p-3 pb-14 text-left shadow-[0_24px_55px_color-mix(in_srgb,var(--site-dark)_18%,transparent)] transition-transform duration-300 hover:z-30 hover:-translate-y-3 hover:rotate-0 focus-visible:z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-primary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--site-surface-muted)] motion-reduce:transform-none motion-reduce:transition-none md:w-auto lg:absolute lg:w-[28%] xl:w-[300px]",
        positionClass,
      )}
    >
      <span className="relative block aspect-[4/3] overflow-hidden bg-[var(--site-surface-alt)]">
        <GalleryMedia item={item} />
      </span>
      <span className="absolute inset-x-5 bottom-4 truncate font-mono text-xs text-[var(--site-text-muted)] sm:text-sm">
        {item.title || `Momento ${String(index + 1).padStart(2, "0")}`}
      </span>
    </article>
  );
}
