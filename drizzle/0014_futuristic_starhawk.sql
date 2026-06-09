ALTER TABLE "landing_branding" ADD COLUMN "brand_logo_type" text DEFAULT 'text' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_branding" ADD COLUMN "brand_logo_image" text DEFAULT '' NOT NULL;