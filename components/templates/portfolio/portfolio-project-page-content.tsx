import { notFound } from "next/navigation";
import { PortfolioProjectPage } from "@/components/templates/portfolio/portfolio-project-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { findInternalPortfolioProject } from "@/lib/portfolio-projects";
import { getCopyrightYear } from "@/lib/copyright-year";

export async function PortfolioProjectPageContent({
  projectSlug,
  slug,
}: {
  projectSlug: string;
  slug: string;
}) {
  const [landing, copyrightYear] = await Promise.all([
    getPublishedLandingBySlug(slug),
    getCopyrightYear(),
  ]);
  if (!landing || landing.template !== "portfolio") notFound();

  const content = landing.content;
  const project = findInternalPortfolioProject(
    content.gallery ?? [],
    projectSlug,
  );
  if (!project) notFound();

  return (
    <SiteThemeScope appearance={content.appearance} template="portfolio">
      <PortfolioProjectPage
        content={content}
        copyrightYear={copyrightYear}
        project={project}
      />
    </SiteThemeScope>
  );
}
