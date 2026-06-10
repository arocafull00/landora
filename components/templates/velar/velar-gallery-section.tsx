"use client";

import { useState } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { VelarGalleryItem } from "@/components/templates/velar/velar-gallery-item";

function buildTickerText(brand: string) {
  const text = brand || "Velar.";
  return `${text}   `.repeat(8);
}

export function VelarGallerySection({ content }: { content: LandingContent }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!content.gallery || content.gallery.length === 0) return null;

  const tickerText = buildTickerText(content.brand);

  return (
    <section
      id="listings"
      className="s3-gallery-section relative z-25 mt-0 md:h-screen scroll-mt-24 overflow-hidden bg-[#1a1a1a] lg:mt-[-100vh]"
    >
      <div className="s3-ticker-wrap absolute inset-0 z-0 flex items-center overflow-hidden pointer-events-none select-none">
        <div className="ticker-track flex">
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
              {tickerText}
            </span>
          ))}
        </div>
      </div>

      <div className="s3-gallery-content relative z-[1] flex h-full items-center justify-center lg:p-[clamp(24px,4vw,60px)]">
        <div className="gallery-expand-row flex h-[70%] w-full max-w-[1200px] gap-[6px]">
          {(content.gallery ?? []).map((item, index) => (
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
