import { AssetImage } from "@/components/ui/asset-image";
import { View } from "lucide-react";
import Link from "next/link";
import type { EditorPageTarget, GalleryItem } from "@/lib/dashboard-data";
import {
  resolveProjectLinkType,
  resolveVirtualTour,
} from "@/lib/portfolio-projects";
import { getPreviewTargetAttributes } from "@/lib/preview-target-attributes";

const hasText = (item: GalleryItem) =>
  !!(item.title || item.description || item.tags?.length);

export function PortfolioProjectCard({
  item,
  index,
  internalHref,
  pageTarget,
}: {
  item: GalleryItem;
  index: number;
  internalHref?: string;
  pageTarget?: EditorPageTarget;
}) {
  const isLarge = index % 3 === 0;
  const showText = hasText(item);
  const linkType = resolveProjectLinkType(item);
  const tour = resolveVirtualTour(item);
  const cardClassName = `group relative aspect-4/5 overflow-hidden rounded-lg bg-[var(--site-surface-alt)] md:aspect-auto md:h-full ${
    isLarge ? "md:col-span-2 md:row-span-2" : ""
  }`;

  const linkOverlay =
    linkType === "internal" && internalHref ? (
      <Link
        aria-label={item.title || "Ver proyecto"}
        className="absolute inset-0 z-10"
        href={internalHref}
        prefetch={pageTarget ? true : undefined}
        {...getPreviewTargetAttributes(pageTarget)}
      />
    ) : linkType === "external" && item.link ? (
      <a
        aria-label={item.title || "Ver proyecto"}
        className="absolute inset-0 z-10"
        href={item.link}
        rel="noopener noreferrer"
        target="_blank"
      />
    ) : null;

  return (
    <div className={cardClassName}>
      {item.image ? (
        <AssetImage
          alt={item.title ?? ""}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={item.image}
        />
      ) : item.video ? (
        <video
          aria-label={item.title || "Project video"}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          src={item.video}
        />
      ) : null}

      {showText ? (
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:transition-none" />
      ) : (
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none" />
      )}

      {showText ? (
        <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-full p-5 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:transition-none md:p-6">
          {item.title ? (
            <h3 className="mb-1 font-bold text-white text-site-title-sm">
              {item.title}
            </h3>
          ) : null}
          {item.description ? (
            <p className="mb-3 text-white/70 line-clamp-2 text-site-content-sm">
              {item.description}
            </p>
          ) : null}
          {item.tags && item.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-2.5 py-0.5 font-bold uppercase tracking-widest text-white/90 backdrop-blur-md text-site-chip"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {linkOverlay}

      {tour ? (
        <a
          className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full bg-portfolio-accent px-4 py-2 font-bold text-portfolio-accent-ink shadow-lg transition-[background-color,transform] duration-300 hover:bg-[var(--portfolio-accent-hover)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 md:bottom-6 md:right-6 text-site-button"
          href={tour.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <View aria-hidden className="size-4" />
          {tour.label}
        </a>
      ) : null}
    </div>
  );
}
