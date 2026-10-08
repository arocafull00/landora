"use client";

import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import { getRegisteredTemplates } from "@/lib/template-registry";
import type { TemplateId } from "@/lib/dashboard-data";
import type { TemplateRenderProps } from "@/lib/templates/types";

export const TEMPLATE_PREVIEW_COMPONENTS = Object.fromEntries(
  getRegisteredTemplates().map((template) => [template.id, Object.fromEntries([
    [template.rendererVersion, lazy(async () => ({ default: await template.loadComponent() }))],
    ...Object.entries(template.previousRenderers ?? {}).map(([version, loader]) => [version, lazy(async () => ({ default: await loader() }))]),
  ])]),
) as Record<TemplateId, Record<number, LazyExoticComponent<ComponentType<TemplateRenderProps>>>>;

export const TEMPLATE_EDITOR_COMPONENTS = Object.fromEntries(
  getRegisteredTemplates().map((template) => [template.id, lazy(async () => ({ default: await template.loadEditor() }))]),
) as Record<TemplateId, LazyExoticComponent<ComponentType>>;
