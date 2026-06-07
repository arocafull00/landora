"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { motion, useReducedMotion } from "motion/react";
const easeOut = [0.16, 1, 0.3, 1] as const;

const smoothstep = (t: number) => t * t * (3 - 2 * t);

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

type VelarHouseAnimationProps = {
  houseImage: string;
  heroRef: RefObject<HTMLElement | null>;
  darkRef: RefObject<HTMLDivElement | null>;
};

export function VelarHouseAnimation({
  houseImage,
  heroRef,
  darkRef,
}: VelarHouseAnimationProps) {
  const reduce = useReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTransform, setScrollTransform] = useState("");
  const [visible, setVisible] = useState(true);

  const updatePosition = useCallback(() => {
    const heroEl = heroRef.current;
    const darkEl = darkRef.current;
    const imgEl = imgRef.current;

    if (!heroEl || !darkEl || !imgEl) return;

    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const heroRect = heroEl.getBoundingClientRect();
    const darkRect = darkEl.getBoundingClientRect();
    const heroH = heroEl.offsetHeight;
    const imgH = imgEl.offsetHeight || imgEl.naturalHeight || 1;
    const baseW = vw < 1024 ? vw : Math.max(vw, 1400);

    const triggerPoint = -(heroH * 0.3);
    const endPoint = heroRect.top - (darkRect.bottom - vh);
    const denominator = endPoint - triggerPoint;
    const progress =
      denominator === 0
        ? 0
        : clamp((heroRect.top - triggerPoint) / denominator, 0, 1);
    const t = smoothstep(smoothstep(progress));

    setVisible(progress < 1);

    if (progress <= 0) {
      setIsScrolling(false);
      return;
    }

    const startX = (vw - baseW) / 2;
    const startY = vh - imgH;
    const finalScale = 1.45;
    const finalX = (vw - baseW * finalScale) / 2;
    const mobileOffset = vw < 1024 ? -250 : 4;
    const finalY = darkRect.bottom - imgH * finalScale + 500 + mobileOffset;

    const currentX = startX + (finalX - startX) * t;
    const currentY = startY + (finalY - startY) * t;
    const currentScale = 1 + (finalScale - 1) * t;

    setIsScrolling(true);
    setScrollTransform(
      `translate(${currentX}px, ${currentY}px) scale(${currentScale})`
    );
  }, [darkRef, heroRef]);

  useLayoutEffect(() => {
    const handleUpdate = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        updatePosition();
      });
    };

    updatePosition();

    window.addEventListener("scroll", handleUpdate, { passive: true });
    window.addEventListener("resize", handleUpdate);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [houseImage, updatePosition]);

  const handleImgRef = useCallback(
    (node: HTMLImageElement | null) => {
      imgRef.current = node;
      if (!node) return;
      if (node.complete) updatePosition();
    },
    [updatePosition]
  );

  let wrapperStyle: React.CSSProperties = {
    willChange: "transform",
    opacity: visible ? 1 : 0,
    visibility: visible ? "visible" : "hidden",
    transition: "opacity 0.4s ease, visibility 0.4s ease",
  };

  if (isScrolling) {
    wrapperStyle = {
      ...wrapperStyle,
      top: 0,
      left: 0,
      bottom: "auto",
      transform: scrollTransform,
      transformOrigin: "top left",
    };
  } else {
    wrapperStyle = {
      ...wrapperStyle,
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
    };
  }

  return (
    <div
      className="pointer-events-none fixed z-[22] w-full min-w-0 max-lg:w-screen lg:min-w-[1400px]"
      style={wrapperStyle}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 140 }}
        animate={{ opacity: visible ? 1 : 0, y: 0 }}
        transition={{
          opacity: { duration: visible ? 1.05 : 0.4, delay: visible ? 0.5 : 0 },
          y: { duration: 1.05, delay: 0.5, ease: easeOut },
        }}
      >
        <img
          ref={handleImgRef}
          src={houseImage}
          alt=""
          aria-hidden
          className="w-full"
          onLoad={updatePosition}
        />
      </motion.div>
    </div>
  );
}
