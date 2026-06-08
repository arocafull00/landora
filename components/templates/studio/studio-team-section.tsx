"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { StudioTeamMember } from "@/components/templates/studio/studio-team-member";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function StudioTeamSection({ content }: { content: LandingContent }) {
  const team = content.team ?? [];
  if (team.length === 0) return null;

  const heading = getSectionHeading(content, "equipo", SECTION_HEADING_DEFAULTS.studio.equipo);

  return (
    <section id="equipo" className="bg-[#faf9f7] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h2
          className="mb-12 max-w-xl text-balance text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl md:mb-16 md:text-[clamp(32px,5vw,48px)]"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
          data-aos="fade-up"
        >
          {heading.title}
        </h2>

        <div
          className="flex gap-8 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {team.map((member, index) => (
            <StudioTeamMember
              member={member}
              offset={index === 1}
              key={member.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
