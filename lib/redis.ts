import "server-only";

import { Redis } from "@upstash/redis";
import { serverEnv } from "@/lib/env/server";

export function getRedis() {
  const url = serverEnv.UPSTASH_REDIS_REST_URL;
  const token = serverEnv.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return null;
  }
  return new Redis({ url, token });
}
