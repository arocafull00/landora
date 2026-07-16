export const TURNSTILE_ACTION = "booking";
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";

export const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
  (process.env.NODE_ENV === "development" ? TURNSTILE_TEST_SITE_KEY : null);
