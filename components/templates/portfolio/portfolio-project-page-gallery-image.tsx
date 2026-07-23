import { AssetImage } from "@/components/ui/asset-image";

export function PortfolioProjectPageGalleryImage({
  alt,
  index,
  src,
}: {
  alt: string;
  index: number;
  src: string;
}) {
  return (
    <figure
      className={`relative overflow-hidden rounded-xl bg-portfolio-surface ${
        index % 3 === 0 ? "aspect-[4/3] md:col-span-2" : "aspect-square"
      }`}
    >
      <AssetImage
        alt={`${alt}, imagen ${index + 1}`}
        className="object-cover transition-transform duration-700 hover:scale-[1.02] motion-reduce:transition-none"
        fill
        sizes={
          index % 3 === 0
            ? "(max-width: 768px) 100vw, 80vw"
            : "(max-width: 768px) 100vw, 40vw"
        }
        src={src}
      />
    </figure>
  );
}
