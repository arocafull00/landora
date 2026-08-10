import type { RefObject } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { SIGNAL_CHROME, getSignalMark } from "@/components/templates/signal/signal-copy";
import { SignalMedia } from "@/components/templates/signal/signal-media";

export function SignalHero({
  content,
  heroRef,
}: {
  content: LandingContent;
  heroRef?: RefObject<HTMLElement | null>;
}) {
  const brand = content.brand || content.hero.title || "Nova";
  const mark = getSignalMark(brand);
  const rest =
    brand.replace(/\.+$/, "").slice(mark.length) ||
    content.hero.title.slice(mark.length);
  const heroImage = content.hero.image;

  return (
    <section
      ref={heroRef}
      id="hero"
      data-signal-scene="hero"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[var(--site-dark)] px-4 pb-8 pt-24 text-[var(--site-on-dark)] md:px-8"
    >
      {heroImage ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.28] grayscale"
        >
          <SignalMedia
            alt=""
            className="object-cover object-center"
            priority
            sizes="100vw"
            src={heroImage}
          />
          <div className="absolute inset-0 bg-[var(--site-dark)]/55" />
        </div>
      ) : null}

      <div className="relative z-10 flex items-start justify-between gap-6">
        <p
          className="max-w-[16rem] overflow-hidden text-[10px] uppercase tracking-[0.22em] text-[var(--site-on-dark)]/70"
          data-signal-hero-meta
          style={{ fontFamily: "var(--site-font-body)" }}
        >
          {content.hero.eyebrow}
        </p>
        <p
          className="overflow-hidden text-right text-[10px] uppercase tracking-[0.22em] text-[var(--site-on-dark)]/70"
          data-signal-hero-meta
          style={{ fontFamily: "var(--site-font-body)" }}
        >
          {content.hero.description}
        </p>
      </div>

      <div className="relative z-10 flex min-h-[50vh] items-end gap-6">
        <h1
          className="flex flex-wrap items-end gap-x-2 text-[clamp(4.5rem,28vw,18rem)] font-bold uppercase leading-[0.78] tracking-[-0.06em]"
          style={{ fontFamily: "var(--site-font-display)" }}
        >
          <span
            data-signal-hero-mark
            className="relative inline-block will-change-transform"
          >
            <span className="relative z-10 text-[var(--site-on-dark)]">{mark}</span>
            {heroImage ? (
              <span
                aria-hidden
                className="absolute inset-0 z-0 overflow-hidden opacity-40 mix-blend-soft-light"
              >
                <SignalMedia
                  alt=""
                  className="scale-150 object-cover"
                  sizes="40vw"
                  src={heroImage}
                />
              </span>
            ) : null}
          </span>
          <span
            data-signal-hero-rest
            className="inline-block text-[var(--site-on-dark)] will-change-transform"
          >
            {rest}
          </span>
        </h1>
        {heroImage ? (
          <div
            aria-hidden
            className="relative mb-4 hidden h-[42vh] w-[22vw] min-w-36 max-w-64 overflow-hidden border border-[var(--site-on-dark)]/25 lg:block"
            data-signal-hero-meta
          >
            <SignalMedia
              alt=""
              className="object-cover grayscale"
              sizes="22vw"
              src={heroImage}
            />
            <div className="absolute inset-0 bg-[var(--site-accent)]/10" />
          </div>
        ) : null}
      </div>

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p
            className="max-w-md text-sm uppercase tracking-[0.16em] text-[var(--site-on-dark)]/80 md:text-base"
            data-signal-hero-meta
            style={{ fontFamily: "var(--site-font-body)" }}
          >
            {content.hero.subtitle}
          </p>
        </div>
        <p
          className="text-[11px] uppercase tracking-[0.24em] text-[var(--site-accent)]"
          data-signal-scroll-cue
          style={{ fontFamily: "var(--site-font-body)" }}
        >
          {SIGNAL_CHROME.scrollCue}
        </p>
      </div>
    </section>
  );
}
