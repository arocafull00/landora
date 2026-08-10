import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { SIGNAL_CHROME, getSignalMark } from "@/components/templates/signal/signal-copy";
import { SignalCtaButton } from "@/components/templates/signal/signal-cta-button";
import { SignalMedia } from "@/components/templates/signal/signal-media";

export function SignalCtaSection({
  content,
  ctaHref,
}: {
  content: LandingContent;
  ctaHref: string;
}) {
  const heading = getSectionHeading(
    content,
    "cta",
    SECTION_HEADING_DEFAULTS.signal.cta,
  );
  const brand = content.brand || content.hero.title;
  const mark = getSignalMark(brand);
  const ctaImage =
    content.gallery?.[4]?.image ||
    content.gallery?.[2]?.image ||
    content.hero.image ||
    "";

  return (
    <section
      id="cta"
      data-signal-scene="cta"
      className="relative min-h-[100svh] overflow-hidden bg-[var(--site-dark)] px-4 pb-0 pt-24 text-[var(--site-on-dark)] md:px-8"
    >
      {ctaImage ? (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-[55%] w-[48%] opacity-30 grayscale"
        >
          <SignalMedia
            alt=""
            className="object-cover"
            sizes="50vw"
            src={ctaImage}
          />
          <div className="absolute inset-0 bg-[var(--site-dark)]/50" />
        </div>
      ) : null}
      <div className="relative z-10">
        <p
          className="text-[10px] uppercase tracking-[0.24em] text-[var(--site-accent)]"
          style={{ fontFamily: "var(--site-font-body)" }}
        >
          {SIGNAL_CHROME.availableNow}
        </p>
        <h2
          className="mt-6 max-w-3xl text-[clamp(2.8rem,10vw,7rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em]"
          style={{ fontFamily: "var(--site-font-display)" }}
        >
          {brand.replace(/\.+$/, "")}
        </h2>
        <p
          className="mt-4 text-sm uppercase tracking-[0.18em] text-[var(--site-on-dark)]/70"
          style={{ fontFamily: "var(--site-font-body)" }}
        >
          {heading.title}
        </p>
        <p
          className="mt-3 max-w-md text-base text-[var(--site-on-dark)]/65"
          style={{ fontFamily: "var(--site-font-body)" }}
        >
          {heading.subtitle || content.hero.subtitle}
        </p>
        <div className="mt-10">
          <SignalCtaButton
            href={ctaHref}
            label={content.hero.ctaLabel || "Empezar proyecto"}
          />
        </div>
        <p
          className="mt-6 text-[11px] uppercase tracking-[0.18em] text-[var(--site-on-dark)]/40"
          style={{ fontFamily: "var(--site-font-body)" }}
        >
          {content.contact.email}
        </p>
      </div>
      <p
        aria-hidden
        className="relative z-10 mt-16 select-none text-[clamp(8rem,42vw,28rem)] font-bold leading-none tracking-[-0.08em] text-[var(--site-accent)]/20"
        data-signal-cta-mark
        style={{ fontFamily: "var(--site-font-display)" }}
      >
        {mark}
      </p>
    </section>
  );
}
