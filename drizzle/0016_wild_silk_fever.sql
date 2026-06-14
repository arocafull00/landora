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
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "landing_cta" ADD COLUMN "cta_label" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_cta" ADD COLUMN "copyright_suffix" text DEFAULT '| Todos los derechos reservados' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_cta" ADD COLUMN "copyright_extra" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_cta" ADD COLUMN "social_links" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_config" ADD CONSTRAINT "blog_config_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_landing_id_landing_pages_id_fk" FOREIGN KEY ("landing_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;