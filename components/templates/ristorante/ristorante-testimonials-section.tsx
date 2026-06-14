"use client";

import { Star } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";

export function RistoranteTestimonialsSection({ content }: { content: LandingContent }) {
  if (content.testimonials.length === 0) return null;

  const [featured, ...rest] = content.testimonials;

  return (
    <section
      id="testimonios"
      className="scroll-mt-24 bg-[var(--ristorante-surface)] px-6 py-[clamp(80px,12vw,140px)] md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex min-h-[60vh] flex-col justify-center">
          <blockquote
            className="mb-8 max-w-3xl text-pretty text-[clamp(22px,3vw,36px)] font-light leading-relaxed text-[var(--ristorante-secondary)]"
            style={{ fontFamily: "var(--font-ristorante-display)", letterSpacing: "-0.02em" }}
          >
            {featured.comment}
          </blockquote>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-0.5">
              {Array.from({ length: featured.rating }).map((_, i) => (
                <Star className="h-4 w-4 fill-[var(--ristorante-primary)] text-[var(--ristorante-primary)]" key={i} />
              ))}
            </div>
            <p
              className="text-sm font-semibold text-[var(--ristorante-secondary)]"
              style={{ fontFamily: "var(--font-ristorante-body)" }}
            >
              {featured.author}
            </p>
            {featured.verified ? (
              <span
                className="text-xs text-[var(--ristorante-primary)]"
                style={{ fontFamily: "var(--font-ristorante-body)" }}
              >
                Verificado
              </span>
            ) : null}
          </div>
        </div>

        {rest.length > 0 ? (
          <div className="mx-auto mt-20 max-w-xl space-y-10 border-t border-[var(--ristorante-secondary)]/10 pt-12">
            {rest.map((testimonial) => (
              <div key={testimonial.id}>
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      className="h-3.5 w-3.5 fill-[var(--ristorante-primary)] text-[var(--ristorante-primary)]"
                      key={i}
                    />
                  ))}
                </div>
                <p
                  className="mb-4 text-sm leading-relaxed text-[var(--ristorante-secondary)]/80"
                  style={{ fontFamily: "var(--font-ristorante-body)", fontWeight: 300 }}
                >
                  {testimonial.comment}
                </p>
                <div className="flex items-center justify-between">
                  <p
                    className="text-sm font-semibold text-[var(--ristorante-secondary)]"
                    style={{ fontFamily: "var(--font-ristorante-body)" }}
                  >
                    {testimonial.author}
                  </p>
                  {testimonial.verified ? (
                    <span
                      className="text-xs text-[var(--ristorante-primary)]"
                      style={{ fontFamily: "var(--font-ristorante-body)" }}
                    >
                      Verificado
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
