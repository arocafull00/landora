CREATE TABLE "user_addons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"addon_type" text NOT NULL,
	"stripe_subscription_id" text,
	"status" "subscription_status",
	"current_period_end" timestamp with time zone,
	"cancel_at_period_end" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_addons_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id"),
	CONSTRAINT "user_addons_user_type_unique" UNIQUE("user_id","addon_type")
);
--> statement-breakpoint
ALTER TABLE "booking_services" ADD COLUMN "price_cents" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_cta" ADD COLUMN "whatsapp_enabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_offers" ADD COLUMN "image" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_offers" ADD COLUMN "features" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "user_addons" ADD CONSTRAINT "user_addons_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_addons_stripe_subscription_id_idx" ON "user_addons" USING btree ("stripe_subscription_id");