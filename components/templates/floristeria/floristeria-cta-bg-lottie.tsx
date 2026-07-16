"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import { fetchLottieAnimation, type LottieAnimation } from "@/lib/theme-lottie-background";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function FloristeriaCtaBgLottie({ src }: { src: string }) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<LottieAnimation | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
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
    const instance = lottieRef.current;
    if (instance) {
      if (reducedMotion) {
        instance.pause();
      } else {
        instance.play();
      }
    }
  }, [animationData, reducedMotion]);

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
