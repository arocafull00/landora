"use client";

import type { GalleryItem } from "@/lib/dashboard-data";

const hasText = (item: GalleryItem) =>
  !!(item.title || item.description || item.tags?.length);

export function PortfolioProjectCard({
  item,
  index,
}: {
  item: GalleryItem;
  index: number;
}) {
  const isLarge = index % 3 === 0;
  const showText = hasText(item);

  return (
    <div
      className={`group relative overflow-hidden rounded-lg bg-[#1a1a1a] ${
        isLarge ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {item.image ? (
        <img
          alt={item.title ?? ""}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={item.image}
        />
      ) : item.video ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          src={item.video}
        />
      ) : null}

      {showText ? (
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
      ) : (
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}

      {showText && (
        <div className="absolute bottom-0 left-0 w-full p-5 md:p-6">
          {item.title && (
            <h3 className="mb-1 text-lg font-bold text-white md:text-xl">
              {item.title}
            </h3>
          )}
          {item.description && (
            <p className="mb-3 text-sm text-white/70 line-clamp-2">
              {item.description}
            </p>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-white/90 backdrop-blur-md"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
