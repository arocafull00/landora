"use client";

import dynamic from "next/dynamic";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import type { SitePalette } from "@/lib/site-appearance";
import {
  applyPaletteToLottie,
  fetchLottieAnimation,
  type LottieAnimation,
} from "@/lib/theme-lottie-background";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ThemedLottieBackground({
  className,
  src,
  themeKey,
}: {
  className?: string;
  src: string;
  themeKey: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<LottieAnimation | null>(null);
  const [palette, setPalette] = useState<SitePalette | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const styles = getComputedStyle(container);
    setPalette({
      primary: styles.getPropertyValue("--site-primary").trim(),
      secondary: styles.getPropertyValue("--site-dark").trim(),
      accent: styles.getPropertyValue("--site-accent").trim(),
      muted: styles.getPropertyValue("--site-surface-alt").trim(),
      surface: styles.getPropertyValue("--site-surface").trim(),
      foreground: styles.getPropertyValue("--site-on-dark").trim(),
    });
  }, [themeKey]);

  useEffect(() => {
    if (!palette) return;

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
    const instance = lottieRef.current;
    if (!instance) return;

    if (reducedMotion) {
      instance.pause();
      return;
    }

    instance.play();
  }, [animationData, reducedMotion]);

  return (
    <div
      className={[
        "absolute inset-0 overflow-hidden bg-[var(--site-surface)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      ref={containerRef}
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
