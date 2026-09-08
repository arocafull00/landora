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
              fontFamily: "var(--font-marcellus)",
              letterSpacing: "-0.02em",
            }}
          >
            {heading.title}
          </h2>
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
