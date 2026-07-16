import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { OficioProStatCard } from "@/components/templates/oficio-pro/oficio-pro-stat-card";

export function OficioProExperienceSection({ content }: { content: LandingContent }) {
  const heading = getSectionHeading(
    content,
    "experiencia",
    SECTION_HEADING_DEFAULTS["oficio-pro"].experiencia,
  );

  return (
    <section
      className="scroll-mt-24 bg-[var(--site-surface)] px-7 py-16 md:px-20 lg:px-32 xl:px-44"
      id="experiencia"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:items-start md:justify-between lg:gap-20">
        <header className="flex w-full max-w-xl flex-col items-center gap-5 text-center md:w-[40%] md:max-w-none md:items-start md:text-left">
          <span className="inline-flex rounded-full bg-[var(--site-accent-bright)]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--site-primary)]">
            Desde 1990
          </span>
          <h2 className="text-balance text-3xl font-black uppercase leading-[1.05] tracking-normal text-[var(--site-text)] sm:text-4xl md:text-5xl">
            {heading.title}
          </h2>
          <p className="text-pretty text-base leading-relaxed text-[var(--site-text-muted)] sm:text-lg">
            {content.story?.statement || heading.subtitle}
          </p>
          <span className="mt-1 h-0.5 w-14 rounded-full bg-[var(--site-accent-bright)]" aria-hidden="true" />
        </header>
        <div className="grid w-full grid-cols-2 gap-4 md:w-[55%] md:max-w-2xl md:gap-5">
          {content.stats.map((stat, index) => (
            <OficioProStatCard index={index} key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
