import { GalleryMedia } from "@/components/templates/shared/gallery-media";
import type { GalleryItem } from "@/lib/dashboard-data";

export function CinematicGalleryCard({
  index,
  item,
}: {
  index: number;
  item: GalleryItem;
}) {
  return (
    <article
      className="group relative min-h-[440px] overflow-hidden rounded-[1.625rem] bg-[var(--site-surface-alt)] text-left [scroll-snap-align:start] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-on-dark)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--site-dark)] sm:min-h-[520px]"
    >
      <GalleryMedia item={item} />
      <span className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-[var(--site-dark)] via-[var(--site-dark)]/75 to-transparent px-6 pb-7 pt-28 text-[var(--site-on-dark)] sm:px-7 sm:pb-8">
        <strong className="block font-heading font-bold leading-tight text-site-subtitle">
          {item.title || `Momento ${String(index + 1).padStart(2, "0")}`}
        </strong>
        {item.description ? (
          <span className="mt-2 block max-w-md font-body leading-relaxed text-[var(--site-on-dark)]/70 text-site-content">
            {item.description}
          </span>
        ) : null}
      </span>
    </article>
  );
}
