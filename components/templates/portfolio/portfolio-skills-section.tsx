"use client";

import { Target, Users, TrendingUp, Clock } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  target: Target,
  users: Users,
  "trending-up": TrendingUp,
  clock: Clock,
};

export function PortfolioSkillsSection({ content }: { content: LandingContent }) {
  const benefits = content.benefits ?? [];
  if (benefits.length === 0) return null;

  return (
    <section id="skills" className="scroll-mt-24 bg-[#111] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <h2
          className="mb-12 text-balance text-3xl font-extrabold text-white sm:text-4xl md:mb-16 md:text-[clamp(32px,5vw,48px)]"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
          data-aos="fade-up"
        >
          Cómo trabajo
        </h2>

        <div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {benefits.map((item) => {
            const IconComp = ICON_MAP[item.icon] ?? Target;
            return (
              <div
                className="flex gap-5 rounded-lg border border-white/10 bg-white/[0.03] p-6"
                key={item.id}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <IconComp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3
                    className="mb-2 text-base font-bold text-white"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
