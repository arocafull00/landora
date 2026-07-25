import { Suspense } from "react";
import type { Metadata } from "next";
import { PortfolioProjectPageContent } from "@/components/templates/portfolio/portfolio-project-page-content";
import { PublicLandingSkeleton } from "@/components/templates/public-landing-skeleton";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { findInternalPortfolioProject } from "@/lib/portfolio-projects";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";
import { getPublishedPortfolioProjectParams } from "@/lib/public-static-params";

type ProjectPageProps = {
  params: Promise<{ slug: string; projectSlug: string }>;
};

export function generateStaticParams() {
  return getPublishedPortfolioProjectParams();
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug, projectSlug } = await params;
  const landing = await getPublishedLandingBySlug(slug);
  if (!landing || landing.template !== "portfolio") return {};

  const content = landing.content;
  const project = findInternalPortfolioProject(
    content.gallery ?? [],
    projectSlug,
  );
  if (!project) return {};

  const title = project.title || "Proyecto";

  return createPublishedSiteMetadata({
    landing,
    title: `${title} | ${content.brand}`,
    description: project.description || landing.seo.description || "",
    pathname: `/proyectos/${project.projectSlug}`,
    image: project.image,
  });
}

export default function PublicProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<PublicLandingSkeleton />}>
      {params.then(({ slug, projectSlug }) => (
        <PortfolioProjectPageContent projectSlug={projectSlug} slug={slug} />
      ))}
    </Suspense>
  );
}
