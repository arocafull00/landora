"use client";

import { ArrowRight } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { OficioProButton } from "@/components/templates/oficio-pro/oficio-pro-button";
import { OficioProCarousel } from "@/components/templates/oficio-pro/oficio-pro-carousel";
import { OficioProSectionHeader } from "@/components/templates/oficio-pro/oficio-pro-section-header";
import { OficioProServiceCard } from "@/components/templates/oficio-pro/oficio-pro-service-card";
import { useAnalytics } from "@/hooks/use-analytics";

function getTaggedImages(content: LandingContent, tag: string) {
  return (content.gallery ?? []).filter((item) => item.tags?.includes(tag));
}

export function OficioProServicesSection({
  anchor,
  category,
  content,
  reverse = false,
}: {
  anchor: "servicios" | "instalaciones";
  category: "Servicios" | "Instalaciones";
  content: LandingContent;
  reverse?: boolean;
}) {
  const items = (content.serviceMenu ?? []).filter((item) => item.category === category);
  const heading = getSectionHeading(
    content,
    anchor,
    SECTION_HEADING_DEFAULTS["oficio-pro"][anchor],
  );
  const images = getTaggedImages(content, anchor);
  const { trackCtaClick } = useAnalytics();

  if (items.length === 0 && images.length === 0) return null;

  return (
    <section
      className="scroll-mt-24 px-7 py-16 md:px-20 lg:px-32 xl:px-44"
      id={anchor}
    >
      <OficioProSectionHeader
        className="text-center"
        subtitle={heading.subtitle}
      >
        {heading.title}
      </OficioProSectionHeader>
      <div
        className={`mx-auto flex max-w-7xl flex-col items-center gap-8 xl:flex-row ${
          reverse ? "xl:flex-row-reverse" : ""
        }`}
      >
        <div className="grid w-full gap-5 xl:w-[44%]">
          {items.map((item, index) => (
            <OficioProServiceCard index={index} item={item} key={item.id} />
          ))}
          <OficioProButton className="w-full sm:w-fit" href="#contacto" onClick={() => trackCtaClick()}>
            Más información
            <ArrowRight className="size-5" />
          </OficioProButton>
        </div>
        <OficioProCarousel images={images} />
      </div>
    </section>
  );
}
