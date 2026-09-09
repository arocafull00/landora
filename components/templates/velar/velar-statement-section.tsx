import type { LandingContent } from "@/lib/dashboard-data";
import { VelarStatItem } from "@/components/templates/velar/velar-stat-item";

export function VelarStatementSection({
  content,
  sectionRef,
}: {
  content: LandingContent;
  sectionRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={sectionRef}
      data-section="story"
      data-section-label="Historia"
      id="historia"
      className="relative z-20 bg-[var(--site-dark)]"
    >
      <div className="s2-section scroll-mt-24 bg-[var(--site-dark)]">
        <div className="mx-auto flex min-h-[65svh] w-full max-w-[960px] flex-col justify-center gap-[clamp(48px,6vw,80px)] px-6 py-[clamp(64px,8vw,96px)] md:px-10 lg:px-0">
          <div className="mx-auto w-full max-w-[36rem]">
            <p
              data-editor-id="story:statement"
              className="mx-auto max-w-[36ch] text-center font-light leading-[1.35] tracking-[-0.02em] text-[var(--site-on-dark)] text-site-subtitle"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {content.story?.statement ?? ""}
            </p>
          </div>

          <div className="mx-auto w-full max-w-[720px]">
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
