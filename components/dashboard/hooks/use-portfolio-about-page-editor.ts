"use client";

import type { ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type {
  Landing,
  PortfolioAboutPageContent,
} from "@/lib/dashboard-data";
import { portfolioAboutPageSchema } from "@/lib/schemas/portfolio-about";
import { useDashboardStore } from "@/stores/dashboard-store";

function getAboutPageDefaults(landing: Landing): PortfolioAboutPageContent {
  return (
    landing.content.aboutPage ?? {
      title: landing.content.hero.title,
      intro:
        landing.content.story?.statement ??
        landing.content.about?.statement ??
        "",
      image:
        landing.content.hero.image ||
        landing.content.hero.houseImage ||
        "",
      storyTitle: "Mi historia",
      storyBody: "",
      storyImage: "",
    }
  );
}

export function usePortfolioAboutPageEditor(landing: Landing) {
  const updatePortfolioAbout = useDashboardStore(
    (state) => state.updatePortfolioAbout,
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<PortfolioAboutPageContent>({
    defaultValues: getAboutPageDefaults(landing),
    mode: "onChange",
    resolver: zodResolver(portfolioAboutPageSchema),
  });

  const registerTextField = <
    TField extends "title" | "intro" | "storyTitle" | "storyBody",
  >(
    field: TField,
  ) =>
    register(field, {
      onChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        updatePortfolioAbout(landing.id, {
          [field]: event.target.value,
        });
      },
    });

  const onImageChange = (
    field: "image" | "storyImage",
    value: string,
  ) => {
    setValue(field, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    updatePortfolioAbout(landing.id, { [field]: value });
  };

  return {
    control,
    errors,
    imageField: "image" as const,
    introField: registerTextField("intro"),
    onImageChange,
    onSubmit: handleSubmit(() => undefined),
    storyBodyField: registerTextField("storyBody"),
    storyImageField: "storyImage" as const,
    storyTitleField: registerTextField("storyTitle"),
    titleField: registerTextField("title"),
  };
}
