import type { LandingContent } from "@/lib/dashboard-data";
import { StudioTeamMember } from "@/components/templates/studio/studio-team-member";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function StudioTeamSection({ content }: { content: LandingContent }) {
  const team = content.team ?? [];
  if (team.length === 0) return null;

  const heading = getSectionHeading(content, "equipo", SECTION_HEADING_DEFAULTS.studio.equipo);

  return (
    <section id="equipo" className="scroll-mt-24 bg-[var(--site-surface)] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h2
          className="mb-12 max-w-xl text-balance font-extrabold text-[var(--site-text)] md:mb-16 text-site-title"
          data-aos="fade-up"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
        >
          {heading.title}
        </h2>

        <div
          className="flex gap-8 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
          data-aos="fade-up"
          data-aos-delay="100"
          style={{ scrollSnapType: "x mandatory" }}
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
