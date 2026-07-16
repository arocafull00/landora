import "server-only";

import { z } from "zod";

const optionalString = z.string().trim().min(1).optional();

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().trim().min(1),
  STRIPE_SECRET_KEY: optionalString,
  STRIPE_WEBHOOK_SECRET: optionalString,
  STRIPE_BOOKING_PRICE_ID: optionalString,
  TURNSTILE_SECRET_KEY: optionalString,
  TURNSTILE_EXPECTED_HOSTNAME: optionalString,
  TURNSTILE_EXPECTED_ACTION: optionalString,
});

const parsedServerEnv = serverEnvSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  STRIPE_BOOKING_PRICE_ID: process.env.STRIPE_BOOKING_PRICE_ID,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  TURNSTILE_EXPECTED_HOSTNAME: process.env.TURNSTILE_EXPECTED_HOSTNAME,
  TURNSTILE_EXPECTED_ACTION: process.env.TURNSTILE_EXPECTED_ACTION,
});

if (!parsedServerEnv.success) {
  throw new Error("Invalid server environment configuration");
}

export const serverEnv = parsedServerEnv.data;

export function requireServerEnv(
  key: keyof typeof serverEnv,
): string {
  const value = serverEnv[key];
  if (!value) {
    throw new Error(`${key} is not configured`);
  }

  return value;
}
