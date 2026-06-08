CREATE TABLE "landing_work_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"sort_order" integer NOT NULL,
	"date_range" text DEFAULT '' NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"company" text DEFAULT '' NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"highlights" text DEFAULT '' NOT NULL,
	"technologies" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "landing_work_history" ADD CONSTRAINT "landing_work_history_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;