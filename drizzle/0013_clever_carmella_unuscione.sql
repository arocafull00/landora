ALTER TABLE "landing_branding" ADD COLUMN IF NOT EXISTS "hidden_sections" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_gallery" ADD COLUMN IF NOT EXISTS "title" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_gallery" ADD COLUMN IF NOT EXISTS "description" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_gallery" ADD COLUMN IF NOT EXISTS "tags" text DEFAULT '' NOT NULL;
