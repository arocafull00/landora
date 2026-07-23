"use client";

import type { Landing } from "@/lib/dashboard-data";
import { PortfolioAboutPageForm } from "@/components/dashboard/portfolio-about-page-form";
import { usePortfolioAboutPageEditor } from "@/components/dashboard/hooks/use-portfolio-about-page-editor";

export function PortfolioAboutPageEditor({
  landing,
}: {
  landing: Landing;
}) {
  const editor = usePortfolioAboutPageEditor(landing);

  return (
    <PortfolioAboutPageForm
      control={editor.control}
      errors={editor.errors}
      imageField={editor.imageField}
      introField={editor.introField}
      onImageChange={editor.onImageChange}
      onSubmit={editor.onSubmit}
      storyBodyField={editor.storyBodyField}
      storyImageField={editor.storyImageField}
      storyTitleField={editor.storyTitleField}
      templateId={landing.template}
      titleField={editor.titleField}
    />
  );
}
