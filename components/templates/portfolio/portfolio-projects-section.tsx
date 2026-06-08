"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { PortfolioProjectCard } from "@/components/templates/portfolio/portfolio-project-card";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function PortfolioProjectsSection({ content }: { content: LandingContent }) {
  const gallery = content.gallery ?? [];
  if (gallery.length === 0) return null;

  const heading = getSectionHeading(
    content,
    "proyectos",
    SECTION_HEADING_DEFAULTS.portfolio.proyectos,
  );

  return (
    <section id="proyectos" className="bg-[#0a0a0a] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <h2
          className="mb-12 max-w-xl text-balance text-3xl font-extrabold text-white sm:text-4xl md:mb-16 md:text-[clamp(32px,5vw,48px)]"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
          data-aos="fade-up"
        >
          {heading.title}
        </h2>

        <div
          className="flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
          data-aos="fade-up"
        >
          {gallery.map((item) => (
            <div
              className="shrink-0 snap-start"
              style={{ width: "min(80vw, 360px)" }}
              key={item.id}
            >
              <PortfolioProjectCard item={item} index={0} />
            </div>
          ))}
        </div>

        <div
          className="hidden md:grid md:auto-rows-[240px] md:grid-cols-3 md:gap-4"
          data-aos="fade-up"
        >
          {gallery.map((item, index) => (
            <PortfolioProjectCard
              item={item}
              index={index}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
