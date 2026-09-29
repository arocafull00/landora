import { SIGNAL_CHROME } from "@/components/templates/signal/signal-copy";

export function SignalCaseImpact({ impact }: { impact: string }) {
  const [headline, ...rest] = impact.trim().split("\n");
  const body = rest.join("\n").trim();
  if (!headline && !body) return null;

  return (
    <section className="border-t border-[var(--site-on-dark)]/20 pt-8">
      <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--site-accent)]">
        {SIGNAL_CHROME.caseStudyImpact}
      </h2>
      {headline ? (
        <p
          className="mt-5 text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em] text-[var(--site-accent)]"
          style={{ fontFamily: "var(--site-font-display)" }}
        >
          {headline}
        </p>
      ) : null}
      {body ? (
        <div className="mt-5 space-y-4 text-base leading-relaxed text-[var(--site-on-dark)]/85 sm:text-lg">
          {body.split(/\n\n+/).map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </section>
  );
}
