"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { CARD_SIZE, hoverEase } from "@/lib/pallet-ross-layout";

export type ArtworkCardProps = HTMLMotionProps<"div"> & {
  src: string;
  alt: string;
  zIndex: number;
};

export function ArtworkCard({
  src,
  alt,
  zIndex,
  style,
  ...motionProps
}: ArtworkCardProps) {
  return (
    <motion.div
      className="pointer-events-auto absolute left-0 top-0 overflow-hidden"
      style={{
        width: CARD_SIZE,
        height: CARD_SIZE,
        borderRadius: 18,
        boxShadow: "0 20px 60px rgba(0,0,0,0.20)",
        zIndex,
        ...style,
      }}
      {...motionProps}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

export function getHoverTransition(revealed: boolean) {
  if (!revealed) return undefined;
  return { duration: 0.25, ease: hoverEase };
}
