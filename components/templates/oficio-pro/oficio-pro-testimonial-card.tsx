import { Star } from "lucide-react";
import type { TestimonialContent } from "@/lib/dashboard-data";

export function OficioProTestimonialCard({
  item,
  featured = false,
}: {
  featured?: boolean;
  item: TestimonialContent;
}) {
  return (
    <article
      className={`h-full rounded-2xl border p-6 ${
        featured
          ? "border-[var(--site-primary)] bg-[var(--site-primary)] text-white md:col-span-8"
          : "border-[var(--site-primary)]/10 bg-[var(--site-surface)] text-[var(--site-text)]"
      }`}
    >
      <div className="mb-5 flex gap-1">
        {Array.from({ length: Math.round(item.rating) }).map((_, index) => (
          <Star
            className={`size-4 ${featured ? "fill-[var(--site-accent-bright)] text-[var(--site-accent-bright)]" : "fill-[var(--site-primary)] text-[var(--site-primary)]"}`}
            key={index}
          />
        ))}
      </div>
      <p className={`text-pretty leading-relaxed ${featured ? "text-lg text-white/90" : "text-sm text-[var(--site-text-muted)]"}`}>
        {item.comment}
      </p>
      <div className="mt-6">
        <p className="font-bold">{item.author}</p>
        <p className={`text-xs ${featured ? "text-white/65" : "text-[var(--site-primary)]"}`}>
          {item.verified ? "Cliente verificado" : item.date}
        </p>
      </div>
    </article>
  );
}
