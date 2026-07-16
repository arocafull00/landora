"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import {
  TURNSTILE_ACTION,
  turnstileSiteKey,
} from "@/lib/booking/turnstile-config";

export function BookingTurnstileField({
  onSuccess,
  onExpire,
  onError,
}: {
  onSuccess: (token: string) => void;
  onExpire: () => void;
  onError: () => void;
}) {
  if (!turnstileSiteKey) {
    return null;
  }

  return (
    <Turnstile
      options={{ action: TURNSTILE_ACTION }}
      siteKey={turnstileSiteKey}
      onSuccess={onSuccess}
      onExpire={onExpire}
      onError={onError}
    />
  );
}
