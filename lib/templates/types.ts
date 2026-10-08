import type { ComponentType } from "react";
import type { ZodType } from "zod";
import type { LandingContent, LandingSectionSelections, TemplateId } from "@/lib/dashboard-data";
import type { LandingSectionKey } from "@/lib/landing-content-gaps";

export type EditorTab = {
  id: string;
  label: string;
  group?: "section" | "config";
};

export type TemplateSectionDef = {
  anchor: string;
  label: string;
  editorTabId?: string;
  navHref?: string;
  required?: boolean;
  separatePage?: boolean;
  contentKeys?: LandingSectionKey[];
};

export type PaletteOption = {
  id: string;
  label: string;
  description: string;
  colorScheme: "light" | "dark";
};

export type TemplateRenderProps = {
  bookingEnabled?: boolean;
  content: LandingContent;
  copyrightYear: number;
  renderedAt: Date;
  sectionSelections?: LandingSectionSelections;
  slug?: string;
  topOffset?: number;
  previewLandingId?: string;
  demoMode?: boolean;
};

export type TemplateDefinition = {
  id: TemplateId;
  label: string;
  description: string;
  retired: boolean;
  contentVersion: number;
  rendererVersion: number;
  previousRenderers?: Record<number, () => Promise<ComponentType<TemplateRenderProps>>>;
  templateDataSchema?: ZodType<Record<string, unknown>, Record<string, unknown>>;
  contentMigrations?: Record<number, (content: Record<string, unknown>) => Record<string, unknown>>;
  validateContent?: (content: Record<string, unknown>) => boolean;
  validateSections?: (sections: Record<string, Record<string, unknown>>) => boolean;
  capabilities: {
    newsletter: boolean;
    booking: boolean;
  };
  sections: TemplateSectionDef[];
  storageSections: LandingSectionKey[];
  headings: Record<string, { title: string; subtitle: string }>;
  paletteOptions: readonly PaletteOption[];
  editorTabs: EditorTab[];
  loadContent: () => Promise<LandingContent>;
  loadImageOptions: () => Promise<readonly { value: string; label: string }[]>;
  loadComponent: () => Promise<ComponentType<TemplateRenderProps>>;
  loadEditor: () => Promise<ComponentType>;
};
