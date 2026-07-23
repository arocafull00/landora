ALTER TABLE "landing_gallery"
  ADD COLUMN "link_type" text DEFAULT 'none' NOT NULL,
  ADD COLUMN "project_slug" text DEFAULT '' NOT NULL,
  ADD COLUMN "project_body" text DEFAULT '' NOT NULL,
  ADD COLUMN "project_gallery" jsonb DEFAULT '[]'::jsonb NOT NULL;

UPDATE "landing_gallery"
SET "link_type" = 'external'
WHERE "link" <> '';

ALTER TABLE "landing_gallery"
  ADD CONSTRAINT "landing_gallery_link_type_check"
  CHECK ("link_type" IN ('none', 'internal', 'external'));

CREATE UNIQUE INDEX "landing_gallery_landing_project_slug_uniq"
  ON "landing_gallery" ("landing_id", "project_slug")
  WHERE "link_type" = 'internal' AND "project_slug" <> '';
