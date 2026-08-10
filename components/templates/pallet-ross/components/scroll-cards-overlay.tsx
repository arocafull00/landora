"use client";

import { useMemo } from "react";
import { useTransform, type MotionValue } from "framer-motion";
import { IntroLeadCard } from "@/components/templates/pallet-ross/components/intro-lead-card";
import { IntroFollowerCard } from "@/components/templates/pallet-ross/components/intro-follower-card";
import { ScrollLinkedCard } from "@/components/templates/pallet-ross/components/scroll-linked-card";
import { PALLET_ROSS_CARD_IMAGES } from "@/lib/pallet-ross-assets";
import type { ViewportSize } from "@/components/templates/pallet-ross/hooks/use-viewport-size";

export function ScrollCardsOverlay({
  scrollYProgress,
  currentProgress,
  lockProgress,
  scrollableHeight,
  introDone,
  viewport,
  onIntroComplete,
}: {
  scrollYProgress: MotionValue<number>;
  currentProgress: number;
  lockProgress: number;
  scrollableHeight: number;
  introDone: boolean;
  viewport: ViewportSize;
  onIntroComplete: () => void;
}) {
  const clampedProgress = useTransform(scrollYProgress, (v) =>
    Math.min(v, lockProgress),
  );

  const isLocked = currentProgress >= lockProgress;

  const wrapperStyle = useMemo(() => {
    if (!introDone) {
      return {
        position: "fixed" as const,
        inset: 0,
        zIndex: 5,
        pointerEvents: "none" as const,
      };
    }

    if (isLocked) {
      return {
        position: "absolute" as const,
        top: lockProgress * scrollableHeight,
        left: 0,
        width: "100%",
        height: viewport.h,
        zIndex: 5,
        pointerEvents: "none" as const,
      };
    }

    return {
      position: "fixed" as const,
      inset: 0,
      zIndex: 5,
      pointerEvents: "none" as const,
    };
  }, [introDone, isLocked, lockProgress, scrollableHeight, viewport.h]);

  return (
    <div style={wrapperStyle}>
      {!introDone ? (
        <>
          <IntroLeadCard
            src={PALLET_ROSS_CARD_IMAGES[0]}
            viewport={viewport}
            onComplete={onIntroComplete}
          />
          {PALLET_ROSS_CARD_IMAGES.slice(1).map((src, index) => (
            <IntroFollowerCard
              key={`card-${index + 2}`}
              src={src}
              slotIndex={index + 1}
              viewport={viewport}
            />
          ))}
        </>
      ) : (
        PALLET_ROSS_CARD_IMAGES.map((src, index) => (
          <ScrollLinkedCard
            key={`card-${index + 1}`}
            src={src}
            cardIndex={index}
            clampedProgress={clampedProgress}
            viewport={viewport}
            lockProgress={lockProgress}
          />
        ))
      )}
    </div>
  );
}
