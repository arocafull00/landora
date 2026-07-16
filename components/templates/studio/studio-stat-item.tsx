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

export function StudioStatItem({ stat }: { stat: StatContent }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  const countTo = stat.countTo ?? parseCountValue(stat.value)?.end;
  const suffix = stat.suffix ?? parseCountValue(stat.value)?.suffix ?? "";

  useEffect(() => {
    const el = ref.current;
    if (!el || countTo === undefined) return;

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
        className="leading-[1.05] text-[var(--site-text)]"
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 700,
          fontSize: "clamp(40px, 5vw, 64px)",
          letterSpacing: "-0.02em",
        }}
      >
        {displayValue}
      </div>
      <div
        className="mt-2 text-[var(--site-text-muted)]"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "clamp(13px, 1.1vw, 15px)",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}
