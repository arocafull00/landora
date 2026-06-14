"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { RistoranteChefCard } from "@/components/templates/ristorante/ristorante-chef-card";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function RistoranteChefSection({ content }: { content: LandingContent }) {
  const team = content.team ?? [];
  if (team.length === 0) return null;

  const heading = getSectionHeading(content, "equipo", SECTION_HEADING_DEFAULTS.ristorante.equipo);

  return (
    <section
      id="equipo"
      className="scroll-mt-24 bg-[var(--ristorante-surface)] px-6 py-[clamp(80px,12vw,140px)] md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className="mb-12 max-w-xl text-balance text-[clamp(32px,5vw,56px)] font-normal leading-[1.05] text-[var(--ristorante-secondary)] md:mb-20"
          style={{ fontFamily: "var(--font-ristorante-display)", letterSpacing: "-0.03em" }}
        >
          {heading.title}
        </h2>

        <div
          className="flex items-end gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:justify-center md:gap-10 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {team.map((member, index) => (
            <RistoranteChefCard
              member={member}
              offset={index === 1 && team.length >= 3}
              scale={index === 1 && team.length >= 3 ? 1 : team.length >= 3 && index !== 1 ? 0.92 : 1}
              key={member.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
