import Image from "next/image";
import { Star } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { VelarGoogleReview } from "@/components/templates/velar/velar-google-review";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function VelarTestimonialsSection({ content }: { content: LandingContent }) {
  if (content.testimonials.length === 0) return null;

  const heading = getSectionHeading(
    content,
    "testimonios",
    SECTION_HEADING_DEFAULTS.velar.testimonios,
  );

  return (
    <section
      data-section="testimonios"
      data-section-label="Testimonios"
      id="testimonios"
      className="relative z-[25] scroll-mt-24 bg-[var(--site-surface)] px-6 py-20 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center" data-aos="fade-up">
          <p className="mb-6 uppercase tracking-widest text-[var(--site-accent)] text-site-content">
            testimonios
          </p>
          <h2
            data-editor-id="testimonios:heading:title"
            className="mb-8 font-extrabold leading-tight text-[var(--site-text)]"
            style={{
              fontFamily: "var(--font-syne)",
letterSpacing: "-0.02em",
            }}
          >
            {heading.title}
          </h2>
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="font-bold text-[var(--site-text)] text-site-title">
              EXCELENTE
            </span>
            <span className="flex gap-0.5 text-warning" aria-label="5 de 5 estrellas">
              {Array.from({ length: 5 }, (_, index) => (
                <Star aria-hidden className="size-5 fill-current" key={index} />
              ))}
            </span>
          </div>
          <p className="mb-2 text-[var(--site-text)]/70">
            En base a <strong className="font-semibold text-[var(--site-text)]">194 reseñas</strong>
          </p>
          <div className="flex justify-center">
            <div className="relative h-6 w-20">
              <Image
                alt="Google"
                className="object-contain"
                fill
                sizes="80px"
                src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                unoptimized
              />
            </div>
          </div>
        </div>

        <div
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-2 pb-4 sm:px-8 lg:px-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {content.testimonials.map((testimonial) => (
            <div
              className="min-w-[min(86vw,24rem)] snap-start sm:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(33.333%-1rem)]"
              key={testimonial.id}
            >
              <VelarGoogleReview testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
