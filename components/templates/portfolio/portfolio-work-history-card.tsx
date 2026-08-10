import type { WorkExperienceItem } from "@/lib/dashboard-data";

const ACCENT = "var(--site-accent)";

export function PortfolioWorkHistoryCard({
  index,
  item,
}: {
  index: number;
  item: WorkExperienceItem;
}) {
  return (
    <article
      className="rounded-2xl bg-(--site-dark) p-6 md:p-8 lg:p-10"
      data-aos="fade-up"
      data-aos-delay={index * 80}
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-12 lg:gap-16">
        <div className="space-y-3">
          <p
            className="font-medium text-site-content"
            style={{ color: ACCENT, fontFamily: "var(--font-body)" }}
          >
            {item.dateRange}
          </p>
          <p
            className="font-medium text-site-content"
            style={{ color: ACCENT, fontFamily: "var(--font-body)" }}
          >
            {item.location}
          </p>
          <h3
            className="pt-2 font-extrabold text-(--site-on-dark) text-site-title"
            style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
          >
            {item.company}
          </h3>
        </div>

        <div className="space-y-5">
          <h4
            className="font-bold text-[var(--site-on-dark)] text-site-title"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {item.title}
          </h4>

          {item.summary ? (
            <p className="leading-relaxed text-[var(--site-on-dark)]/55 text-site-subtitle">
              {item.summary}
            </p>
          ) : null}

          {item.highlights.length > 0 ? (
            <ul className="space-y-2.5">
              {item.highlights.map((highlight, highlightIndex) => (
                <li
                  className="flex gap-3 leading-relaxed text-[var(--site-on-dark)]/55 text-site-subtitle"
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
                  className="rounded-md bg-[var(--site-on-dark)]/10 px-3 py-1.5 font-semibold tracking-wide text-[var(--site-on-dark)]/80 text-site-content"
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
