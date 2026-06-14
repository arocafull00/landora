"use client";

import { ChevronDown } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { PortfolioHeroAccentLines } from "@/components/templates/portfolio/portfolio-hero-accent-lines";
import { PortfolioHeroParticles } from "@/components/templates/portfolio/portfolio-hero-particles";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";

export function PortfolioHero({
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
      className="relative min-h-[100dvh] overflow-hidden bg-[#0a0a0a] text-[#fafafa]"
    >
      <PortfolioHeroParticles />
      <PortfolioHeroAccentLines />

      <main className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center">
        <div>
          {content.hero.eyebrow ? (
            <p
              className="mb-3.5 text-xs uppercase tracking-[0.14em] text-[#a1a1aa]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {content.hero.eyebrow}
            </p>
          ) : null}

          <h1
            className="m-0 text-[clamp(32px,8vw,88px)] font-semibold leading-[0.95] text-[#fafafa]"
            style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
          >
            {content.hero.title}
          </h1>

          {content.hero.subtitle ? (
            <p
              className="mt-[18px] text-[clamp(14px,2.2vw,18px)] text-[#a1a1aa]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {content.hero.subtitle}
            </p>
          ) : null}

          <a
            className="pointer-events-auto mt-10 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-semibold tracking-wide text-[#0a0a0a] transition-all hover:bg-white/90 hover:shadow-lg"
            href="#contacto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {content.hero.ctaLabel || "Ver proyectos"}
          </a>
        </div>
      </main>

      <section className="absolute inset-x-0 bottom-0 grid place-items-center gap-3 border-t border-[#27272a] px-6 py-8 text-center">
        <TemplateNavAnchor
          className="inline-flex items-center gap-1.5 text-sm text-[#a1a1aa] transition-colors hover:text-[#fafafa]"
          href="#experiencia"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Show more
          <ChevronDown size={16} aria-hidden />
        </TemplateNavAnchor>
      </section>
    </section>
  );
}
