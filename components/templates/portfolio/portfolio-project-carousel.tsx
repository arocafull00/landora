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
      <div className="flex snap-x snap-mandatory overflow-x-auto">
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
    </section>
  );
}
