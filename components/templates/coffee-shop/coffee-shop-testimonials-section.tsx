"use client";

import { Star } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";

export function CoffeeShopTestimonialsSection({ content }: { content: LandingContent }) {
  if (content.testimonials.length === 0) return null;

  return (
    <section
      id="testimonios"
      className="scroll-mt-24 bg-[var(--coffee-surface)] px-6 py-[clamp(72px,10vw,120px)] md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.testimonials.map((testimonial) => (
            <blockquote
              className="flex h-full flex-col rounded-2xl bg-[var(--coffee-muted)] p-6"
              key={testimonial.id}
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    className="h-4 w-4 fill-[var(--coffee-accent)] text-[var(--coffee-accent)]"
                    key={i}
                  />
                ))}
              </div>
              <p
                className="flex-1 text-pretty text-sm leading-relaxed text-[var(--coffee-secondary)]/85"
                style={{ fontFamily: "var(--font-coffee-body)" }}
              >
                {testimonial.comment}
              </p>
              <footer className="mt-6 flex items-center justify-between gap-3">
                <cite
                  className="text-sm font-semibold not-italic text-[var(--coffee-secondary)]"
                  style={{ fontFamily: "var(--font-coffee-body)" }}
                >
                  {testimonial.author}
                </cite>
                {testimonial.verified ? (
                  <span
                    className="text-xs text-[var(--coffee-accent)]"
                    style={{ fontFamily: "var(--font-coffee-body)" }}
                  >
                    Verificado
                  </span>
                ) : null}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
