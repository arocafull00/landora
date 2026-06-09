ALTER TABLE "landing_pages" ADD COLUMN "custom_domain" text;--> statement-breakpoint
ALTER TABLE "landing_pages" ADD CONSTRAINT "landing_pages_custom_domain_unique" UNIQUE("custom_domain");