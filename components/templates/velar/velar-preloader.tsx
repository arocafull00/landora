"use client";

import { useEffect, useRef } from "react";

const CHAR_INTERVAL = 140;
const TYPE_START = 600;

export function VelarPreloader({
  brand,
  onLift,
  onHeroReveal,
  onDone,
}: {
  brand: string;
  onLift: () => void;
  onHeroReveal: () => void;
  onDone: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const fullText = brand || "Velar.";

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const liftAt = TYPE_START + fullText.length * CHAR_INTERVAL + 700;

    fullText.split("").forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          const el = charsRef.current[i];
          if (el) el.style.opacity = "1";
        }, TYPE_START + i * CHAR_INTERVAL)
      );
    });

    timers.push(
      setTimeout(() => {
        if (cursorRef.current) cursorRef.current.style.opacity = "0";
      }, liftAt - 150)
    );

    timers.push(
      setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.style.transform = "translateY(-100%)";
        }
        onLift();
      }, liftAt)
    );

    timers.push(
      setTimeout(() => {
        onHeroReveal();
      }, liftAt + 1300)
    );

    timers.push(
      setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.style.transition = "none";
        }
        onDone();
      }, liftAt + 2100)
    );

    return () => timers.forEach(clearTimeout);
  }, [fullText, onLift, onHeroReveal, onDone]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        backgroundColor: "#213138",
        transition: "transform 1.5s cubic-bezier(0.45, 0, 0.15, 1)",
      }}
    >
      <span
        className="flex items-baseline"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "2.6rem",
          letterSpacing: "-0.02em",
          color: "white",
        }}
      >
        {fullText.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) charsRef.current[i] = el;
            }}
            style={{
              opacity: 0,
              fontWeight: char === "." ? 800 : 700,
            }}
          >
            {char}
          </span>
        ))}
        <span
          ref={cursorRef}
          className="ml-[2px] inline-block rounded-sm bg-white"
          style={{
            width: "3px",
            height: "1.1em",
            animation: "blink 0.7s step-end infinite",
          }}
        />
      </span>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}
