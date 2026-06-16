"use client";

import { FLORISTERIA_ASSETS } from "@/lib/floristeria-assets";
import { FloristeriaHeroFanBackdropImage } from "@/components/templates/floristeria/floristeria-hero-fan-backdrop-image";

type HeroBackdropSlot = {
  asset: string;
  alt: string;
  bottom?: string;
  className?: string;
  left?: string;
  opacity: number;
  right?: string;
  rotate: number;
  size: "sm" | "md" | "lg";
  top?: string;
};

const HERO_BACKDROP_LAYOUT: HeroBackdropSlot[] = [
  {
    asset: FLORISTERIA_ASSETS.interior1,
    alt: "Interior floristería",
    top: "4%",
    left: "1%",
    rotate: -22,
    opacity: 0.34,
    size: "md" as const,
    className: "hidden sm:block",
  },
  {
    asset: FLORISTERIA_ASSETS.gallery2,
    alt: "Ramo decorativo",
    top: "2%",
    right: "3%",
    rotate: 18,
    opacity: 0.3,
    size: "sm" as const,
  },
  {
    asset: FLORISTERIA_ASSETS.gallery6,
    alt: "Flores de temporada",
    top: "18%",
    left: "-2%",
    rotate: -28,
    opacity: 0.26,
    size: "sm" as const,
    className: "hidden md:block",
  },
  {
    asset: FLORISTERIA_ASSETS.gallery3,
    alt: "Centro de mesa",
    top: "14%",
    right: "-1%",
    rotate: 24,
    opacity: 0.28,
    size: "md" as const,
    className: "hidden sm:block",
  },
  {
    asset: FLORISTERIA_ASSETS.bouquet6,
    alt: "Detalle de pétalos",
    top: "8%",
    left: "28%",
    rotate: -10,
    opacity: 0.2,
    size: "sm" as const,
    className: "hidden lg:block",
  },
  {
    asset: FLORISTERIA_ASSETS.gallery4,
    alt: "Ramo de campo",
    top: "38%",
    left: "2%",
    rotate: -14,
    opacity: 0.32,
    size: "md" as const,
  },
  {
    asset: FLORISTERIA_ASSETS.bouquet1,
    alt: "Taller floral",
    top: "32%",
    right: "2%",
    rotate: 16,
    opacity: 0.3,
    size: "sm" as const,
    className: "hidden md:block",
  },
  {
    asset: FLORISTERIA_ASSETS.gallery5,
    alt: "Arreglo floral",
    top: "52%",
    left: "6%",
    rotate: -8,
    opacity: 0.24,
    size: "lg" as const,
    className: "hidden sm:block",
  },
  {
    asset: FLORISTERIA_ASSETS.gallery1,
    alt: "Flores frescas",
    top: "48%",
    right: "5%",
    rotate: 12,
    opacity: 0.26,
    size: "md" as const,
  },
  {
    asset: FLORISTERIA_ASSETS.bouquet2,
    alt: "Ramo suave",
    bottom: "18%",
    left: "10%",
    rotate: -6,
    opacity: 0.22,
    size: "sm" as const,
    className: "hidden lg:block",
  },
  {
    asset: FLORISTERIA_ASSETS.bouquet3,
    alt: "Ramo de rosas",
    bottom: "14%",
    right: "8%",
    rotate: 10,
    opacity: 0.24,
    size: "md" as const,
    className: "hidden md:block",
  },
  {
    asset: FLORISTERIA_ASSETS.gallery4,
    alt: "Flores del taller",
    bottom: "6%",
    left: "42%",
    rotate: 4,
    opacity: 0.18,
    size: "sm" as const,
    className: "hidden xl:block",
  },
];

function getBackdropMotion(index: number) {
  return {
    animationDelay: index * 0.35,
    animationDuration: 5.5 + (index % 4) * 0.8,
    driftX: Math.round(((index * 1.7) % 5) - 2),
    floatY: -10 - (index % 3) * 2,
    swayDeg: 3 + (index % 3),
  };
}

export function FloristeriaHeroFanBackdrop() {
  return (
    <>
      {HERO_BACKDROP_LAYOUT.map((slot, index) => {
        const motion = getBackdropMotion(index);

        return (
          <FloristeriaHeroFanBackdropImage
            alt={slot.alt}
            animationDelay={motion.animationDelay}
            animationDuration={motion.animationDuration}
            bottom={slot.bottom}
            className={slot.className ?? ""}
            driftX={motion.driftX}
            floatY={motion.floatY}
            key={index}
            left={slot.left}
            opacity={slot.opacity}
            right={slot.right}
            rotate={slot.rotate}
            size={slot.size}
            src={slot.asset}
            swayDeg={motion.swayDeg}
            top={slot.top}
          />
        );
      })}
    </>
  );
}
