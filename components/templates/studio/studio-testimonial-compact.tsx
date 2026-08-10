import { Star } from "lucide-react";
import type { TestimonialContent } from "@/lib/dashboard-data";

export function StudioTestimonialCompact({
  testimonial,
}: {
  testimonial: TestimonialContent;
}) {
  return (
    <div className="border-t border-white/10 pt-6">
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star className="h-3.5 w-3.5 fill-[var(--site-primary)] text-[var(--site-primary)]" key={i} />
        ))}
      </div>
      <p className="mb-4 leading-relaxed text-white/75 text-site-content">
        {testimonial.comment}
      </p>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-white text-site-content">{testimonial.author}</p>
        {testimonial.verified && (
          <span className="text-[var(--site-primary)] text-site-content">Verificado</span>
        )}
      </div>
    </div>
  );
}
