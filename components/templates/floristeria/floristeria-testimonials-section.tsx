"use client";

import { Star } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { FLORISTERIA_ASSETS } from "@/lib/floristeria-assets";

export function FloristeriaTestimonialsSection({ content }: { content: LandingContent }) {
  if (content.testimonials.length === 0) return null;

  const [featured, ...rest] = content.testimonials;
  const textHalo =
    "0 0 20px var(--site-surface), 0 0 6px var(--site-surface)";

  return (
    <section
      id="testimonios"
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${FLORISTERIA_ASSETS.testimonialsBg}')` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[var(--site-surface)]/15"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 border-b border-[var(--site-border)]/15 pb-12" data-aos="fade-up">
          <span
            aria-hidden
            className="mb-6 block text-[clamp(64px,10vw,96px)] leading-none text-[var(--site-dark)]/25"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 700, textShadow: textHalo }}
          >
            &ldquo;
          </span>
          <blockquote
            className="mb-8 max-w-4xl text-pretty text-xl font-light leading-relaxed text-[var(--site-text)] sm:text-2xl md:text-[clamp(22px,2.8vw,32px)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              letterSpacing: "-0.02em",
              textShadow: textHalo,
            }}
          >
            {featured.comment}
          </blockquote>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-0.5">
              {Array.from({ length: featured.rating }).map((_, i) => (
                <Star className="h-4 w-4 fill-[var(--site-primary)] text-[var(--site-primary)]" key={i} />
              ))}
            </div>
            <p
              className="text-sm font-semibold text-[var(--site-text)]"
              style={{ textShadow: textHalo }}
            >
              {featured.author}
            </p>
            {featured.verified && (
              <span className="text-xs text-[var(--site-text-muted)]" style={{ textShadow: textHalo }}>
                Verificado
              </span>
            )}
          </div>
        </div>

        {rest.length > 0 && (
          <div
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
            data-aos="fade-up"
            data-aos-delay="120"
          >
            {rest.map((testimonial) => (
              <div className="border-t border-[var(--site-border)]/15 pt-6" key={testimonial.id}>
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star className="h-3.5 w-3.5 fill-[var(--site-primary)] text-[var(--site-primary)]" key={i} />
                  ))}
                </div>
                <p
                  className="mb-4 text-sm leading-relaxed text-[var(--site-text-muted)]"
                  style={{ textShadow: textHalo }}
                >
                  {testimonial.comment}
                </p>
                <div className="flex items-center justify-between">
                  <p
                    className="text-sm font-semibold text-[var(--site-text)]"
                    style={{ textShadow: textHalo }}
                  >
                    {testimonial.author}
                  </p>
                  {testimonial.verified && (
                    <span className="text-xs text-[var(--site-text-muted)]" style={{ textShadow: textHalo }}>
                      Verificado
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
