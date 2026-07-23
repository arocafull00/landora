"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { PortfolioProjectCarouselSlide } from "@/components/templates/portfolio/portfolio-project-carousel-slide";

export function PortfolioProjectCarousel({
  alt,
  images,
}: {
  alt: string;
  images: string[];
}) {
  const slides = images.filter(Boolean);
  if (slides.length === 0) return null;

  return (
    <section aria-label="Galería del proyecto" className="w-full">
      <div className="relative">
        <Swiper
          className="project-gallery-swiper"
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".swiper-button-next-project-gallery",
            prevEl: ".swiper-button-prev-project-gallery",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-project-gallery",
          }}
          slidesPerView={1}
          spaceBetween={0}
        >
          {slides.map((image, index) => (
            <SwiperSlide key={`${index}-${image}`}>
              <PortfolioProjectCarouselSlide
                alt={alt}
                index={index}
                src={image}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          aria-label="Anterior"
          className="swiper-button-prev-project-gallery group absolute left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center border border-[var(--site-on-dark)]/30 bg-[var(--site-dark)] transition-colors hover:border-portfolio-accent sm:left-6 md:left-10"
          type="button"
        >
          <ChevronLeft
            aria-hidden
            className="size-5 text-[var(--site-on-dark)] transition-colors group-hover:text-portfolio-accent"
          />
        </button>
        <button
          aria-label="Siguiente"
          className="swiper-button-next-project-gallery group absolute right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center border border-[var(--site-on-dark)]/30 bg-[var(--site-dark)] transition-colors hover:border-portfolio-accent sm:right-6 md:right-10"
          type="button"
        >
          <ChevronRight
            aria-hidden
            className="size-5 text-[var(--site-on-dark)] transition-colors group-hover:text-portfolio-accent"
          />
        </button>

        <div
          className="swiper-pagination-project-gallery absolute inset-x-0 bottom-4 z-10 flex justify-center [--swiper-pagination-bullet-inactive-color:var(--site-on-dark)] [--swiper-pagination-bullet-inactive-opacity:0.45] [--swiper-pagination-color:var(--portfolio-accent)]"
        />
      </div>
    </section>
  );
}
