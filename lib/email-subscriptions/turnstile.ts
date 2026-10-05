import "server-only";

import { z } from "zod";
import { requireServerEnv } from "@/lib/env/server";

const responseSchema = z.object({ success: z.boolean(), action: z.string().optional(), hostname: z.string().optional() });

export async function verifyNewsletterToken(token: string, hostname: string) {
  const secret = requireServerEnv("TURNSTILE_SECRET_KEY");
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token }),
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) return false;
  const parsed = responseSchema.safeParse(await response.json());
  return parsed.success && parsed.data.success && parsed.data.action === "newsletter" && parsed.data.hostname === hostname;
}
