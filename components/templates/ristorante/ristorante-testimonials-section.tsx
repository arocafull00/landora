"use client";

import { Star } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { RistoranteTestimonialCard } from "@/components/templates/ristorante/ristorante-testimonial-card";

export function RistoranteTestimonialsSection({ content }: { content: LandingContent }) {
  if (content.testimonials.length === 0) return null;

  const [featured, ...rest] = content.testimonials;

  return (
    <section
      id="testimonios"
      className="scroll-mt-24 bg-[var(--ristorante-secondary)] px-6 py-[clamp(80px,12vw,140px)] md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 border-b border-[var(--ristorante-foreground)]/10 pb-12" data-aos="fade-up">
          <span
            aria-hidden
            className="mb-6 block text-[clamp(64px,10vw,96px)] leading-none text-[var(--ristorante-foreground)]/20"
            style={{ fontFamily: "var(--font-ristorante-display)", fontWeight: 700 }}
          >
            &ldquo;
          </span>
          <blockquote
            className="mb-8 max-w-4xl text-pretty text-xl font-light leading-relaxed text-[var(--ristorante-foreground)] sm:text-2xl md:text-[clamp(22px,2.8vw,32px)]"
            style={{ fontFamily: "var(--font-ristorante-display)", letterSpacing: "-0.02em" }}
          >
            {featured.comment}
          </blockquote>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-0.5">
              {Array.from({ length: featured.rating }).map((_, i) => (
                <Star
                  className="h-4 w-4 fill-[var(--ristorante-foreground)]/80 text-[var(--ristorante-foreground)]/80"
                  key={i}
                />
              ))}
            </div>
            <p
              className="text-sm font-semibold text-[var(--ristorante-foreground)]"
              style={{ fontFamily: "var(--font-ristorante-body)" }}
            >
              {featured.author}
            </p>
            {featured.verified ? (
              <span
                className="text-xs text-[var(--ristorante-foreground)]/50"
                style={{ fontFamily: "var(--font-ristorante-body)" }}
              >
                Verificado
              </span>
            ) : null}
          </div>
        </div>

        {rest.length > 0 ? (
          <div
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
            data-aos="fade-up"
            data-aos-delay="120"
          >
            {rest.map((testimonial) => (
              <RistoranteTestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
