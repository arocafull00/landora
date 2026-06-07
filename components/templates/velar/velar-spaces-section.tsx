"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { VelarButton } from "@/components/templates/velar/velar-button";
import { VelarSpaceCard } from "@/components/templates/velar/velar-space-card";

export function VelarSpacesSection({ content }: { content: LandingContent }) {
  if (content.spaces.length === 0) return null;

  return (
    <section
      id="residences"
      className="relative z-[25] bg-[#f5f0ea] px-6 py-20 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16" data-aos="fade-up">
          <p
            className="mb-6 text-center text-xs uppercase tracking-widest text-[#8a8278]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            ESPACIOS ÚNICOS PARA MOMENTOS ESPECIALES
          </p>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h2
                className="mb-6 font-extrabold leading-tight text-[#171717]"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(32px, 5vw, 56px)",
                  letterSpacing: "-0.02em",
                }}
              >
                Nuestros Jardines, el escenario perfecto para tus eventos
              </h2>
            </div>
            <div className="text-center lg:text-left">
              <p
                className="mb-6 text-lg leading-relaxed text-[#171717]/80"
                style={{ fontFamily: "var(--font-body)" }}
              >
                En {content.brand.replace(".", "")} ofrecemos tres espacios exclusivos en Valencia
                y área metropolitana, cada uno con un estilo único para bodas,
                comuniones, celebraciones familiares y eventos de empresa.{" "}
                <strong className="font-semibold text-[#171717]">
                  Disfruta de espacios especiales para hacer de tus
                  celebraciones algo inolvidable.
                </strong>
              </p>
              <div className="flex justify-center lg:justify-start">
                <VelarButton href="#residences" variant="secondary" size="sm" className="uppercase">
                  DESCUBRE NUESTROS ESPACIOS
                </VelarButton>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {content.spaces.map((space, index) => (
            <VelarSpaceCard key={space.id} space={space} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
