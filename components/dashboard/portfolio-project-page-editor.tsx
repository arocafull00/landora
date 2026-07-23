"use client";

import type { GalleryItem, Landing } from "@/lib/dashboard-data";
import { PortfolioProjectPageForm } from "@/components/dashboard/portfolio-project-page-form";
import { usePortfolioProjectPageEditor } from "@/components/dashboard/hooks/use-portfolio-project-page-editor";

export function PortfolioProjectPageEditor({
  landing,
  project,
}: {
  landing: Landing;
  project: GalleryItem;
}) {
  const editor = usePortfolioProjectPageEditor(landing, project);

  return (
    <PortfolioProjectPageForm
      control={editor.control}
      errors={editor.errors}
      onImageChange={editor.onImageChange}
      onProjectGalleryChange={editor.onProjectGalleryChange}
      onSubmit={editor.onSubmit}
      onTagsChange={editor.onTagsChange}
      projectBodyField={editor.projectBodyField}
      projectSlugField={editor.projectSlugField}
      summaryField={editor.summaryField}
      templateId={landing.template}
      titleField={editor.titleField}
    />
  );
}
