"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { VelarStatItem } from "@/components/templates/velar/velar-stat-item";

export function VelarStatementSection({
  content,
  sectionRef,
}: {
  content: LandingContent;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={sectionRef} className="relative z-20 h-[80vh] md:h-[200vh]">
      <div className="h-[4vh] bg-[#1a1a1a]" />
      <div
        id="story"
        className="s2-section sticky top-0 h-screen scroll-mt-24 overflow-hidden bg-[#1a1a1a]"
      >
        <div className="flex h-full flex-col justify-center gap-8 px-6 py-10 md:justify-between md:gap-0 md:px-10 md:py-0 md:pb-[clamp(60px,8vw,120px)] md:pt-[clamp(30px,4vw,60px)] lg:px-16">
          <div className="mx-auto w-full max-w-[1200px] md:pl-[15%] lg:pl-[25%]">
            <p
              className="max-w-[36ch] text-[clamp(18px,4.5vw,42px)] font-light leading-[1.35] tracking-[-0.02em] text-[#e8e4df] md:max-w-none md:text-[clamp(22px,2.6vw,42px)] lg:max-w-[28ch]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {content.story?.statement ?? ""}
            </p>
          </div>

          <div className="mx-auto w-full max-w-[1200px] md:mt-[clamp(48px,6vw,80px)] md:pl-[15%] lg:pl-[25%]">
            <div className="flex gap-0">
              {content.stats.map((stat, i) => (
                <div
                  key={stat.id}
                  className="flex-1"
                  style={{
                    borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.2)" : "none",
                    paddingLeft: i > 0 ? "clamp(20px, 2.5vw, 40px)" : "0",
                  }}
                >
                  <VelarStatItem stat={stat} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
