"use client";

import { PortfolioProjectCarouselControls } from "@/components/templates/portfolio/portfolio-project-carousel-controls";
import { PortfolioProjectCarouselSlide } from "@/components/templates/portfolio/portfolio-project-carousel-slide";
import { usePortfolioProjectCarousel } from "@/components/templates/portfolio/hooks/use-portfolio-project-carousel";

export function PortfolioProjectCarousel({
  alt,
  images,
}: {
  alt: string;
  images: string[];
}) {
  const slides = images.filter(Boolean);
  const {
    activeIndex,
    canScrollNext,
    canScrollPrev,
    scrollerRef,
    scrollNext,
    scrollPrev,
    scrollToIndex,
  } = usePortfolioProjectCarousel(slides.length);

  if (slides.length === 0) return null;

  return (
    <section aria-label="Galería del proyecto" className="w-full">
      <div className="relative">
        <div
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-none"
          ref={scrollerRef}
        >
          {slides.map((image, index) => (
            <div className="min-w-full snap-center" key={`${index}-${image}`}>
              <PortfolioProjectCarouselSlide
                alt={alt}
                index={index}
                src={image}
              />
            </div>
          ))}
        </div>

        <PortfolioProjectCarouselControls
          activeIndex={activeIndex}
          canScrollNext={canScrollNext}
          canScrollPrev={canScrollPrev}
          onNext={scrollNext}
          onPrevious={scrollPrev}
          onSelect={scrollToIndex}
          slideCount={slides.length}
        />
      </div>
    </section>
  );
}
