CREATE TYPE "public"."domain_check_status" AS ENUM('ok', 'timeout', 'dns_error', 'ssl_error', 'http_error');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('active', 'trialing', 'past_due', 'canceled', 'unpaid');--> statement-breakpoint
CREATE TYPE "public"."template" AS ENUM('velar', 'studio', 'portfolio', 'ristorante', 'floristeria', 'oficio-pro', 'coffee-shop');--> statement-breakpoint
CREATE TABLE "assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"landing_id" uuid,
	"public_id" text NOT NULL,
	"url" text NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"mime_type" text DEFAULT '' NOT NULL,
	"width" integer,
	"height" integer,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "blog_config" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	CONSTRAINT "blog_config_landing_id_unique" UNIQUE("landing_id")
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"slug" text DEFAULT '' NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"hero_image" text DEFAULT '' NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "blog_posts_landing_slug_uniq" UNIQUE("landing_id","slug")
);
--> statement-breakpoint
CREATE TABLE "domain_checks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_page_id" uuid,
	"domain" text NOT NULL,
	"active" boolean DEFAULT true,
	"last_checked_at" timestamp with time zone,
	"last_status" "domain_check_status",
	"last_status_code" integer,
	"consecutive_failures" integer DEFAULT 0,
	"error_code" text,
	CONSTRAINT "domain_checks_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
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
	"brand_logo_type" text DEFAULT 'text' NOT NULL,
	"brand_logo_image" text DEFAULT '' NOT NULL,
	"section_headings" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"hidden_sections" jsonb DEFAULT '[]'::jsonb NOT NULL,
	CONSTRAINT "landing_branding_landing_id_unique" UNIQUE("landing_id")
);
--> statement-breakpoint
CREATE TABLE "landing_cta" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"address" text DEFAULT '' NOT NULL,
	"cta_label" text DEFAULT '' NOT NULL,
	"copyright_suffix" text DEFAULT '| Todos los derechos reservados' NOT NULL,
	"copyright_extra" text DEFAULT '' NOT NULL,
	"social_links" jsonb DEFAULT '[]'::jsonb NOT NULL,
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
	"image" text DEFAULT '' NOT NULL,
	"video" text DEFAULT '' NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"tags" text DEFAULT '' NOT NULL
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
	"fan_images" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"cta_label" text DEFAULT '' NOT NULL,
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
CREATE TABLE "landing_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"template" "template" DEFAULT 'velar' NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"custom_domain" text,
	"domain_verified" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "landing_pages_slug_unique" UNIQUE("slug"),
	CONSTRAINT "landing_pages_custom_domain_unique" UNIQUE("custom_domain")
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
CREATE TABLE "landing_service_menu" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"sort_order" integer NOT NULL,
	"category" text DEFAULT '' NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"price" text DEFAULT '' NOT NULL,
	"duration" text DEFAULT '' NOT NULL,
	"image" text DEFAULT '' NOT NULL
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
CREATE TABLE "landing_team" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"sort_order" integer NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"role" text DEFAULT '' NOT NULL,
	"bio" text DEFAULT '' NOT NULL,
	"image" text DEFAULT '' NOT NULL
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
	"verified" boolean DEFAULT false NOT NULL,
	CONSTRAINT "testimonials_rating_check" CHECK ("landing_testimonials"."rating" >= 0 AND "landing_testimonials"."rating" <= 5)
);
--> statement-breakpoint
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
CREATE TABLE "landing_workflow" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_id" uuid NOT NULL,
	"sort_order" integer NOT NULL,
	"number" text DEFAULT '' NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"name" text NOT NULL,
	"type" text DEFAULT 'user' NOT NULL,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"subscription_status" "subscription_status",
	"subscription_current_period_end" timestamp with time zone,
	"subscription_cancel_at_period_end" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_clerk_user_id_unique" UNIQUE("clerk_user_id"),
	CONSTRAINT "users_stripe_customer_id_unique" UNIQUE("stripe_customer_id")
);
--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_config" ADD CONSTRAINT "blog_config_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "domain_checks" ADD CONSTRAINT "domain_checks_landing_page_id_landing_pages_id_fk" FOREIGN KEY ("landing_page_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_benefits" ADD CONSTRAINT "landing_benefits_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_branding" ADD CONSTRAINT "landing_branding_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_cta" ADD CONSTRAINT "landing_cta_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_faq" ADD CONSTRAINT "landing_faq_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_gallery" ADD CONSTRAINT "landing_gallery_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_hero" ADD CONSTRAINT "landing_hero_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_nav" ADD CONSTRAINT "landing_nav_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_pages" ADD CONSTRAINT "landing_pages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_seo" ADD CONSTRAINT "landing_seo_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_service_menu" ADD CONSTRAINT "landing_service_menu_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_services" ADD CONSTRAINT "landing_services_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_spaces" ADD CONSTRAINT "landing_spaces_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_stats" ADD CONSTRAINT "landing_stats_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_story" ADD CONSTRAINT "landing_story_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_team" ADD CONSTRAINT "landing_team_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_testimonials" ADD CONSTRAINT "landing_testimonials_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_work_history" ADD CONSTRAINT "landing_work_history_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_workflow" ADD CONSTRAINT "landing_workflow_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "assets_user_id_idx" ON "assets" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "assets_landing_id_idx" ON "assets" USING btree ("landing_id");--> statement-breakpoint
CREATE INDEX "blog_posts_landing_id_sort_idx" ON "blog_posts" USING btree ("landing_id","sort_order");--> statement-breakpoint
CREATE INDEX "blog_posts_published_idx" ON "blog_posts" USING btree ("landing_id","sort_order") WHERE published = true;--> statement-breakpoint
CREATE INDEX "domain_checks_landing_page_id_idx" ON "domain_checks" USING btree ("landing_page_id");--> statement-breakpoint
CREATE INDEX "landing_benefits_landing_id_sort_idx" ON "landing_benefits" USING btree ("landing_id","sort_order");--> statement-breakpoint
CREATE INDEX "landing_faq_landing_id_sort_idx" ON "landing_faq" USING btree ("landing_id","sort_order");--> statement-breakpoint
CREATE INDEX "landing_gallery_landing_id_sort_idx" ON "landing_gallery" USING btree ("landing_id","sort_order");--> statement-breakpoint
CREATE INDEX "landing_nav_landing_id_sort_idx" ON "landing_nav" USING btree ("landing_id","sort_order");--> statement-breakpoint
CREATE INDEX "landing_pages_user_id_idx" ON "landing_pages" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "landing_service_menu_landing_id_sort_idx" ON "landing_service_menu" USING btree ("landing_id","sort_order");--> statement-breakpoint
CREATE INDEX "landing_services_landing_id_sort_idx" ON "landing_services" USING btree ("landing_id","sort_order");--> statement-breakpoint
CREATE INDEX "landing_spaces_landing_id_sort_idx" ON "landing_spaces" USING btree ("landing_id","sort_order");--> statement-breakpoint
CREATE INDEX "landing_stats_landing_id_sort_idx" ON "landing_stats" USING btree ("landing_id","sort_order");--> statement-breakpoint
CREATE INDEX "landing_team_landing_id_sort_idx" ON "landing_team" USING btree ("landing_id","sort_order");--> statement-breakpoint
CREATE INDEX "landing_testimonials_landing_id_sort_idx" ON "landing_testimonials" USING btree ("landing_id","sort_order");--> statement-breakpoint
CREATE INDEX "landing_work_history_landing_id_sort_idx" ON "landing_work_history" USING btree ("landing_id","sort_order");--> statement-breakpoint
CREATE INDEX "landing_workflow_landing_id_sort_idx" ON "landing_workflow" USING btree ("landing_id","sort_order");--> statement-breakpoint
CREATE INDEX "users_stripe_subscription_id_idx" ON "users" USING btree ("stripe_subscription_id");