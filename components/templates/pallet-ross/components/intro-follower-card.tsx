"use client";

import { useState } from "react";
import { ArtworkCard, getHoverTransition } from "@/components/templates/pallet-ross/components/artwork-card";
import {
  FAN_SLOTS,
  HERO_ROW_Y,
  getRevealDelay,
  getRevealDuration,
  hoverEase,
} from "@/lib/pallet-ross-layout";
import type { ViewportSize } from "@/components/templates/pallet-ross/hooks/use-viewport-size";

export function IntroFollowerCard({
  src,
  slotIndex,
  viewport,
}: {
  src: string;
  slotIndex: number;
  viewport: ViewportSize;
}) {
  const [hovered, setHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const slot = FAN_SLOTS[slotIndex];

  if (viewport.w === 0) return null;

  const cx = viewport.w / 2 + slot.x;
  const cy = HERO_ROW_Y + slot.y;

  return (
    <ArtworkCard
      src={src}
      alt={`Artwork ${slotIndex + 1}`}
      zIndex={hovered ? 30 : slot.z}
      style={{
        translate: "-50% -50%",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{
        x: cx,
        y: cy,
        rotate: slot.rotate,
        scale: slot.scale,
        opacity: 0,
      }}
      animate={{
        x: cx,
        y: cy,
        rotate: slot.rotate,
        scale: slot.scale,
        opacity: 1,
      }}
      transition={{
        delay: getRevealDelay(slotIndex),
        duration: getRevealDuration(slotIndex),
        ease: "easeOut",
      }}
      onAnimationComplete={() => setRevealed(true)}
      whileHover={
        revealed
          ? { transition: { duration: 0.2, ease: hoverEase } }
          : undefined
      }
    />
  );
}
