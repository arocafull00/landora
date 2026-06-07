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
  const lines = content.story.statement.split("\n");

  return (
    <div ref={sectionRef} className="relative z-20" style={{ height: "200vh" }}>
      <div className="h-[4vh] bg-[#1a1a1a]" />
      <div
        id="story"
        className="sticky top-0 h-screen overflow-hidden bg-[#1a1a1a]"
      >
        <div
          className="flex h-full flex-col justify-between px-6 md:px-10 lg:px-16"
          style={{
            paddingTop: "clamp(30px, 4vw, 60px)",
            paddingBottom: "clamp(60px, 8vw, 120px)",
          }}
        >
          <div className="mx-auto w-full max-w-[1200px] lg:pl-[25%]">
            <p
              className="text-[#e8e4df]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.35,
                whiteSpace: "nowrap",
                fontSize: "clamp(22px, 2.6vw, 42px)",
              }}
            >
              {lines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < lines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          <div
            className="mx-auto w-full max-w-[1200px] lg:pl-[25%]"
            style={{ marginTop: "clamp(48px, 6vw, 80px)" }}
          >
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
