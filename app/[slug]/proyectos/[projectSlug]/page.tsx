import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioProjectPage } from "@/components/templates/portfolio/portfolio-project-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getLandingPageBySlug } from "@/data/landing-pages";
import { toLandingContent } from "@/lib/landing-mapper";
import { findInternalPortfolioProject } from "@/lib/portfolio-projects";

type ProjectPageProps = {
  params: Promise<{ slug: string; projectSlug: string }>;
};

async function getProjectPageData(params: ProjectPageProps["params"]) {
  const { slug, projectSlug } = await params;
  const landing = await getLandingPageBySlug(slug);
  if (!landing || landing.template !== "portfolio") return null;

  const content = toLandingContent(landing);
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
    data.project.description || data.landing.seo?.description || "";
  const canonicalBase = data.landing.customDomain
    ? `https://${data.landing.customDomain}`
    : undefined;

  return {
    title: `${title} | ${data.content.brand}`,
    description,
    alternates:
      canonicalBase && data.project.projectSlug
        ? {
            canonical: `${canonicalBase}/proyectos/${data.project.projectSlug}`,
          }
        : undefined,
    icons: data.landing.seo?.favicon
      ? { icon: data.landing.seo.favicon }
      : undefined,
    openGraph: data.project.image
      ? {
          title,
          description,
          images: [data.project.image],
        }
      : undefined,
  };
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
        landingSlug={data.landing.slug}
        project={data.project}
      />
    </SiteThemeScope>
  );
}
