"use client";

import { useState } from "react";
import { ArtworkCard } from "@/components/templates/pallet-ross/components/artwork-card";
import {
  FAN_SLOTS,
  HERO_ROW_Y,
  INTRO_DELAY,
  INTRO_DURATION,
  TOTAL_INTRO_DURATION,
  TRAVEL_TO_RIGHT_DURATION,
  smoothEase,
} from "@/lib/pallet-ross-layout";
import type { ViewportSize } from "@/components/templates/pallet-ross/hooks/use-viewport-size";

export function IntroLeadCard({
  src,
  viewport,
  onComplete,
}: {
  src: string;
  viewport: ViewportSize;
  onComplete: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const slot0 = FAN_SLOTS[0];
  const slot6 = FAN_SLOTS[6];

  if (viewport.w === 0) return null;

  const times = [
    0,
    INTRO_DURATION / TOTAL_INTRO_DURATION,
    (INTRO_DURATION + TRAVEL_TO_RIGHT_DURATION) / TOTAL_INTRO_DURATION,
    1,
  ];

  return (
    <ArtworkCard
      src={src}
      alt="Featured artwork"
      zIndex={hovered ? 30 : 10}
      style={{
        translate: "-50% -50%",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{
        x: viewport.w / 2,
        y: viewport.h / 2 + 180,
        rotate: 0,
        scale: 0.3,
        opacity: 0,
      }}
      animate={{
        x: [
          viewport.w / 2,
          viewport.w / 2,
          viewport.w / 2 + slot6.x,
          viewport.w / 2 + slot0.x,
        ],
        y: [
          viewport.h / 2 + 180,
          HERO_ROW_Y,
          HERO_ROW_Y + slot6.y,
          HERO_ROW_Y + slot0.y,
        ],
        rotate: [0, 0, slot6.rotate, slot0.rotate],
        scale: [0.3, 1, slot6.scale, slot0.scale],
        opacity: [0, 1, 1, 1],
      }}
      transition={{
        delay: INTRO_DELAY,
        duration: TOTAL_INTRO_DURATION,
        times,
        ease: [smoothEase, smoothEase, smoothEase],
      }}
      whileHover={{ transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] } }}
      onAnimationComplete={onComplete}
    />
  );
}
