import type { LandingContent, SectionHeading, TemplateId } from "@/lib/dashboard-data";
import { getRegisteredTemplates } from "@/lib/template-registry";

export const SECTION_HEADING_DEFAULTS = Object.fromEntries(
  getRegisteredTemplates().map((template) => [template.id, template.headings]),
) as Record<TemplateId, Record<string, SectionHeading>>;

export const NAV_ONLY_HEADING_ANCHORS = Object.fromEntries(
  getRegisteredTemplates().map((template) => [
    template.id,
    template.sections
      .filter((section) => !section.editorTabId && Object.hasOwn(template.headings, section.anchor))
      .map((section) => section.anchor),
  ]),
) as Record<TemplateId, string[]>;

export function getSectionHeading(
  content: LandingContent,
  anchor: string,
  fallback: SectionHeading,
): SectionHeading {
  const stored = content.sectionHeadings?.[anchor];
  return {
    title: stored?.title?.trim() ? stored.title : fallback.title,
    subtitle: stored?.subtitle?.trim() ? stored.subtitle : fallback.subtitle,
  };
}

export function hasSectionSubtitle(fallback: SectionHeading): boolean {
  return fallback.subtitle.length > 0;
}
