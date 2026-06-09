ALTER TABLE "landing_cta" ADD COLUMN IF NOT EXISTS "cta_label" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_cta" ADD COLUMN IF NOT EXISTS "copyright_suffix" text DEFAULT '| Todos los derechos reservados' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_cta" ADD COLUMN IF NOT EXISTS "copyright_extra" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_cta" ADD COLUMN IF NOT EXISTS "social_links" jsonb DEFAULT '[]'::jsonb NOT NULL;
