CREATE TYPE "public"."offer_type" AS ENUM('hero_banner', 'promotion_cards');--> statement-breakpoint
CREATE TABLE "landing_offers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"sort_order" integer NOT NULL,
	"type" "offer_type" NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"badge" text DEFAULT '' NOT NULL,
	"cta_text" text DEFAULT '' NOT NULL,
	"expires_at" timestamp with time zone,
	"enabled" boolean DEFAULT true NOT NULL,
	"cards" jsonb DEFAULT '[]'::jsonb NOT NULL
);
--> statement-breakpoint
ALTER TABLE "landing_offers" ADD CONSTRAINT "landing_offers_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "landing_offers_landing_id_sort_idx" ON "landing_offers" USING btree ("landing_id","sort_order");