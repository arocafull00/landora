"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, X } from "lucide-react";
import type { GalleryItem } from "@/lib/dashboard-data";
import { SignalMedia } from "@/components/templates/signal/signal-media";
import { SIGNAL_CHROME } from "@/components/templates/signal/signal-copy";
import { SignalCaseStudySection } from "@/components/templates/signal/signal-case-study-section";

export function SignalCaseStudy({
  item,
  onClose,
  onContact,
}: {
  item: GalleryItem;
  onClose: () => void;
  onContact: () => void;
}) {
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    panelRef.current?.focus();
  }, [item.id]);

  const impactLines = (item.caseImpact ?? "").trim().split("\n");
  const impactHeadline = impactLines[0]?.trim() ?? "";
  const impactBody = impactLines.slice(1).join("\n").trim();

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6 lg:p-10">
      <button
        aria-label={SIGNAL_CHROME.caseStudyClose}
        className="absolute inset-0 bg-[var(--site-dark)]/80 backdrop-blur-[2px] motion-reduce:backdrop-blur-none"
        onClick={onClose}
        type="button"
      />
      <article
        ref={panelRef}
        aria-labelledby="signal-case-study-title"
        aria-modal="true"
        className="relative flex max-h-[min(94vh,56rem)] w-full max-w-[52rem] flex-col overflow-hidden border border-[var(--site-on-dark)]/25 bg-[var(--site-dark)] text-[var(--site-on-dark)] motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transition-none sm:max-h-[min(88vh,56rem)]"
        role="dialog"
        tabIndex={-1}
      >
        {item.image ? (
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden opacity-50 sm:h-48">
            <SignalMedia
              alt=""
              className="object-cover object-center grayscale"
              sizes="(max-width: 768px) 100vw, 52rem"
              src={item.image}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--site-dark)]" />
          </div>
        ) : null}

        <div className="relative flex items-start justify-between gap-4 border-b border-[var(--site-on-dark)]/20 px-5 py-5 sm:px-8 sm:py-6">
          <div className="min-w-0">
            {item.title ? (
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--site-on-dark)]/55">
                {item.title}
              </p>
            ) : null}
            <h2
              id="signal-case-study-title"
              className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-tight tracking-[-0.035em]"
              style={{ fontFamily: "var(--site-font-display)" }}
            >
              {item.description}
            </h2>
            {item.tags?.[0] ? (
              <p className="mt-3 text-[0.65rem] uppercase tracking-[0.2em] text-[var(--site-on-dark)]/55">
                {item.tags[0]}
              </p>
            ) : null}
          </div>
          <button
            aria-label={SIGNAL_CHROME.caseStudyClose}
            className="flex size-10 shrink-0 items-center justify-center border border-[var(--site-on-dark)]/30 text-[var(--site-on-dark)] transition-colors hover:border-[var(--site-accent)] hover:text-[var(--site-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>

        <div className="relative overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
          <div className="space-y-8">
            <SignalCaseStudySection
              body={item.caseProblem ?? ""}
              label={SIGNAL_CHROME.caseStudyProblem}
            />
            <SignalCaseStudySection
              body={item.projectBody ?? ""}
              label={SIGNAL_CHROME.caseStudySolution}
            />
            {impactHeadline || impactBody ? (
              <section className="border-t border-[var(--site-on-dark)]/20 pt-8">
                <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--site-accent)]">
                  {SIGNAL_CHROME.caseStudyImpact}
                </h3>
                {impactHeadline ? (
                  <p
                    className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-none tracking-[-0.04em] text-[var(--site-accent)]"
                    style={{ fontFamily: "var(--site-font-display)" }}
                  >
                    {impactHeadline}
                  </p>
                ) : null}
                {impactBody ? (
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--site-on-dark)]/85 sm:text-lg">
                    {impactBody.split(/\n\n+/).map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
              </section>
            ) : null}
            <SignalCaseStudySection
              body={item.caseMethod ?? ""}
              label={SIGNAL_CHROME.caseStudyMethod}
            />
          </div>

          <div className="mt-12 border-t border-[var(--site-on-dark)]/25 pt-8">
            <p
              className="text-xl font-medium tracking-[-0.03em] sm:text-2xl"
              style={{ fontFamily: "var(--site-font-display)" }}
            >
              {SIGNAL_CHROME.caseStudyCtaLead}
            </p>
            <button
              className="mt-5 inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--site-on-dark)] underline decoration-[var(--site-on-dark)]/60 underline-offset-[6px] transition-colors hover:text-[var(--site-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]"
              onClick={onContact}
              type="button"
            >
              {SIGNAL_CHROME.caseStudyCtaAction}
              <ArrowRight aria-hidden className="size-4" />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
