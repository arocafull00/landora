import type { LandingContent } from "@/lib/dashboard-data";
import { PortfolioWorkHistoryCard } from "@/components/templates/portfolio/portfolio-work-history-card";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

const ACCENT = "var(--site-accent)";

export function PortfolioWorkHistorySection({ content }: { content: LandingContent }) {
  const items = content.workHistory ?? [];
  if (items.length === 0) return null;

  const heading = getSectionHeading(
    content,
    "experiencia",
    SECTION_HEADING_DEFAULTS.portfolio.experiencia,
  );

  return (
    <section id="experiencia" className="scroll-mt-24 bg-[var(--site-surface)] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h2
          className="mb-12 text-balance font-extrabold md:mb-16 text-site-title"
          data-aos="fade-up"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em", color: ACCENT }}
        >
          <span className="relative inline-block">
            {heading.title}
            <span
              className="absolute -bottom-2 left-0 h-1 w-full rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
          </span>
        </h2>

        <div className="space-y-5 md:space-y-6">
          {items.map((item, index) => (
            <PortfolioWorkHistoryCard index={index} item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
