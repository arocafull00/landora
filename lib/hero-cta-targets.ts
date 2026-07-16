import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import { getBookingCtaHref } from "@/lib/booking/cta-href";
import {
  getSectionScrollHref,
  getTemplateSections,
} from "@/lib/template-sections";

function getContactHref(template: TemplateId) {
  const footer = getTemplateSections(template).find(
    (section) => section.editorTabId === "Footer",
  );
  return footer ? getSectionScrollHref(footer) : "#contacto";
}

function getFirstVisibleSectionHref(
  template: TemplateId,
  hiddenSections: string[] | undefined,
) {
  const hidden = new Set(hiddenSections ?? []);
  const section = getTemplateSections(template).find(
    (item) =>
      item.anchor !== "hero" &&
      item.editorTabId !== "Footer" &&
      !hidden.has(item.anchor),
  );
  return section ? getSectionScrollHref(section) : getContactHref(template);
}

export function getHeroCtaTargets(params: {
  bookingEnabled: boolean;
  content: LandingContent;
  slug: string;
  template: TemplateId;
}) {
  const contactHref = getContactHref(params.template);

  return {
    primaryCtaHref: getBookingCtaHref(
      params.bookingEnabled,
      params.slug,
      contactHref,
    ),
    secondaryCtaHref: getFirstVisibleSectionHref(
      params.template,
      params.content.hiddenSections,
    ),
  };
}
