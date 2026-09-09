import { ChevronLeft, ChevronRight } from "lucide-react";
import { PortfolioProjectCarouselPaginationDot } from "@/components/templates/portfolio/portfolio-project-carousel-pagination-dot";

const portfolioProjectCarouselControlsCopy = {
  nextLabel: "Siguiente",
  paginationLabel: "Imágenes del proyecto",
  previousLabel: "Anterior",
} as const;

export function PortfolioProjectCarouselControls({
  activeIndex,
  canScrollNext,
  canScrollPrev,
  onNext,
  onPrevious,
  onSelect,
  slideCount,
}: {
  activeIndex: number;
  canScrollNext: boolean;
  canScrollPrev: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSelect: (index: number) => void;
  slideCount: number;
}) {
  if (slideCount <= 1) return null;

  return (
    <>
      <button
        aria-label={portfolioProjectCarouselControlsCopy.previousLabel}
        className="group absolute left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center border border-portfolio-line bg-portfolio-surface transition-colors hover:border-portfolio-accent disabled:pointer-events-none disabled:opacity-40 sm:left-6 md:left-10"
        disabled={!canScrollPrev}
        onClick={onPrevious}
        type="button"
      >
        <ChevronLeft
          aria-hidden
          className="size-5 text-portfolio-ink transition-colors group-hover:text-portfolio-accent"
        />
      </button>
      <button
        aria-label={portfolioProjectCarouselControlsCopy.nextLabel}
        className="group absolute right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center border border-portfolio-line bg-portfolio-surface transition-colors hover:border-portfolio-accent disabled:pointer-events-none disabled:opacity-40 sm:right-6 md:right-10"
        disabled={!canScrollNext}
        onClick={onNext}
        type="button"
      >
        <ChevronRight
          aria-hidden
          className="size-5 text-portfolio-ink transition-colors group-hover:text-portfolio-accent"
        />
      </button>

      <div
        aria-label={portfolioProjectCarouselControlsCopy.paginationLabel}
        className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2"
        role="tablist"
      >
        {Array.from({ length: slideCount }, (_, index) => (
          <PortfolioProjectCarouselPaginationDot
            active={index === activeIndex}
            index={index}
            key={index}
            onSelect={onSelect}
          />
        ))}
      </div>
    </>
  );
}
