CREATE TABLE "user_addons" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL,
  "addon_type" text NOT NULL,
  "stripe_subscription_id" text,
  "status" "subscription_status",
  "current_period_end" timestamp with time zone,
  "cancel_at_period_end" boolean DEFAULT false,
  "created_at" timestamp with time zone DEFAULT now(),
  CONSTRAINT "user_addons_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action,
  CONSTRAINT "user_addons_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id"),
  CONSTRAINT "user_addons_user_type_unique" UNIQUE("user_id","addon_type")
);

CREATE INDEX "user_addons_stripe_subscription_id_idx" ON "user_addons" USING btree ("stripe_subscription_id");

INSERT INTO "user_addons" ("user_id", "addon_type", "stripe_subscription_id", "status")
SELECT
  "id",
  'bookings',
  "booking_stripe_subscription_id",
  CASE WHEN "booking_access" = true THEN 'active'::subscription_status ELSE NULL END
FROM "users"
WHERE "booking_access" = true OR "booking_stripe_subscription_id" IS NOT NULL;

ALTER TABLE "users" DROP COLUMN "booking_access";
ALTER TABLE "users" DROP COLUMN "booking_stripe_subscription_id";
