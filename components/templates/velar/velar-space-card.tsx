import { AssetImage } from "@/components/ui/asset-image";
import type { SpaceContent } from "@/lib/dashboard-data";

export function VelarSpaceCard({
  index,
  space,
}: {
  index: number;
  space: SpaceContent;
}) {
  return (
    <div
      className="group relative h-[500px] cursor-pointer overflow-hidden"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <AssetImage
        alt={space.name}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
        src={space.image}
      />
      <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
        <h3
          data-editor-id={`residences:space:${space.id}:name`}
          className="mb-3 font-bold text-site-title-sm"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {space.name}
        </h3>
        <p
          data-editor-id={`residences:space:${space.id}:description`}
          className="mb-4 opacity-90 text-site-content"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {space.description}
        </p>
      </div>
    </div>
  );
}
