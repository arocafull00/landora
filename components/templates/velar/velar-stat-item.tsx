"use client";

import { useEffect, useRef, useState } from "react";
import type { StatContent } from "@/lib/dashboard-data";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function parseCountValue(value: string): { end: number; suffix: string } | null {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { end: parseInt(match[1], 10), suffix: match[2] };
}

export function VelarStatItem({ stat }: { stat: StatContent }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  const countTo = stat.countTo ?? parseCountValue(stat.value)?.end;
  const suffix = stat.suffix ?? parseCountValue(stat.value)?.suffix ?? "";

  useEffect(() => {
    const el = ref.current;
    if (!el || countTo === undefined) return;

    triggered.current = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return;
        triggered.current = true;
        const end = countTo;
        const duration = 2000;
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const t = Math.min(elapsed / duration, 1);
          setCount(Math.round(easeOutCubic(t) * end));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [countTo]);

  const displayValue =
    countTo !== undefined ? `${count}${suffix}` : stat.value;

  return (
    <div ref={ref}>
      <div
        data-editor-id={`story:stat:${stat.id}:value`}
        className="text-white leading-[1.1]"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "clamp(36px, 4.5vw, 72px)",
        }}
      >
        {displayValue}
      </div>
      <div
        data-editor-id={`story:stat:${stat.id}:label`}
        className="mt-[clamp(4px,0.5vw,8px)] text-white/60"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "clamp(12px, 1.1vw, 16px)",
          letterSpacing: "0.01em",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}
