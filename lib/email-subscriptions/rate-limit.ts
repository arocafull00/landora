import "server-only";

import { createHash } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { requireServerEnv } from "@/lib/env/server";

export async function checkNewsletterRateLimit(ip: string, landingId: string) {
  const redis = new Redis({ url: requireServerEnv("UPSTASH_REDIS_REST_URL"), token: requireServerEnv("UPSTASH_REDIS_REST_TOKEN") });
  const limiter = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, "1 h"), prefix: "newsletter:create", timeout: 0 });
  const key = createHash("sha256").update(`${ip}:${landingId}`).digest("hex");
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const result = await Promise.race([limiter.limit(key), new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("Newsletter rate limit timed out")), 5000); })]);
    return result.success;
  } finally {
    clearTimeout(timer);
  }
}
