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
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-portfolio-surface md:aspect-[21/9]">
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
