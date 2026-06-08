"use client";

import type { WorkExperienceItem } from "@/lib/dashboard-data";

const ACCENT = "#2dd4bf";

export function PortfolioWorkHistoryCard({
  item,
  index,
}: {
  item: WorkExperienceItem;
  index: number;
}) {
  return (
    <article
      className="rounded-2xl bg-[#141414] p-6 md:p-8 lg:p-10"
      data-aos="fade-up"
      data-aos-delay={index * 80}
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-12 lg:gap-16">
        <div className="space-y-3">
          <p
            className="text-sm font-medium"
            style={{ color: ACCENT, fontFamily: "var(--font-body)" }}
          >
            {item.dateRange}
          </p>
          <p
            className="text-sm font-medium"
            style={{ color: ACCENT, fontFamily: "var(--font-body)" }}
          >
            {item.location}
          </p>
          <h3
            className="pt-2 text-2xl font-extrabold text-white sm:text-3xl md:text-[clamp(28px,4vw,40px)]"
            style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
          >
            {item.company}
          </h3>
        </div>

        <div className="space-y-5">
          <h4
            className="text-xl font-bold text-white sm:text-2xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {item.title}
          </h4>

          {item.summary ? (
            <p className="text-sm leading-relaxed text-white/55 sm:text-base">
              {item.summary}
            </p>
          ) : null}

          {item.highlights.length > 0 ? (
            <ul className="space-y-2.5">
              {item.highlights.map((highlight, highlightIndex) => (
                <li
                  className="flex gap-3 text-sm leading-relaxed text-white/55 sm:text-base"
                  key={`${item.id}-highlight-${highlightIndex}`}
                >
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {item.technologies.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {item.technologies.map((tech, techIndex) => (
                <span
                  className="rounded-md bg-[#1f1f1f] px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/80"
                  key={`${item.id}-tech-${techIndex}`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
