import type { RefObject } from "react";
import { ArrowRight } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { SignalHeroArt } from "@/components/templates/signal/signal-hero-art";
import { SignalHeroNote } from "@/components/templates/signal/signal-hero-note";

export function SignalHero({
  content,
  heroRef,
  primaryCtaHref,
}: {
  content: LandingContent;
  heroRef?: RefObject<HTMLElement | null>;
  primaryCtaHref: string;
}) {
  const description = content.hero.description || content.hero.subtitle;
  const titleLines = content.hero.title.split(/\r?\n/);

  return (
    <>
      <section
        ref={heroRef}
        id="hero"
        data-signal-scene="hero"
        className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[var(--site-dark)] px-5 pb-16 pt-36 text-[var(--site-on-dark)] sm:px-8 md:pb-20 md:pt-28 lg:px-12"
      >
        <SignalHeroArt />
        <div className="relative z-10 mx-auto w-full max-w-[100rem]" data-signal-hero-content>
          <div className="flex max-w-xl flex-col items-start lg:max-w-[40rem]">
            <h1
              className="whitespace-pre-line break-words text-[clamp(2.15rem,3.6vw,3.35rem)] font-bold leading-[1.08] tracking-[-0.04em]"
              data-signal-hero-heading
              style={{ fontFamily: "var(--site-font-display)" }}
            >
              {titleLines.map((line, index) => (
                <span key={index} className="block" data-signal-hero-line>
                  {line}
                </span>
              ))}
            </h1>

            {description ? (
              <p
                className="mt-7 max-w-xl text-base leading-relaxed text-[var(--site-on-dark)]/70 sm:text-lg md:mt-9"
                data-signal-hero-detail
                style={{ fontFamily: "var(--site-font-body)" }}
              >
                {description}
              </p>
            ) : null}

            <a
              className="group mt-8 inline-flex min-h-14 items-center gap-8 bg-[var(--site-accent)] px-6 py-4 font-semibold text-[var(--site-on-accent)] transition-colors hover:bg-[var(--site-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-on-dark)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-dark)] md:mt-10"
              data-signal-hero-detail
              data-analytics-event="cta_click lead_generated"
              href={primaryCtaHref}
              style={{ fontFamily: "var(--site-font-body)" }}
            >
              <span>{content.hero.ctaLabel || "Cuéntame cómo trabajáis"}</span>
              <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
      <SignalHeroNote />
    </>
  );
}
