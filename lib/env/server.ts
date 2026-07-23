import "server-only";

import { z } from "zod";

const optionalString = z.string().trim().min(1).optional();

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().trim().min(1),
  STRIPE_SECRET_KEY: optionalString,
  STRIPE_WEBHOOK_SECRET: optionalString,
  STRIPE_BOOKING_PRICE_ID: optionalString,
  NEXT_PUBLIC_APP_URL: optionalString,
  NEXT_PUBLIC_STRIPE_PAYMENT_LINK: optionalString,
  NEXT_PUBLIC_STRIPE_BOOKING_PAYMENT_LINK: optionalString,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: optionalString,
  CLOUDINARY_API_KEY: optionalString,
  CLOUDINARY_API_SECRET: optionalString,
  VERCEL_API_TOKEN: optionalString,
  VERCEL_PROJECT_ID: optionalString,
  VERCEL_TEAM_ID: optionalString,
  TURNSTILE_SECRET_KEY: optionalString,
  TURNSTILE_EXPECTED_HOSTNAME: optionalString,
  TURNSTILE_EXPECTED_ACTION: optionalString,
});

const parsedServerEnv = serverEnvSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  STRIPE_BOOKING_PRICE_ID: process.env.STRIPE_BOOKING_PRICE_ID,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_STRIPE_PAYMENT_LINK:
    process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK,
  NEXT_PUBLIC_STRIPE_BOOKING_PAYMENT_LINK:
    process.env.NEXT_PUBLIC_STRIPE_BOOKING_PAYMENT_LINK,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  VERCEL_API_TOKEN: process.env.VERCEL_API_TOKEN,
  VERCEL_PROJECT_ID: process.env.VERCEL_PROJECT_ID,
  VERCEL_TEAM_ID: process.env.VERCEL_TEAM_ID,
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
