ALTER TYPE "public"."template" ADD VALUE 'signal';--> statement-breakpoint
ALTER TYPE "public"."template" ADD VALUE 'pallet-ross';--> statement-breakpoint
CREATE TABLE "landing_page_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_page_id" uuid NOT NULL,
	"version" integer NOT NULL,
	"template" "template" NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"content_json" jsonb NOT NULL,
	"seo_json" jsonb NOT NULL,
	"section_selections_json" jsonb NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "landing_page_versions_landing_version_unique" UNIQUE("landing_page_id","version")
);
--> statement-breakpoint
CREATE TABLE "landing_portfolio_about" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"intro" text DEFAULT '' NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"story_title" text DEFAULT '' NOT NULL,
	"story_body" text DEFAULT '' NOT NULL,
	"story_image" text DEFAULT '' NOT NULL,
	CONSTRAINT "landing_portfolio_about_landing_id_unique" UNIQUE("landing_id")
);
--> statement-breakpoint
CREATE TABLE "landing_section_selections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"section_key" text NOT NULL,
	"variant_id" text NOT NULL,
	CONSTRAINT "landing_section_selections_landing_section_uniq" UNIQUE("landing_id","section_key")
);
--> statement-breakpoint
ALTER TABLE "landing_pages" DROP CONSTRAINT "landing_pages_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "landing_branding" ADD COLUMN "section_order" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_branding" ADD COLUMN "enabled_pages" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_gallery" ADD COLUMN "virtual_tour_url" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_gallery" ADD COLUMN "virtual_tour_label" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_gallery" ADD COLUMN "link_type" text DEFAULT 'none' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_gallery" ADD COLUMN "project_slug" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_gallery" ADD COLUMN "project_body" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_gallery" ADD COLUMN "project_gallery" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_pages" ADD COLUMN "published_version_id" uuid;--> statement-breakpoint
ALTER TABLE "landing_pages" ADD COLUMN "published_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "landing_seo" ADD COLUMN "social_image" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "user_addons" ADD COLUMN "manual_access" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_page_versions" ADD CONSTRAINT "landing_page_versions_landing_page_id_landing_pages_id_fk" FOREIGN KEY ("landing_page_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_portfolio_about" ADD CONSTRAINT "landing_portfolio_about_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_section_selections" ADD CONSTRAINT "landing_section_selections_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "landing_page_versions_landing_page_idx" ON "landing_page_versions" USING btree ("landing_page_id");--> statement-breakpoint
CREATE INDEX "landing_page_versions_slug_idx" ON "landing_page_versions" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "landing_section_selections_landing_id_idx" ON "landing_section_selections" USING btree ("landing_id");--> statement-breakpoint
ALTER TABLE "landing_pages" ADD CONSTRAINT "landing_pages_published_version_id_landing_page_versions_id_fk" FOREIGN KEY ("published_version_id") REFERENCES "public"."landing_page_versions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_pages" ADD CONSTRAINT "landing_pages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "landing_gallery_landing_project_slug_uniq" ON "landing_gallery" USING btree ("landing_id","project_slug") WHERE "landing_gallery"."link_type" = 'internal' AND "landing_gallery"."project_slug" <> '';--> statement-breakpoint
CREATE INDEX "landing_pages_published_idx" ON "landing_pages" USING btree ("published");--> statement-breakpoint
ALTER TABLE "landing_gallery" ADD CONSTRAINT "landing_gallery_link_type_check" CHECK ("landing_gallery"."link_type" IN ('none', 'internal', 'external'));