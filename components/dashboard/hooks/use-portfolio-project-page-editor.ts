"use client";

import type { ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type {
  GalleryItem,
  Landing,
} from "@/lib/dashboard-data";
import {
  createPortfolioProjectPageSchema,
  type PortfolioProjectPageFormValues,
} from "@/lib/schemas/portfolio-project";
import { useDashboardStore } from "@/stores/dashboard-store";

function getProjectDefaults(
  project: GalleryItem,
): PortfolioProjectPageFormValues {
  return {
    image: project.image ?? "",
    title: project.title ?? "",
    description: project.description ?? "",
    tags: project.tags ?? [],
    projectSlug: project.projectSlug ?? "",
    projectBody: project.projectBody ?? "",
    projectGallery: project.projectGallery ?? [],
  };
}

export function usePortfolioProjectPageEditor(
  landing: Landing,
  project: GalleryItem,
) {
  const updateSectionItem = useDashboardStore(
    (state) => state.updateSectionItem,
  );
  const usedSlugs = (landing.content.gallery ?? []).flatMap((item) =>
    item.id !== project.id && item.projectSlug ? [item.projectSlug] : [],
  );
  const schema = createPortfolioProjectPageSchema(usedSlugs);
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<PortfolioProjectPageFormValues>({
    defaultValues: getProjectDefaults(project),
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const updateProject = (patch: Partial<GalleryItem>) => {
    updateSectionItem(landing.id, "gallery", project.id, patch);
  };

  const registerTextField = <
    TField extends
      | "title"
      | "description"
      | "projectSlug"
      | "projectBody",
  >(
    field: TField,
  ) =>
    register(field, {
      onChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        updateProject({ [field]: event.target.value });
      },
    });

  return {
    control,
    errors,
    onImageChange: (value: string) => updateProject({ image: value }),
    onProjectGalleryChange: (value: string[]) =>
      updateProject({ projectGallery: value }),
    onSubmit: handleSubmit(() => undefined),
    onTagsChange: (value: string[]) => updateProject({ tags: value }),
    projectBodyField: registerTextField("projectBody"),
    projectSlugField: registerTextField("projectSlug"),
    summaryField: registerTextField("description"),
    titleField: registerTextField("title"),
  };
}
