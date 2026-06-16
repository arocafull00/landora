"use client";

import { Star } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { FLORISTERIA_ASSETS } from "@/lib/floristeria-assets";

export function FloristeriaTestimonialsSection({ content }: { content: LandingContent }) {
  if (content.testimonials.length === 0) return null;

  const [featured, ...rest] = content.testimonials;
  const textHalo = "0 0 20px #FAFAF7, 0 0 6px #FAFAF7";

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
        className="pointer-events-none absolute inset-0 bg-[#FAFAF7]/15"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 border-b border-[#1F3A0F]/15 pb-12" data-aos="fade-up">
          <span
            aria-hidden
            className="mb-6 block text-[clamp(64px,10vw,96px)] leading-none text-[#1F3A0F]/25"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 700, textShadow: textHalo }}
          >
            &ldquo;
          </span>
          <blockquote
            className="mb-8 max-w-4xl text-pretty text-xl font-light leading-relaxed text-[#0f0f0f] sm:text-2xl md:text-[clamp(22px,2.8vw,32px)]"
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
                <Star className="h-4 w-4 fill-[#2D5016] text-[#2D5016]" key={i} />
              ))}
            </div>
            <p
              className="text-sm font-semibold text-[#1A1A1A]"
              style={{ textShadow: textHalo }}
            >
              {featured.author}
            </p>
            {featured.verified && (
              <span className="text-xs text-[#333333]" style={{ textShadow: textHalo }}>
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
              <div className="border-t border-[#1F3A0F]/15 pt-6" key={testimonial.id}>
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star className="h-3.5 w-3.5 fill-[#2D5016] text-[#2D5016]" key={i} />
                  ))}
                </div>
                <p
                  className="mb-4 text-sm leading-relaxed text-[#333333]"
                  style={{ textShadow: textHalo }}
                >
                  {testimonial.comment}
                </p>
                <div className="flex items-center justify-between">
                  <p
                    className="text-sm font-semibold text-[#1A1A1A]"
                    style={{ textShadow: textHalo }}
                  >
                    {testimonial.author}
                  </p>
                  {testimonial.verified && (
                    <span className="text-xs text-[#333333]" style={{ textShadow: textHalo }}>
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
