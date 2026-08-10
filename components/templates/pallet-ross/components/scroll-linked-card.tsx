"use client";

import { useState } from "react";
import { useTransform, type MotionValue } from "framer-motion";
import { ArtworkCard, getHoverTransition } from "@/components/templates/pallet-ross/components/artwork-card";
import {
  CARD_SIZE,
  CASCADE_LAYOUT,
  FAN_SLOTS,
  HERO_ROW_Y,
  hoverEase,
} from "@/lib/pallet-ross-layout";
import type { ViewportSize } from "@/components/templates/pallet-ross/hooks/use-viewport-size";

export function ScrollLinkedCard({
  src,
  cardIndex,
  clampedProgress,
  viewport,
  lockProgress,
}: {
  src: string;
  cardIndex: number;
  clampedProgress: MotionValue<number>;
  viewport: ViewportSize;
  lockProgress: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [revealed, setRevealed] = useState(true);

  const slot = FAN_SLOTS[cardIndex];
  const cascade = CASCADE_LAYOUT[cardIndex];
  const lp = Math.max(lockProgress, 0.05);
  const p1 = lp * 0.33;
  const p2 = lp * 0.66;

  if (viewport.w === 0) return null;

  const s1Cx = viewport.w / 2 + slot.x;
  const s1Cy = HERO_ROW_Y + slot.y;
  const stackCx = viewport.w / 2;
  const stackCy = viewport.h / 2;
  const cascadeLeftRef = viewport.w * 0.4;
  const s2Cx = cascadeLeftRef + cascade.left + CARD_SIZE / 2;
  const s2Cy = cascade.top + CARD_SIZE / 2;

  const x = useTransform(clampedProgress, [0, p1, p2, lp], [s1Cx, stackCx, stackCx, s2Cx]);
  const y = useTransform(clampedProgress, [0, p1, p2, lp], [s1Cy, stackCy, s2Cy, s2Cy]);
  const rotate = useTransform(clampedProgress, [0, p1, lp], [slot.rotate, 0, cascade.rotate]);
  const scaleX = useTransform(clampedProgress, [0, p1, lp], [slot.scale, 1, 1]);
  const scaleY = useTransform(clampedProgress, [0, p1, lp], [slot.scale, 1, 1]);

  const zIndex = hovered ? 30 : cascade.z;

  return (
    <ArtworkCard
      src={src}
      alt={`Artwork ${cardIndex + 1}`}
      zIndex={zIndex}
      style={{
        translate: "-50% -50%",
        x,
        y,
        rotate,
        scaleX,
        scaleY,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={
        revealed
          ? { transition: { duration: 0.2, ease: hoverEase } }
          : undefined
      }
      transition={getHoverTransition(revealed)}
    />
  );
}
