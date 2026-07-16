"use client";

import { AssetImage } from "@/components/ui/asset-image";
import type { LandingContent } from "@/lib/dashboard-data";
import { FLORISTERIA_ASSETS } from "@/lib/floristeria-assets";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { FloristeriaButton } from "@/components/templates/floristeria/floristeria-button";
import { FloristeriaCtaBgLottie } from "@/components/templates/floristeria/floristeria-cta-bg-lottie";
import { useAnalytics } from "@/hooks/use-analytics";

export function FloristeriaCtaSection({ content }: { content: LandingContent }) {
  const { trackCtaClick } = useAnalytics();
  const heading = getSectionHeading(
    content,
    "servicios",
    SECTION_HEADING_DEFAULTS.floristeria.servicios,
  );

  const galleryItem = content.gallery?.[0];
  const galleryImage = galleryItem?.image ?? FLORISTERIA_ASSETS.gallery1;
  const galleryAlt = galleryItem?.title ?? "Creación floral";

  return (
    <section id="servicios" className="scroll-mt-24">
      <div className="grid min-h-[420px] grid-cols-1 lg:min-h-[520px] lg:grid-cols-2">
        <div className="relative flex items-center justify-center bg-[var(--site-surface-muted)] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
          <FloristeriaCtaBgLottie src={FLORISTERIA_ASSETS.ctaBgLottie} />

          <div
            className="relative z-10 mx-auto max-w-md rounded-3xl bg-[var(--site-surface-muted)]/95 px-6 py-8 text-center shadow-[0_0_48px_32px_color-mix(in_srgb,var(--site-surface-muted)_92%,transparent)] backdrop-blur-sm sm:px-8"
            data-aos="fade-up"
          >
            <h2
              className="text-balance text-2xl font-bold text-[var(--site-text)] sm:text-3xl md:text-[clamp(28px,3.5vw,40px)]"
              style={{ fontFamily: "var(--font-body)", letterSpacing: "-0.02em" }}
            >
              {heading.title}
            </h2>

            {heading.subtitle ? (
              <p
                className="mt-5 text-pretty text-base leading-relaxed text-[var(--site-text-muted)] sm:text-lg"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {heading.subtitle}
              </p>
            ) : null}

            <div className="mt-8">
              <FloristeriaButton
                href="#contacto"
                variant="primary"
                size="lg"
                icon={null}
                className="rounded-full px-10"
                onClick={() => trackCtaClick()}
              >
                {content.hero.ctaLabel || "Celebra momentos"}
              </FloristeriaButton>
            </div>
          </div>
        </div>

        <div
          className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-0"
          data-aos="fade-left"
          data-aos-delay="80"
        >
          <AssetImage
            alt={galleryAlt}
            className="object-cover"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            src={galleryImage}
          />
        </div>
      </div>
    </section>
  );
}
