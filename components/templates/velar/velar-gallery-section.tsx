"use client";

import { useState } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { VelarGalleryItem } from "@/components/templates/velar/velar-gallery-item";

const TICKER_TEXT =
  "Velar.   Velar.   Velar.   Velar.   Velar.   Velar.   Velar.   Velar.  ";

export function VelarGallerySection({ content }: { content: LandingContent }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="listings"
      className="relative z-[25] overflow-hidden bg-[#1a1a1a]"
      style={{ marginTop: "-100vh", height: "100vh" }}
    >
      <div className="absolute inset-0 z-0 flex items-center overflow-hidden pointer-events-none select-none">
        <div className="flex">
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="whitespace-nowrap text-white"
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(100px, 14vw, 220px)",
                letterSpacing: "-0.02em",
                paddingRight: "0.3em",
                userSelect: "none",
              }}
            >
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </div>

      <div
        className="relative z-[1] flex h-full items-center justify-center"
        style={{ padding: "clamp(24px, 4vw, 60px)" }}
      >
        <div
          className="flex h-[70%] w-full max-w-[1200px] gap-[6px]"
        >
          {content.gallery.map((item, index) => (
            <VelarGalleryItem
              key={item.id}
              item={item}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
