"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import type { TemplatePalette } from "@/lib/template-palettes";
import {
  applyPaletteToLottie,
  fetchLottieAnimation,
  type LottieAnimation,
} from "@/lib/theme-lottie-background";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export function ThemedLottieBackground({
  className,
  palette,
  src,
}: {
  className?: string;
  palette: TemplatePalette;
  src: string;
}) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<LottieAnimation | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    let cancelled = false;

    fetchLottieAnimation(src).then((raw) => {
      if (cancelled || !raw) return;
      setAnimationData(applyPaletteToLottie(raw, palette));
    });

    return () => {
      cancelled = true;
      setAnimationData(null);
    };
  }, [src, palette]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);

    const syncPlayback = () => {
      setReducedMotion(media.matches);

      const instance = lottieRef.current;
      if (!instance) return;

      if (media.matches) {
        instance.pause();
        return;
      }

      instance.play();
    };

    syncPlayback();
    media.addEventListener("change", syncPlayback);

    return () => {
      media.removeEventListener("change", syncPlayback);
    };
  }, [animationData]);

  return (
    <div
      className={["absolute inset-0 overflow-hidden", className].filter(Boolean).join(" ")}
      style={{ backgroundColor: palette.surface }}
    >
      {animationData ? (
        <Lottie
          animationData={animationData}
          autoplay={!reducedMotion}
          className="pointer-events-none h-full w-full"
          loop
          lottieRef={lottieRef}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      ) : null}
    </div>
  );
}
