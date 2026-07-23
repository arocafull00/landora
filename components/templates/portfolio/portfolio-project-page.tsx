"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AssetImage } from "@/components/ui/asset-image";
import { PortfolioAosInit } from "@/components/templates/portfolio/portfolio-aos-init";
import { PortfolioContactSection } from "@/components/templates/portfolio/portfolio-contact-section";
import { PortfolioNav } from "@/components/templates/portfolio/portfolio-nav";
import { PortfolioProjectCarousel } from "@/components/templates/portfolio/portfolio-project-carousel";
import { PortfolioProjectPageTag } from "@/components/templates/portfolio/portfolio-project-page-tag";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
import { usePreviewBridge } from "@/components/dashboard/hooks/use-preview-bridge";
import type { GalleryItem, LandingContent } from "@/lib/dashboard-data";
import {
  getPreviewLandingPath,
  getPublicLandingPath,
} from "@/lib/public-site-url";

export function PortfolioProjectPage({
  content,
  previewLandingId,
  project,
}: {
  content: LandingContent;
  previewLandingId?: string;
  project: GalleryItem;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const previewBridge = usePreviewBridge();
  const homeHref = previewLandingId
    ? getPreviewLandingPath(previewLandingId)
    : getPublicLandingPath();
  const projectsHref = `${homeHref}#proyectos`;
  const title = project.title || "Proyecto";
  const gallery = project.projectGallery ?? [];

  return (
    <TemplateLazyMotion>
      <div
        ref={rootRef}
        className="min-h-screen bg-portfolio-canvas text-portfolio-ink"
      >
        <PortfolioAosInit rootRef={rootRef} />
        <PortfolioNav
          activePage="project"
          brand={content.brand || "Mora."}
          brandLogoImage={content.brandLogoImage ?? ""}
          brandLogoType={content.brandLogoType ?? "text"}
          ctaHref="#contacto"
          ctaLabel={content.hero.ctaLabel ?? ""}
          heroNavTone="dark"
          heroVariantId="portfolio"
          homeHref={homeHref}
          homePageTarget={previewLandingId ? { type: "home" } : undefined}
          navLinks={[]}
          overHero={false}
        />
        <main>
          <section className="px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <Link
                className="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-portfolio-ink-muted transition-colors hover:text-portfolio-ink"
                href={projectsHref}
                onNavigate={() => {
                  if (previewLandingId) {
                    previewBridge?.announcePageTarget({ type: "home" });
                  }
                }}
                prefetch={previewLandingId ? true : undefined}
              >
                <ArrowLeft aria-hidden className="size-4" />
                Volver a proyectos
              </Link>
              <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end lg:gap-20 xl:gap-28">
                <div>
                  {project.tags?.length ? (
                    <ul
                      aria-label="Etiquetas del proyecto"
                      className="mb-7 flex flex-wrap gap-2"
                    >
                      {project.tags.map((tag) => (
                        <PortfolioProjectPageTag key={tag} label={tag} />
                      ))}
                    </ul>
                  ) : null}
                  <h1
                    className="text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] text-portfolio-ink sm:text-5xl md:text-7xl"
                    data-editor-id="project-title"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {title}
                  </h1>
                  {project.description ? (
                    <p
                      className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-portfolio-ink-muted md:text-xl"
                      data-editor-id="project-summary"
                    >
                      {project.description}
                    </p>
                  ) : null}
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-portfolio-surface">
                  {project.image ? (
                    <AssetImage
                      alt={title}
                      className="object-cover"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      src={project.image}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          {project.projectBody ? (
            <section className="border-y border-portfolio-line px-6 py-20 md:px-10 md:py-28 lg:px-16">
              <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.35fr_0.65fr]">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-portfolio-accent">
                  El proyecto
                </p>
                <div
                  className="max-w-3xl whitespace-pre-line text-pretty text-lg leading-8 text-portfolio-ink-muted md:text-xl md:leading-9"
                  data-editor-id="project-body"
                >
                  {project.projectBody}
                </div>
              </div>
            </section>
          ) : null}

          <PortfolioProjectCarousel alt={title} images={gallery} />
        </main>
        <PortfolioContactSection content={content} />
      </div>
    </TemplateLazyMotion>
  );
}
