import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { OficioProSectionHeader } from "@/components/templates/oficio-pro/oficio-pro-section-header";
import { OficioProTestimonialCard } from "@/components/templates/oficio-pro/oficio-pro-testimonial-card";
import { OficioProTrustCta } from "@/components/templates/oficio-pro/oficio-pro-trust-cta";

export function OficioProTestimonialsSection({ content }: { content: LandingContent }) {
  if (content.testimonials.length === 0) return null;

  const heading = getSectionHeading(
    content,
    "testimonios",
    SECTION_HEADING_DEFAULTS["oficio-pro"].testimonios,
  );
  const [featured, ...rest] = content.testimonials;

  return (
    <section
      className="scroll-mt-24 px-7 py-16 md:px-20 lg:px-32 xl:px-44"
      id="testimonios"
    >
      <div className="mx-auto max-w-7xl">
        <OficioProSectionHeader subtitle={heading.subtitle}>
          {heading.title}
        </OficioProSectionHeader>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <OficioProTestimonialCard featured item={featured} />
          {rest.slice(0, 2).map((item) => (
            <div className="md:col-span-4" key={item.id}>
              <OficioProTestimonialCard item={item} />
            </div>
          ))}
          <OficioProTrustCta />
          {rest.slice(2).map((item) => (
            <div className="md:col-span-6" key={item.id}>
              <OficioProTestimonialCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
