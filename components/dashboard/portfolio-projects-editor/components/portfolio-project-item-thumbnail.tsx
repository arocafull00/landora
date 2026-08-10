import { AssetImage } from "@/components/ui/asset-image";

export function PortfolioProjectItemThumbnail({
  image,
  index,
  title,
}: {
  image?: string;
  index: number;
  title: string;
}) {
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-variant">
      {image ? (
        <AssetImage
          alt={title}
          className="object-cover"
          fill
          sizes="80px"
          src={image}
        />
      ) : null}
      <span className="absolute left-1 top-1 rounded bg-inverse-surface/60 px-1.5 py-0.5 font-label text-[0.5625rem] font-medium text-inverse-on-surface">
        {indexLabel}
      </span>
    </div>
  );
}
