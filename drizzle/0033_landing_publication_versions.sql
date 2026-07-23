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
  CONSTRAINT "landing_page_versions_landing_version_unique"
    UNIQUE("landing_page_id", "version"),
  CONSTRAINT "landing_page_versions_landing_page_id_landing_pages_id_fk"
    FOREIGN KEY ("landing_page_id")
    REFERENCES "public"."landing_pages"("id")
    ON DELETE cascade
);

ALTER TABLE "landing_pages"
  ADD COLUMN "published_version_id" uuid,
  ADD COLUMN "published_at" timestamp with time zone;

ALTER TABLE "landing_pages"
  ADD CONSTRAINT "landing_pages_published_version_id_landing_page_versions_id_fk"
  FOREIGN KEY ("published_version_id")
  REFERENCES "public"."landing_page_versions"("id")
  ON DELETE set null;

CREATE INDEX "landing_page_versions_landing_page_idx"
  ON "landing_page_versions" ("landing_page_id");

CREATE INDEX "landing_page_versions_slug_idx"
  ON "landing_page_versions" ("slug");

CREATE INDEX "landing_pages_published_idx"
  ON "landing_pages" ("published");

ALTER TABLE "landing_page_versions" ENABLE ROW LEVEL SECURITY;
