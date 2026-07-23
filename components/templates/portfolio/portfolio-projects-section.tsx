"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { PortfolioProjectCard } from "@/components/templates/portfolio/portfolio-project-card";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { getPortfolioProjectHref } from "@/lib/portfolio-projects";

export function PortfolioProjectsSection({
  content,
  landingSlug,
  previewLandingId,
}: {
  content: LandingContent;
  landingSlug: string;
  previewLandingId?: string;
}) {
  const gallery = content.gallery ?? [];
  if (gallery.length === 0) return null;

  const heading = getSectionHeading(
    content,
    "proyectos",
    SECTION_HEADING_DEFAULTS.portfolio.proyectos,
  );

  return (
    <section
      id="proyectos"
      className="relative scroll-mt-24 overflow-hidden bg-[var(--site-surface)] px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--site-border)_24%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--site-border)_12%,transparent)_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_72%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_12%,black_72%,transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[var(--site-surface)] to-transparent md:h-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[var(--site-dark)] to-transparent md:h-52"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <h2
          className="mb-12 max-w-xl text-balance text-3xl font-extrabold text-[var(--site-text)] sm:text-4xl md:mb-16 md:text-[clamp(32px,5vw,48px)]"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
          data-aos="fade-up"
        >
          {heading.title}
        </h2>

        <div
          className="flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] scrollbar-none md:hidden [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
          data-aos="fade-up"
        >
          {gallery.map((item) => (
            <div
              className="shrink-0 snap-start"
              style={{ width: "min(80vw, 360px)" }}
              key={item.id}
            >
              <PortfolioProjectCard
                item={item}
                index={0}
                internalHref={
                  item.projectSlug
                    ? getPortfolioProjectHref({
                        landingSlug,
                        previewLandingId,
                        projectId: item.id,
                        projectSlug: item.projectSlug,
                      })
                    : undefined
                }
              />
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
              internalHref={
                item.projectSlug
                  ? getPortfolioProjectHref({
                      landingSlug,
                      previewLandingId,
                      projectId: item.id,
                      projectSlug: item.projectSlug,
                    })
                  : undefined
              }
              key={item.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
