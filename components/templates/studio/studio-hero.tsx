"use client";

import { m } from "motion/react";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { HeroBackground } from "@/components/ui/hero-background";
import { useAnalytics } from "@/hooks/use-analytics";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function StudioHero({
  content,
  heroRef,
  ctaHref,
  secondaryCtaHref,
}: {
  content: LandingContent;
  heroRef: React.RefObject<HTMLElement | null>;
  ctaHref: string;
  secondaryCtaHref: string;
}) {
  const description = content.hero.description || content.hero.subtitle;
  const { trackCtaClick } = useAnalytics();

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden"
    >
      <HeroBackground
        appearance={content.appearance}
        className="bg-right md:bg-bottom"
        src={content.hero.image}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-y-0 left-0 w-full bg-linear-to-r from-black/95 via-black/75 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col px-6 pb-10 pt-24 md:px-10 lg:px-12 lg:pb-14 lg:pt-28">
        <m.p
          className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--site-accent-bright)] sm:text-sm"
          style={{ fontFamily: "var(--font-syne)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
        >
          {content.hero.eyebrow}
        </m.p>

        <m.h1
          className="max-w-4xl text-[clamp(44px,2vw,110px)] font-black uppercase leading-[0.92] text-white"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.035em" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: easeOut }}
        >
          {content.hero.title}
        </m.h1>

        <m.p
          className="mt-2 max-w-4xl text-[clamp(36px,2vw,92px)] font-black uppercase leading-[0.9] text-[var(--site-accent-bright)]"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.03em" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: easeOut }}
        >
          {content.hero.subtitle}
        </m.p>

        <m.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-xl"
          style={{ fontFamily: "var(--font-body)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: easeOut }}
        >
          {description}
        </m.p>

        <m.div
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.82, ease: easeOut }}
        >
          <a
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--site-accent-bright)] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-black transition hover:bg-[var(--site-accent-bright)]"
            href={ctaHref}
            style={{ fontFamily: "var(--font-syne)" }}
            onClick={() => trackCtaClick()}
          >
            {content.hero.ctaLabel || "Reservar cita"}
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--site-accent-bright)]/60 bg-black/25 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--site-accent-soft)] transition hover:bg-[var(--site-accent-bright)]/10"
            href={secondaryCtaHref}
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Descubrir
            <ArrowRight className="h-4 w-4" />
          </a>
        </m.div>

        <m.div
          className="mt-10 flex flex-wrap items-center gap-5 border-t border-white/20 pt-5 text-sm text-white/75 sm:text-base"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.95, ease: easeOut }}
          style={{ fontFamily: "var(--font-body)" }}
        >
          <div className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[var(--site-accent-bright)]" />
            <span>{content.contact.address}</span>
          </div>
          <div className="h-4 w-px bg-white/30" />
          <div className="inline-flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-[var(--site-accent-bright)]" />
            <span>Lun - Sáb: 10:00 - 20:00</span>
          </div>
        </m.div>
      </div>
    </section>
  );
}
