import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import {
  getSignalMark,
  getSignalPortalLines,
} from "@/components/templates/signal/signal-copy";
import { SignalPortalLine } from "@/components/templates/signal/signal-portal-line";
import { SignalPortalPlane } from "@/components/templates/signal/signal-portal-plane";

export function SignalInsideSection({ content }: { content: LandingContent }) {
  const statement = content.about?.statement ?? content.story?.statement ?? "";
  const lines = getSignalPortalLines(statement);
  const mark = getSignalMark(content.brand || content.hero.title);
  const heading = getSectionHeading(
    content,
    "portal",
    SECTION_HEADING_DEFAULTS.signal.portal,
  );
  const gallery = content.gallery ?? [];
  const planeA = gallery[0]?.image || content.hero.image || "";
  const planeB = gallery[1]?.image || gallery[0]?.image || content.hero.image || "";

  return (
    <section
      id="portal"
      data-signal-scene="portal"
      className="relative min-h-[100svh] overflow-hidden bg-[var(--site-dark)] px-4 py-24 text-[var(--site-on-dark)] md:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-16 font-bold leading-none text-[var(--site-on-dark)]/[0.06] text-site-content"
        data-signal-portal-plane
        style={{ fontFamily: "var(--site-font-display)" }}
      >
        {mark}
      </div>
      <SignalPortalPlane
        alt={gallery[0]?.title || "Fragmento"}
        className="right-[4%] top-[18%] h-[34vh] w-[28vw] min-w-40 max-w-80"
        src={planeA}
      />
      <SignalPortalPlane
        alt={gallery[1]?.title || "Fragmento"}
        className="bottom-[12%] left-[6%] h-[22vh] w-[34vw] min-w-48 max-w-md rotate-[-4deg]"
        src={planeB}
      />
      <p
        className="relative z-10 mb-10 uppercase tracking-[0.24em] text-[var(--site-accent)] text-site-content"
        style={{ fontFamily: "var(--site-font-body)" }}
      >
        {heading.title}
      </p>
      <div className="relative z-10 space-y-2">
        {lines.map((line, index) => (
          <SignalPortalLine key={`${line}-${index}`} line={line} index={index} />
        ))}
      </div>
      <div
        aria-hidden
        className="relative z-10 mt-16 h-px w-full bg-[var(--site-accent)]"
        data-signal-portal-rule
      />
      {heading.subtitle ? (
        <p
          className="relative z-10 mt-6 max-w-sm text-[var(--site-on-dark)]/60 text-site-content"
          style={{ fontFamily: "var(--site-font-body)" }}
        >
          {heading.subtitle}
        </p>
      ) : null}
    </section>
  );
}
