"use client";

import { m } from "motion/react";
import type { LandingContent } from "@/lib/dashboard-data";
import { HeroBackground } from "@/components/ui/hero-background";
import { isBackgroundPreset } from "@/lib/background-assets";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function FloristeriaHero({
  content,
  heroRef,
}: {
  content: LandingContent;
  heroRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden"
    >
      {isBackgroundPreset(content.hero.image) ? (
        <HeroBackground src={content.hero.image} template="floristeria" />
      ) : (
        <video
          aria-label="Background video"
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted
          playsInline
          poster={content.hero.image}
          tabIndex={-1}
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260422_191657_800d4e1f-7ab3-41af-90b6-9bd3039eb294.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <m.p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/90"
          style={{ fontFamily: "var(--font-body)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
        >
          {content.hero.eyebrow}
        </m.p>

        <m.h1
          className="mb-6 text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-[clamp(56px,7vw,88px)]"
          style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: easeOut }}
        >
          {content.hero.title}
        </m.h1>

        <m.p
          className="mb-10 max-w-lg text-lg leading-relaxed text-white/90"
          style={{ fontFamily: "var(--font-body)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: easeOut }}
        >
          {content.hero.subtitle}
        </m.p>

        <m.a
          className="rounded-full bg-[#2D5016] px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-all hover:bg-[#234012] hover:shadow-lg"
          href="#contacto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: easeOut }}
        >
          {content.hero.ctaLabel || "Hacer pedido"}
        </m.a>
      </div>
    </section>
  );
}
