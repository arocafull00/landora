ALTER TABLE "users" ADD COLUMN "booking_access" boolean NOT NULL DEFAULT false;
ALTER TABLE "users" ADD COLUMN "booking_stripe_subscription_id" text UNIQUE;
