"use client";

import { Star } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";

export function RistoranteTestimonialsSection({ content }: { content: LandingContent }) {
  if (content.testimonials.length === 0) return null;

  const [featured, ...rest] = content.testimonials;

  return (
    <section className="bg-[#FAF7F2] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 border-b border-[#1C1917]/10 pb-12" data-aos="fade-up">
          <span
            aria-hidden
            className="mb-6 block text-[clamp(64px,10vw,96px)] leading-none text-[#8B2500]/30"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}
          >
            &ldquo;
          </span>
          <blockquote
            className="mb-8 max-w-4xl text-pretty text-xl font-light leading-relaxed text-[#1C1917] sm:text-2xl md:text-[clamp(22px,2.8vw,32px)]"
            style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}
          >
            {featured.comment}
          </blockquote>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-0.5">
              {Array.from({ length: featured.rating }).map((_, i) => (
                <Star className="h-4 w-4 fill-[#8B2500] text-[#8B2500]" key={i} />
              ))}
            </div>
            <p className="text-sm font-semibold text-[#1C1917]">{featured.author}</p>
            {featured.verified && (
              <span className="text-xs text-[#8B2500]">Verificado</span>
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
              <div className="border-t border-[#1C1917]/10 pt-6" key={testimonial.id}>
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star className="h-3.5 w-3.5 fill-[#8B2500] text-[#8B2500]" key={i} />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-[#1C1917]/70">
                  {testimonial.comment}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#1C1917]">{testimonial.author}</p>
                  {testimonial.verified && (
                    <span className="text-xs text-[#8B2500]">Verificado</span>
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
