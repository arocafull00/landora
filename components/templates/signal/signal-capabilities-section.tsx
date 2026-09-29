import type { LandingContent } from "@/lib/dashboard-data";
import { SIGNAL_CHROME } from "@/components/templates/signal/signal-copy";
import { getSignalCaseContent } from "@/components/templates/signal/signal-case-content";
import { SignalCaseCard } from "@/components/templates/signal/signal-case-card";

export function SignalCapabilitiesSection({
  content,
  previewLandingId,
  demoMode = false,
}: {
  content: LandingContent;
  previewLandingId?: string;
  demoMode?: boolean;
}) {
  const { cases, clients, heading } = getSignalCaseContent(content);

  if (cases.length === 0) return null;

  return (
    <section
      id="capacidades"
      data-signal-scene="capacidades"
      aria-labelledby="signal-cases-heading"
      className="relative bg-[var(--site-dark)] px-5 py-24 text-[var(--site-on-dark)] sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[110rem]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-12">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.23em] text-[var(--site-accent)]">
              {SIGNAL_CHROME.casesEyebrow}
            </p>
            <h2
              id="signal-cases-heading"
              className="max-w-[17ch] text-[clamp(2.35rem,3.25vw,3.6rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
              style={{ fontFamily: "var(--site-font-display)" }}
            >
              {heading.title}
            </h2>
            {heading.subtitle ? (
              <p className="mt-4 max-w-[38rem] text-base leading-snug text-[var(--site-on-dark)]/70 sm:text-lg">
                {heading.subtitle}
              </p>
            ) : null}
          </div>

          <div className="border-t border-[var(--site-on-dark)]/20 pt-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--site-on-dark)]/55">
              {SIGNAL_CHROME.casesClients}
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 xl:grid-cols-4 lg:mt-7">
              {clients.map((name) => (
                <li
                  key={name}
                  className="flex min-h-10 items-center text-sm font-medium tracking-[-0.03em] text-[var(--site-on-dark)]/75 sm:text-base xl:justify-center xl:border-l xl:border-[var(--site-on-dark)]/20 xl:px-3 xl:first:border-l-0 xl:first:pl-0"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-12 lg:grid-cols-12">
          {cases.map((item, index) => (
            <SignalCaseCard item={item} index={index} key={item.id} previewLandingId={previewLandingId} demoMode={demoMode} />
          ))}
        </div>

        <p className="mt-8 border-t border-[var(--site-on-dark)]/25 pt-5 text-sm text-[var(--site-on-dark)]/65 sm:text-base">
          {SIGNAL_CHROME.casesClosing} <span className="text-[var(--site-accent)]">{SIGNAL_CHROME.casesClosingAccent}</span>
        </p>
      </div>
    </section>
  );
}
