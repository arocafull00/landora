import type { LandingContent } from "@/lib/dashboard-data";
import { isSectionVisible } from "@/lib/template-sections";

export function getBookingCtaHref(
  content: LandingContent,
  bookingEnabled: boolean,
  fallbackHref: string,
): string {
  if (bookingEnabled && isSectionVisible(content, "reservas")) {
    return "#reservas";
  }

  return fallbackHref;
}
