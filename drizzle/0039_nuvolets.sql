ALTER TYPE "public"."template" ADD VALUE IF NOT EXISTS 'nuvolets';
--> statement-breakpoint
CREATE TABLE "public"."landing_nuvolets" (
  "landing_id" uuid PRIMARY KEY REFERENCES "public"."landing_pages"("id") ON DELETE CASCADE,
  "content" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "public"."email-subscriptions" (
  "email" text NOT NULL,
  "landing_id" uuid NOT NULL REFERENCES "public"."landing_pages"("id") ON DELETE CASCADE,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "email_subscriptions_landing_email_unique" UNIQUE ("landing_id", "email"),
  CONSTRAINT "email_subscriptions_normalized" CHECK ("email" = lower(trim("email")) AND length("email") BETWEEN 3 AND 254)
);
--> statement-breakpoint
CREATE INDEX "email_subscriptions_landing_date_idx" ON "public"."email-subscriptions" ("landing_id", "created_at");
--> statement-breakpoint
ALTER TABLE "public"."landing_nuvolets" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."email-subscriptions" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "public"."landing_nuvolets", "public"."email-subscriptions" FROM anon, authenticated;
