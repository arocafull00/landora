"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

export type VelarHouseAnimationHandle = {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  innerRef: React.RefObject<HTMLDivElement | null>;
  imgRef: React.RefObject<HTMLImageElement | null>;
};

type VelarHouseAnimationProps = {
  houseImage: string;
  isScrolling: boolean;
  scrollTransform: string;
  visible: boolean;
  onImageLoad?: () => void;
};

const easeOut = [0.16, 1, 0.3, 1] as const;

export const VelarHouseAnimation = forwardRef<
  VelarHouseAnimationHandle,
  VelarHouseAnimationProps
>(function VelarHouseAnimation(
  { houseImage, isScrolling, scrollTransform, visible, onImageLoad },
  ref
) {
  const reduce = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useImperativeHandle(ref, () => ({
    wrapperRef,
    innerRef,
    imgRef,
  }));

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
      ref={wrapperRef}
      className="pointer-events-none fixed z-[22] w-full min-w-0 max-lg:w-screen lg:min-w-[1400px]"
      style={wrapperStyle}
    >
      <motion.div
        ref={innerRef}
        initial={reduce ? false : { opacity: 0, y: 140 }}
        animate={{ opacity: visible ? 1 : 0, y: 0 }}
        transition={{
          opacity: { duration: visible ? 1.05 : 0.4, delay: visible ? 0.5 : 0 },
          y: { duration: 1.05, delay: 0.5, ease: easeOut },
        }}
      >
        <img
          ref={imgRef}
          src={houseImage}
          alt=""
          aria-hidden
          className="w-full"
          onLoad={onImageLoad}
        />
      </motion.div>
    </div>
  );
});
