"use client";

import { useEffect, useRef } from "react";

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export function VelarHouseAnimation({
  houseImage,
  lifting,
  liftDone,
  heroRef,
  darkRef,
}: {
  houseImage: string;
  lifting: boolean;
  liftDone: boolean;
  heroRef: React.RefObject<HTMLElement | null>;
  darkRef: React.RefObject<HTMLElement | null>;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lifting || liftDone) return;
    if (innerRef.current) {
      innerRef.current.style.transform = "translateY(0)";
    }
  }, [lifting, liftDone]);

  useEffect(() => {
    if (!liftDone) return;
    if (innerRef.current) {
      innerRef.current.style.transition = "none";
    }

    const updateHousePosition = () => {
      const heroEl = heroRef.current;
      const darkEl = darkRef.current;
      const imgEl = imgRef.current;
      const wrapperEl = wrapperRef.current;
      if (!heroEl || !darkEl || !imgEl || !wrapperEl) return;

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const heroRect = heroEl.getBoundingClientRect();
      const darkRect = darkEl.getBoundingClientRect();
      const heroH = heroEl.offsetHeight;
      const imgH = imgEl.offsetHeight;
      const baseW = Math.max(vw, 1400);

      const triggerPoint = -(heroH * 0.3);
      const endPoint = heroRect.top - (darkRect.bottom - vh);
      const denominator = endPoint - triggerPoint;
      const progress =
        denominator === 0
          ? 0
          : clamp((heroRect.top - triggerPoint) / denominator, 0, 1);
      const t = smoothstep(smoothstep(progress));

      if (progress <= 0) {
        wrapperEl.style.top = "";
        wrapperEl.style.left = "50%";
        wrapperEl.style.transform = "translateX(-50%)";
        wrapperEl.style.width = "100%";
        if (innerRef.current) innerRef.current.style.transform = "translateY(0)";
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

      wrapperEl.style.top = "0";
      wrapperEl.style.left = "0";
      wrapperEl.style.width = "auto";
      wrapperEl.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
    };

    window.addEventListener("scroll", updateHousePosition, { passive: true });
    window.addEventListener("resize", updateHousePosition);
    updateHousePosition();

    return () => {
      window.removeEventListener("scroll", updateHousePosition);
      window.removeEventListener("resize", updateHousePosition);
    };
  }, [liftDone, heroRef, darkRef]);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none"
      style={{
        position: "fixed",
        zIndex: 22,
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        minWidth: "1400px",
        willChange: "transform",
      }}
    >
      <div
        ref={innerRef}
        style={{
          transform: "translateY(102vh)",
          transition: lifting
            ? "transform 1.5s cubic-bezier(0.45, 0, 0.15, 1) 0.4s"
            : "none",
        }}
      >
        <img
          ref={imgRef}
          alt=""
          aria-hidden
          className="w-full"
          src={houseImage}
        />
      </div>
    </div>
  );
}
