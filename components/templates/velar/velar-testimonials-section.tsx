"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { LandingContent } from "@/lib/dashboard-data";
import { VelarGoogleReview } from "@/components/templates/velar/velar-google-review";

export function VelarTestimonialsSection({ content }: { content: LandingContent }) {
  if (content.testimonials.length === 0) return null;

  return (
    <section className="relative z-[25] bg-[#f5f0ea] px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center" data-aos="fade-up">
          <p
            className="mb-6 text-xs uppercase tracking-widest text-[#8a8278]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            testimonios
          </p>
          <h2
            className="mb-8 font-extrabold leading-tight text-[#171717]"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "-0.02em",
            }}
          >
            Lo que nuestros clientes dicen de nosotros
          </h2>
          <div className="mb-4 flex items-center justify-center gap-4">
            <span
              className="text-2xl font-bold text-[#171717]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              EXCELENTE
            </span>
            <div className="flex text-xl text-yellow-400">★★★★★</div>
          </div>
          <p
            className="mb-2 text-[#171717]/70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            En base a{" "}
            <strong className="font-semibold text-[#171717]">194 reseñas</strong>
          </p>
          <div className="flex justify-center">
            <div className="relative h-6 w-20">
              <Image
                src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                alt="Google"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="relative px-2 sm:px-8 lg:px-12" data-aos="fade-up" data-aos-delay="100">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              nextEl: ".swiper-button-next-testimonios",
              prevEl: ".swiper-button-prev-testimonios",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-testimonios",
            }}
            className="testimonios-swiper"
          >
            {content.testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <VelarGoogleReview testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            className="swiper-button-prev-testimonios absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#213138]/20 bg-[#f5f0ea] transition-colors hover:bg-[#213138] hover:text-[#e8e4df] group sm:flex"
            aria-label="Anterior"
          >
            <svg
              className="h-6 w-6 text-[#213138] group-hover:text-[#e8e4df]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            className="swiper-button-next-testimonios absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#213138]/20 bg-[#f5f0ea] transition-colors hover:bg-[#213138] hover:text-[#e8e4df] group sm:flex"
            aria-label="Siguiente"
          >
            <svg
              className="h-6 w-6 text-[#213138] group-hover:text-[#e8e4df]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="swiper-pagination-testimonios mt-8 flex justify-center" />
        </div>
      </div>
    </section>
  );
}
