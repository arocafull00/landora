import type { TestimonialContent } from "@/lib/dashboard-data";

export function TestimonialCard({ item }: { item: TestimonialContent }) {
  return (
    <blockquote className="flex flex-col rounded-sm bg-white p-6 shadow-sm">
      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: item.rating }).map((_, i) => (
          <span className="text-[#213138]" key={i}>
            ★
          </span>
        ))}
      </div>
      <p className="flex-1 text-base leading-relaxed text-[#171717]/80">
        &ldquo;{item.comment}&rdquo;
      </p>
      <footer className="mt-4 flex items-center gap-3 border-t border-[#171717]/10 pt-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#213138] text-xs font-bold text-white">
          {item.author.charAt(0)}
        </div>
        <div>
          <cite className="not-italic text-sm font-semibold text-[#171717]">
            {item.author}
          </cite>
          {item.verified ? (
            <p className="text-xs text-[#8a8278]">Cliente verificado</p>
          ) : null}
        </div>
      </footer>
    </blockquote>
  );
}
