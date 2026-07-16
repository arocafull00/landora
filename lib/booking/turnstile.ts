import "server-only";

import { z } from "zod";
import { TURNSTILE_ACTION } from "@/lib/booking/turnstile-config";
import { serverEnv } from "@/lib/env/server";
import { logger } from "@/lib/logger";

const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";
const MAX_TOKEN_LENGTH = 2048;

const turnstileResponseSchema = z.object({
  success: z.boolean().optional(),
  hostname: z.string().optional(),
  action: z.string().optional(),
  "error-codes": z.array(z.string()).optional(),
});

export type TurnstileVerificationResult =
  | { valid: true }
  | {
      valid: false;
      reason:
        | "invalid_token"
        | "configuration_error"
        | "verification_failed"
        | "service_unavailable";
    };

function getTurnstileSecret() {
  if (serverEnv.TURNSTILE_SECRET_KEY) {
    return serverEnv.TURNSTILE_SECRET_KEY;
  }

  if (process.env.NODE_ENV === "development") {
    return TURNSTILE_TEST_SECRET_KEY;
  }

  return null;
}

export async function verifyTurnstileToken(
  token: string,
  ip: string | null,
): Promise<TurnstileVerificationResult> {
  const normalizedToken = token.trim();
  if (!normalizedToken || normalizedToken.length > MAX_TOKEN_LENGTH) {
    return { valid: false, reason: "invalid_token" };
  }

  const secret = getTurnstileSecret();
  if (!secret) {
    logger.error("Turnstile secret is not configured");
    return { valid: false, reason: "configuration_error" };
  }

  const body = new URLSearchParams({ secret, response: normalizedToken });
  const isValidIp = ip && ip !== "unknown" && ip !== "::1" && ip !== "127.0.0.1";
  if (isValidIp) {
    body.set("remoteip", ip);
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) {
      logger.warn(logger.fmt`Turnstile verification returned HTTP ${response.status}`);
      return { valid: false, reason: "service_unavailable" };
    }

    const parsed = turnstileResponseSchema.safeParse(await response.json());
    if (!parsed.success) {
      logger.warn("Turnstile returned an invalid response");
      return { valid: false, reason: "verification_failed" };
    }

    const data = parsed.data;
    if (!data.success) {
      logger.warn(logger.fmt`Turnstile verification failed with ${data["error-codes"] ?? []}`);
      return { valid: false, reason: "verification_failed" };
    }

    const expectedHostname = serverEnv.TURNSTILE_EXPECTED_HOSTNAME;
    if (expectedHostname && data.hostname !== expectedHostname) {
      logger.warn("Turnstile hostname validation failed");
      return { valid: false, reason: "verification_failed" };
    }

    const expectedAction = serverEnv.TURNSTILE_EXPECTED_ACTION ?? TURNSTILE_ACTION;
    if (data.action && data.action !== expectedAction) {
      logger.warn("Turnstile action validation failed");
      return { valid: false, reason: "verification_failed" };
    }

    return { valid: true };
  } catch (error) {
    logger.captureException(error, { action: "verify-turnstile" });
    return { valid: false, reason: "service_unavailable" };
  }
}
