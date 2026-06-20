import { getRedis } from "@/lib/redis";

const TURNSTILE_CACHE_TTL_SECONDS = 300;

export async function verifyTurnstileToken(token: string, ip: string | null) {
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return true;
  }

  const redis = getRedis();
  const cacheKey = `turnstile:verified:${token}`;

  if (redis) {
    const cached = await redis.get(cacheKey);
    if (cached === "1") {
      return true;
    }
  }

  console.log("[turnstile] verifying token starting with:", token.slice(0, 20));

  const body = new URLSearchParams({ secret, response: token });

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
      },
    );

    if (!response.ok) {
      return false;
    }

    const data = (await response.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };

    const errorCodes = data["error-codes"] ?? [];
    const isDuplicate = errorCodes.includes("timeout-or-duplicate");

    if (data.success || isDuplicate) {
      if (redis) {
        await redis.set(cacheKey, "1", { ex: TURNSTILE_CACHE_TTL_SECONDS });
      }
      return true;
    }

    console.error("[turnstile] verification failed:", errorCodes);
    return false;
  } catch (err) {
    console.error("[turnstile] fetch error:", err);
    return false;
  }
}
