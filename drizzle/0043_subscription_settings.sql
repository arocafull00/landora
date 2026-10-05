CREATE TABLE "public"."landing_subscription_settings" (
  "landing_id" uuid PRIMARY KEY REFERENCES "public"."landing_pages"("id") ON DELETE CASCADE,
  "settings" jsonb NOT NULL,
  "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "landing_subscription_settings_object" CHECK (jsonb_typeof("settings") = 'object')
);
--> statement-breakpoint
ALTER TABLE "public"."landing_subscription_settings" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "public"."landing_subscription_settings" FROM anon, authenticated;
