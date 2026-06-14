"use client";

import Image from "next/image";
import type { TestimonialContent } from "@/lib/dashboard-data";

export function VelarGoogleReview({ testimonial }: { testimonial: TestimonialContent }) {
  return (
    <div className="flex h-full flex-col border border-[#213138]/10 bg-[#f5f0ea] p-6 transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#213138]/10">
          <span
            className="text-lg font-bold text-[#213138]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {testimonial.author.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h4
              data-editor-id={`testimonios:${testimonial.id}:author`}
              className="font-bold text-[#171717]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {testimonial.author}
            </h4>
            <div className="relative h-4 w-16">
              <Image
                src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                alt="Google"
                fill
                sizes="64px"
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
          <p
            className="text-xs text-[#8a8278]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {testimonial.date}
          </p>
        </div>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <div className="flex text-sm text-yellow-400">★★★★★</div>
        <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {testimonial.verified && (
        <p
          className="mb-3 text-xs text-[#8a8278]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Trustindex verifica que la fuente original de la reseña sea Google.
        </p>
      )}
      <div className="flex flex-1 flex-col">
        <p
          data-editor-id={`testimonios:${testimonial.id}:comment`}
          className="mb-4 line-clamp-4 flex-1 text-sm leading-relaxed text-[#171717]/80"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {testimonial.comment}
        </p>
        <button
          type="button"
          className="mt-auto text-left text-sm font-medium text-[#213138] hover:underline"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Leer más
        </button>
      </div>
    </div>
  );
}
