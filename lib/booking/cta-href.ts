export function getBookingCtaHref(
  bookingEnabled: boolean,
  slug: string,
  fallbackHref: string,
): string {
  if (bookingEnabled && slug) {
    return `/${slug}/book`;
  }

  return fallbackHref;
}
