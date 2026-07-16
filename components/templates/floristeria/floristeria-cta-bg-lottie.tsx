"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import { fetchLottieAnimation, type LottieAnimation } from "@/lib/theme-lottie-background";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export function FloristeriaCtaBgLottie({ src }: { src: string }) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<LottieAnimation | null>(null);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    let cancelled = false;

    fetchLottieAnimation(src).then((raw) => {
      if (cancelled || !raw) return;
      setAnimationData(raw);
    });

    return () => {
      cancelled = true;
      setAnimationData(null);
    };
  }, [src]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const instance = lottieRef.current;
    if (instance) {
      if (media.matches) {
        instance.pause();
      } else {
        instance.play();
      }
    }

    const handleChange = () => {
      setReducedMotion(media.matches);

      const current = lottieRef.current;
      if (!current) return;

      if (media.matches) {
        current.pause();
      } else {
        current.play();
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [animationData]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-[var(--site-surface-muted)]">
      {animationData ? (
        <Lottie
          animationData={animationData}
          autoplay={!reducedMotion}
          className="h-full w-full"
          loop
          lottieRef={lottieRef}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      ) : null}
    </div>
  );
}
