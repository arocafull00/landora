import type {
  LandingContent,
  LandingSectionSelections,
} from "@/lib/dashboard-data";

export const PUBLIC_ANALYTICS_EVENTS = [
  "cta_click",
  "whatsapp_click",
  "phone_click",
  "lead_generated",
] as const;

export type PublicAnalyticsEvent = (typeof PUBLIC_ANALYTICS_EVENTS)[number];

export type PublicTemplateRenderProps = {
  bookingEnabled: boolean;
  content: LandingContent;
  copyrightYear: number;
  renderedAt: Date;
  sectionSelections: LandingSectionSelections;
  slug: string;
};

export type PreviewTemplateRenderProps = {
  bookingEnabled: boolean;
  content: LandingContent;
  copyrightYear: number;
  renderedAt: Date;
  previewLandingId: string;
  sectionSelections: LandingSectionSelections;
  slug: string;
  topOffset: number;
};

export function isPublicAnalyticsEvent(
  value: string | undefined,
): value is PublicAnalyticsEvent {
  return PUBLIC_ANALYTICS_EVENTS.some((event) => event === value);
}
