import { SIGNAL_HERO_NOTE } from "@/components/templates/signal/signal-copy";

export function SignalHeroNote() {
  return (
    <section
      aria-labelledby="signal-hero-note"
      className="relative bg-[var(--site-dark)] px-5 pb-20 pt-2 text-[var(--site-on-dark)] sm:px-8 md:pb-28 lg:px-12"
      data-signal-scene="hero-note"
    >
      <div className="mx-auto w-full max-w-[100rem] border-t border-[var(--site-on-dark)]/20 pt-10 md:pt-14">
        <p
          className="max-w-3xl font-semibold leading-snug tracking-[-0.03em] text-[clamp(1.4rem,2.4vw,2.15rem)]"
          id="signal-hero-note"
          style={{ fontFamily: "var(--site-font-display)" }}
        >
          {SIGNAL_HERO_NOTE.lead}
        </p>
        <p
          className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--site-on-dark)]/70 sm:text-lg"
          style={{ fontFamily: "var(--site-font-body)" }}
        >
          {SIGNAL_HERO_NOTE.body}
        </p>
      </div>
    </section>
  );
}
