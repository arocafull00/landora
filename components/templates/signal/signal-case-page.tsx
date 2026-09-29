import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { GalleryItem, LandingContent } from "@/lib/dashboard-data";
import { SignalCaseImpact } from "@/components/templates/signal/signal-case-impact";
import { SignalCaseStudySection } from "@/components/templates/signal/signal-case-study-section";
import { SignalContactSection } from "@/components/templates/signal/signal-contact-section";
import { SIGNAL_CHROME } from "@/components/templates/signal/signal-copy";
import { SignalMedia } from "@/components/templates/signal/signal-media";

export function SignalCasePage({
  content,
  copyrightYear,
  homeHref,
  item,
  previewMode = false,
  slug,
}: {
  content: LandingContent;
  copyrightYear: number;
  homeHref: string;
  item: GalleryItem;
  previewMode?: boolean;
  slug: string;
}) {
  const casesHref = `${homeHref}#capacidades`;

  return (
    <div className="min-h-screen bg-[var(--site-dark)] text-[var(--site-on-dark)]">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--site-accent)] focus:px-3 focus:py-2 focus:text-[var(--site-on-accent)]"
        href="#main-content"
      >
        {SIGNAL_CHROME.skipLink}
      </a>
      <header className="border-b border-[var(--site-on-dark)]/20 px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[100rem] flex-wrap items-center justify-between gap-6">
          <Link
            className="font-bold uppercase tracking-[0.12em] text-[var(--site-on-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]"
            href={homeHref}
            style={{ fontFamily: "var(--site-font-display)" }}
          >
            {content.brand || content.hero.title}
          </Link>
          <Link
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--site-on-dark)]/75 transition-colors hover:text-[var(--site-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]"
            href={casesHref}
          >
            <ArrowLeft aria-hidden className="size-4" />
            {SIGNAL_CHROME.caseStudyBack}
          </Link>
        </div>
      </header>

      <main id="main-content">
        <article className="mx-auto max-w-[100rem] px-5 pb-24 pt-16 sm:px-8 sm:pt-24 lg:px-12 lg:pb-32">
          <div className="max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.23em] text-[var(--site-accent)]">
              {SIGNAL_CHROME.casesEyebrow}
            </p>
            {item.title ? (
              <p className="mt-8 text-sm uppercase tracking-[0.2em] text-[var(--site-on-dark)]/60">
                {item.title}
              </p>
            ) : null}
            <h1
              className="mt-4 text-balance text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[1.03] tracking-[-0.05em]"
              style={{ fontFamily: "var(--site-font-display)" }}
            >
              {item.description || item.title}
            </h1>
            {item.tags?.[0] ? (
              <p className="mt-7 text-xs uppercase tracking-[0.2em] text-[var(--site-on-dark)]/60">
                {item.tags[0]}
              </p>
            ) : null}
          </div>

          {item.image ? (
            <div className="relative mt-12 aspect-[16/9] overflow-hidden border border-[var(--site-on-dark)]/20 sm:mt-16">
              <SignalMedia alt={item.title || item.description || SIGNAL_CHROME.caseImageAlt} className="object-cover" priority sizes="(max-width: 1600px) 100vw, 1600px" src={item.image} />
            </div>
          ) : null}

          <div className="mt-16 grid gap-12 border-t border-[var(--site-on-dark)]/20 pt-12 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
            <p className="text-xs font-semibold uppercase tracking-[0.23em] text-[var(--site-accent)]">
              {SIGNAL_CHROME.caseStudyDetail}
            </p>
            <div className="space-y-10">
              <SignalCaseStudySection body={item.caseProblem ?? ""} label={SIGNAL_CHROME.caseStudyProblem} />
              <SignalCaseStudySection body={item.projectBody ?? ""} label={SIGNAL_CHROME.caseStudySolution} />
              <SignalCaseImpact impact={item.caseImpact ?? ""} />
              <SignalCaseStudySection body={item.caseMethod ?? ""} label={SIGNAL_CHROME.caseStudyMethod} />
            </div>
          </div>

          <div className="mt-20 border-t border-[var(--site-on-dark)]/20 pt-10 lg:mt-28">
            <p className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl" style={{ fontFamily: "var(--site-font-display)" }}>
              {SIGNAL_CHROME.caseStudyCtaLead}
            </p>
            <a
              className="mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--site-on-dark)] underline decoration-[var(--site-on-dark)]/60 underline-offset-[6px] transition-colors hover:text-[var(--site-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]"
              href="#contacto"
            >
              {SIGNAL_CHROME.caseStudyCtaAction}
              <ArrowRight aria-hidden className="size-4" />
            </a>
          </div>
        </article>
      </main>

      <SignalContactSection content={content} copyrightYear={copyrightYear} previewMode={previewMode} slug={slug} />
    </div>
  );
}
