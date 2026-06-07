CREATE TABLE "landing_benefits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"sort_order" integer NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"icon" text DEFAULT '' NOT NULL,
	"image" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "landing_branding" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"brand" text DEFAULT '' NOT NULL,
	CONSTRAINT "landing_branding_landing_id_unique" UNIQUE("landing_id")
);
--> statement-breakpoint
CREATE TABLE "landing_cta" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"address" text DEFAULT '' NOT NULL,
	CONSTRAINT "landing_cta_landing_id_unique" UNIQUE("landing_id")
);
--> statement-breakpoint
CREATE TABLE "landing_faq" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"sort_order" integer NOT NULL,
	"question" text DEFAULT '' NOT NULL,
	"answer" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "landing_gallery" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"sort_order" integer NOT NULL,
	"video" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "landing_hero" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"eyebrow" text DEFAULT '' NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"subtitle" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"house_image" text DEFAULT '' NOT NULL,
	CONSTRAINT "landing_hero_landing_id_unique" UNIQUE("landing_id")
);
--> statement-breakpoint
CREATE TABLE "landing_nav" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"sort_order" integer NOT NULL,
	"label" text DEFAULT '' NOT NULL,
	"href" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "landing_seo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	CONSTRAINT "landing_seo_landing_id_unique" UNIQUE("landing_id")
);
--> statement-breakpoint
CREATE TABLE "landing_services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"sort_order" integer NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"subtitle" text DEFAULT '' NOT NULL,
	"label" text DEFAULT '' NOT NULL,
	"image" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "landing_spaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"sort_order" integer NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"image" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "landing_stats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"sort_order" integer NOT NULL,
	"value" text DEFAULT '' NOT NULL,
	"label" text DEFAULT '' NOT NULL,
	"count_to" integer,
	"suffix" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "landing_story" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"statement" text DEFAULT '' NOT NULL,
	CONSTRAINT "landing_story_landing_id_unique" UNIQUE("landing_id")
);
--> statement-breakpoint
CREATE TABLE "landing_testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"sort_order" integer NOT NULL,
	"author" text DEFAULT '' NOT NULL,
	"date" text DEFAULT '' NOT NULL,
	"rating" real DEFAULT 5 NOT NULL,
	"comment" text DEFAULT '' NOT NULL,
	"verified" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "landing_workflow" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"sort_order" integer NOT NULL,
	"number" text DEFAULT '' NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "landing_benefits" ADD CONSTRAINT "landing_benefits_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_branding" ADD CONSTRAINT "landing_branding_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_cta" ADD CONSTRAINT "landing_cta_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_faq" ADD CONSTRAINT "landing_faq_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_gallery" ADD CONSTRAINT "landing_gallery_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_hero" ADD CONSTRAINT "landing_hero_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_nav" ADD CONSTRAINT "landing_nav_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_seo" ADD CONSTRAINT "landing_seo_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_services" ADD CONSTRAINT "landing_services_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_spaces" ADD CONSTRAINT "landing_spaces_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_stats" ADD CONSTRAINT "landing_stats_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_story" ADD CONSTRAINT "landing_story_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_testimonials" ADD CONSTRAINT "landing_testimonials_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_workflow" ADD CONSTRAINT "landing_workflow_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_pages" DROP COLUMN "content_json";