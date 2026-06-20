"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { FLORISTERIA_ASSETS, FLORISTERIA_HERO_FAN_EDGES } from "@/lib/floristeria-assets";
import { FloristeriaHeroFanEdge } from "@/components/templates/floristeria/floristeria-hero-fan-edge";
import { FloristeriaHeroFanImage } from "@/components/templates/floristeria/floristeria-hero-fan-image";

const FAN_LAYOUT = [
  {
    alt: "Ramo de rosas",
    x: -280,
    y: 52,
    rotate: -45,
    z: 1,
  },
  {
    alt: "Ramo de primavera",
    x: -140,
    y: 12,
    rotate: -20,
    z: 2,
  },
  {
    alt: "Flores frescas",
    x: 0,
    y: -6,
    rotate: 0,
    z: 10,
  },
  {
    alt: "Ramo artesanal",
    x: 140,
    y: 12,
    rotate: 20,
    z: 2,
  },
  {
    alt: "Centro floral",
    x: 280,
    y: 52,
    rotate: 45,
    z: 1,
  },
] as const;

function useFanScale() {
  const [scale, setScale] = useState(0.42);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setScale(media.matches ? 1 : 0.42);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return scale;
}

export function FloristeriaHeroFan({
  centerImageAlt,
  images,
}: {
  centerImageAlt: string;
  images: string[];
}) {
  const reduce = useReducedMotion();
  const scale = useFanScale();

  return (
    <div className="relative mx-auto w-full max-w-4xl md:mt-1">
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
        {FAN_LAYOUT.map((slot, index) => {
          const alt = index === 2 ? centerImageAlt : slot.alt;

          return (
            <FloristeriaHeroFanImage
              alt={alt}
              index={index}
              key={`${images[index]}-${slot.x}-${slot.y}`}
              priority={index === 2}
              reduceMotion={reduce ?? false}
              rotate={slot.rotate}
              scale={scale}
              src={images[index]}
              x={slot.x}
              y={slot.y}
              zIndex={slot.z}
            />
          );
        })}
      </div>
    </div>
  );
}
