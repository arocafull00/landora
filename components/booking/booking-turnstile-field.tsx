"use client";

import { Turnstile } from "@marsidev/react-turnstile";

export function BookingTurnstileField({
  onSuccess,
  onExpire,
  onError,
}: {
  onSuccess: (token: string) => void;
  onExpire: () => void;
  onError: () => void;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) {
    return null;
  }

  return (
    <Turnstile
      siteKey={siteKey}
      onSuccess={onSuccess}
      onExpire={onExpire}
      onError={onError}
    />
  );
}
