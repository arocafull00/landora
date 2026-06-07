"use client";

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
          <Star className="h-3.5 w-3.5 fill-[#8b7355] text-[#8b7355]" key={i} />
        ))}
      </div>
      <p className="mb-4 text-sm leading-relaxed text-white/75">
        {testimonial.comment}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">{testimonial.author}</p>
        {testimonial.verified && (
          <span className="text-xs text-[#8b7355]">Verificado</span>
        )}
      </div>
    </div>
  );
}
