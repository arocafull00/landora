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
          ? "border-[#1F4E79] bg-[#1F4E79] text-white md:col-span-8"
          : "border-[#1F4E79]/10 bg-white text-[#17212B]"
      }`}
    >
      <div className="mb-5 flex gap-1">
        {Array.from({ length: Math.round(item.rating) }).map((_, index) => (
          <Star
            className={`size-4 ${featured ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-[#1F4E79] text-[#1F4E79]"}`}
            key={index}
          />
        ))}
      </div>
      <p className={`text-pretty leading-relaxed ${featured ? "text-lg text-white/90" : "text-sm text-[#4A4A4A]"}`}>
        {item.comment}
      </p>
      <div className="mt-6">
        <p className="font-bold">{item.author}</p>
        <p className={`text-xs ${featured ? "text-white/65" : "text-[#1F4E79]"}`}>
          {item.verified ? "Cliente verificado" : item.date}
        </p>
      </div>
    </article>
  );
}
