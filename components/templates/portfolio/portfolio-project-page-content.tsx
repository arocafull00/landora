import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { PortfolioProjectPage } from "@/components/templates/portfolio/portfolio-project-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { findInternalPortfolioProject } from "@/lib/portfolio-projects";

export async function PortfolioProjectPageContent({
  projectSlug,
  slug,
}: {
  projectSlug: string;
  slug: string;
}) {
  "use cache";

  cacheLife("max");

  const landing = await getPublishedLandingBySlug(slug);
  if (!landing || landing.template !== "portfolio") notFound();

  const content = landing.content;
  const project = findInternalPortfolioProject(
    content.gallery ?? [],
    projectSlug,
  );
  if (!project) notFound();

  return (
    <SiteThemeScope appearance={content.appearance} template="portfolio">
      <PortfolioProjectPage content={content} project={project} />
    </SiteThemeScope>
  );
}
