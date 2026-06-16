"use client";

import { m, type Variants } from "motion/react";
import { AssetImage } from "@/components/ui/asset-image";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type FanImageMotion = {
  index: number;
  rotate: number;
  scale: number;
  x: number;
  y: number;
};

const fanImageVariants: Variants = {
  hidden: {
    x: "-50%",
    y: 0,
    rotate: 0,
    opacity: 0,
    scale: 0.6,
  },
  visible: ({ index, rotate, scale, x, y }: FanImageMotion) => ({
    x: `calc(-50% + ${x * scale}px)`,
    y: y * scale,
    rotate,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: index * 0.08,
      ease: easeOutExpo,
    },
  }),
};

export function FloristeriaHeroFanImage({
  alt,
  index,
  priority,
  reduceMotion,
  rotate,
  scale,
  src,
  x,
  y,
  zIndex,
}: {
  alt: string;
  index: number;
  priority?: boolean;
  reduceMotion: boolean;
  rotate: number;
  scale: number;
  src: string;
  x: number;
  y: number;
  zIndex: number;
}) {
  return (
    <m.div
      className="absolute bottom-0 left-1/2 h-[105px] w-[82px] origin-bottom overflow-hidden rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] sm:h-[118px] sm:w-[92px] md:h-[138px] md:w-[108px]"
      style={{ zIndex }}
      custom={{ index, rotate, scale, x, y }}
      variants={fanImageVariants}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
    >
      <AssetImage
        alt={alt}
        className="object-cover"
        fill
        priority={priority}
        sizes="140px"
        src={src}
      />
    </m.div>
  );
}
