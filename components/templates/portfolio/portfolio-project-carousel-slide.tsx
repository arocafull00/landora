import { AssetImage } from "@/components/ui/asset-image";

export function PortfolioProjectCarouselSlide({
  alt,
  index,
  src,
}: {
  alt: string;
  index: number;
  src: string;
}) {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-portfolio-surface">
      <AssetImage
        alt={`${alt}, imagen ${index + 1}`}
        className="object-cover"
        fill
        sizes="100vw"
        src={src}
      />
    </div>
  );
}
