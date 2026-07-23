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

ALTER TABLE "landing_portfolio_about"
  ADD CONSTRAINT "landing_portfolio_about_landing_id_landing_pages_id_fk"
  FOREIGN KEY ("landing_id")
  REFERENCES "public"."landing_pages"("id")
  ON DELETE cascade
  ON UPDATE no action;
