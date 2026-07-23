export function getBookingCtaHref(
  bookingEnabled: boolean,
  slug: string,
  fallbackHref: string,
  previewLandingId?: string,
): string {
  if (bookingEnabled && slug) {
    return previewLandingId ? `/${slug}/book` : "/book";
  }

  return fallbackHref;
}
