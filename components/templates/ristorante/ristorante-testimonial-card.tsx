import { Star } from "lucide-react";
import type { TestimonialContent } from "@/lib/dashboard-data";

export function RistoranteTestimonialCard({ testimonial }: { testimonial: TestimonialContent }) {
  return (
    <div className="border-t border-[var(--ristorante-foreground)]/10 pt-6">
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            className="h-3.5 w-3.5 fill-[var(--ristorante-foreground)]/80 text-[var(--ristorante-foreground)]/80"
            key={i}
          />
        ))}
      </div>
      <p
        className="mb-4 text-sm leading-relaxed text-[var(--ristorante-foreground)]/70"
        style={{ fontFamily: "var(--font-ristorante-body)", fontWeight: 300 }}
      >
        {testimonial.comment}
      </p>
      <div className="flex items-center justify-between">
        <p
          className="text-sm font-semibold text-[var(--ristorante-foreground)]"
          style={{ fontFamily: "var(--font-ristorante-body)" }}
        >
          {testimonial.author}
        </p>
        {testimonial.verified ? (
          <span
            className="text-xs text-[var(--ristorante-foreground)]/50"
            style={{ fontFamily: "var(--font-ristorante-body)" }}
          >
            Verificado
          </span>
        ) : null}
      </div>
    </div>
  );
}
