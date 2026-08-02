import { FLORISTERIA_ASSETS, FLORISTERIA_HERO_FAN_EDGES } from "@/lib/floristeria-assets";
import { FloristeriaHeroFanEdge } from "@/components/templates/floristeria/floristeria-hero-fan-edge";
import { FloristeriaHeroFanImage } from "@/components/templates/floristeria/floristeria-hero-fan-image";

const FAN_LAYOUT = [
  { alt: "Ramo de rosas", x: -280, y: 52, rotate: -45, z: 1 },
  { alt: "Ramo de primavera", x: -140, y: 12, rotate: -20, z: 2 },
  { alt: "Flores frescas", x: 0, y: -6, rotate: 0, z: 10 },
  { alt: "Ramo artesanal", x: 140, y: 12, rotate: 20, z: 2 },
  { alt: "Centro floral", x: 280, y: 52, rotate: 45, z: 1 },
] as const;

export function FloristeriaHeroFan({
  centerImageAlt,
  images,
}: {
  centerImageAlt: string;
  images: string[];
}) {
  return (
    <div className="relative mx-auto w-full max-w-4xl origin-bottom scale-[0.42] md:mt-1 md:scale-100">
      <FloristeriaHeroFanEdge
        alt={FLORISTERIA_HERO_FAN_EDGES.left.alt}
        side="left"
        src={FLORISTERIA_ASSETS.bouquet6}
      />
      <FloristeriaHeroFanEdge
        alt={FLORISTERIA_HERO_FAN_EDGES.right.alt}
        side="right"
        src={FLORISTERIA_ASSETS.bouquet2}
      />
      <div className="relative mx-auto h-[140px] w-full sm:h-[165px] md:h-[190px]">
        {FAN_LAYOUT.map((slot, index) => (
          <FloristeriaHeroFanImage
            alt={index === 2 ? centerImageAlt : slot.alt}
            index={index}
            key={`${images[index]}-${slot.x}-${slot.y}`}
            priority={index === 2}
            reduceMotion
            rotate={slot.rotate}
            scale={1}
            src={images[index]}
            x={slot.x}
            y={slot.y}
            zIndex={slot.z}
          />
        ))}
      </div>
    </div>
  );
}
