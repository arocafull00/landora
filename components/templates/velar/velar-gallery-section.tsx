import type { LandingContent } from "@/lib/dashboard-data";
import { VelarGalleryItem } from "@/components/templates/velar/velar-gallery-item";

function buildTickerText(brand: string) {
  const text = brand || "Velar.";
  return `${text}   `.repeat(8);
}

export function VelarGallerySection({ content }: { content: LandingContent }) {
  if (!content.gallery || content.gallery.length === 0) return null;

  const tickerText = buildTickerText(content.brand);

  return (
    <section
      data-section="listings"
      data-section-label="Galería"
      id="galeria"
      className="s3-gallery-section relative z-25 mt-0 scroll-mt-24 overflow-hidden bg-[var(--site-dark)] md:h-screen"
    >
      <div className="s3-ticker-wrap absolute inset-0 z-0 flex items-center overflow-hidden pointer-events-none select-none">
        <div className="ticker-track flex">
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="whitespace-nowrap text-white text-site-title-lg"
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                paddingRight: "0.3em",
                userSelect: "none",
              }}
            >
              {tickerText}
            </span>
          ))}
        </div>
      </div>

      <div className="s3-gallery-content relative z-[1] flex h-full items-center justify-center lg:p-[clamp(24px,4vw,60px)]">
        <div className="gallery-expand-row grid h-auto w-full max-w-[700px] grid-cols-2 gap-2 overflow-hidden lg:flex lg:h-[70%] lg:max-w-[1200px]">
          {(content.gallery ?? []).map((item) => (
            <VelarGalleryItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
