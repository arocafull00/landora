import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioProjectPage } from "@/components/templates/portfolio/portfolio-project-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { findInternalPortfolioProject } from "@/lib/portfolio-projects";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";

type ProjectPageProps = {
  params: Promise<{ slug: string; projectSlug: string }>;
};

async function getProjectPageData(params: ProjectPageProps["params"]) {
  const { slug, projectSlug } = await params;
  const landing = await getPublishedLandingBySlug(slug);
  if (!landing || landing.template !== "portfolio") return null;

  const content = landing.content;
  const project = findInternalPortfolioProject(
    content.gallery ?? [],
    projectSlug,
  );
  if (!project) return null;

  return { content, landing, project };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const data = await getProjectPageData(params);
  if (!data) return {};

  const title = data.project.title || "Proyecto";
  const description =
    data.project.description || data.landing.seo.description || "";
  return createPublishedSiteMetadata({
    landing: data.landing,
    title: `${title} | ${data.content.brand}`,
    description,
    pathname: `/proyectos/${data.project.projectSlug}`,
    image: data.project.image,
  });
}

export default async function PublicProjectPage({
  params,
}: ProjectPageProps) {
  const data = await getProjectPageData(params);
  if (!data) notFound();

  return (
    <SiteThemeScope
      appearance={data.content.appearance}
      template="portfolio"
    >
      <PortfolioProjectPage
        content={data.content}
        project={data.project}
      />
    </SiteThemeScope>
  );
}
