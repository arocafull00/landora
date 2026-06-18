CREATE TABLE "domain_checks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_page_id" uuid,
	"domain" text NOT NULL,
	"active" boolean DEFAULT true,
	"last_checked_at" timestamp,
	"last_status" text,
	"last_status_code" integer,
	"consecutive_failures" integer DEFAULT 0,
	"error_code" text,
	CONSTRAINT "domain_checks_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
ALTER TABLE "domain_checks" ADD CONSTRAINT "domain_checks_landing_page_id_landing_pages_id_fk" FOREIGN KEY ("landing_page_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;