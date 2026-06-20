import { Ratelimit } from "@upstash/ratelimit";
import { getRedis } from "@/lib/redis";

export async function checkBookingRateLimit(ip: string, tenantId?: string) {
  const redis = getRedis();
  if (!redis) {
    return { success: true };
  }

  const ipLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1 h"),
    prefix: "booking:create:ip",
  });

  const ipResult = await ipLimiter.limit(ip);
  if (!ipResult.success) {
    return { success: false as const, reason: "rate_limit_ip" };
  }

  if (!tenantId) {
    return { success: true };
  }

  const tenantLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1 h"),
    prefix: "booking:create:tenant",
  });

  const tenantResult = await tenantLimiter.limit(`${ip}:${tenantId}`);
  if (!tenantResult.success) {
    return { success: false as const, reason: "rate_limit_tenant" };
  }

  return { success: true };
}

export async function checkCancelRateLimit(ip: string) {
  const redis = getRedis();
  if (!redis) {
    return { success: true };
  }

  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 h"),
    prefix: "booking:cancel:ip",
  });

  const result = await limiter.limit(ip);
  if (!result.success) {
    return { success: false as const };
  }

  return { success: true };
}
