CREATE TABLE "landing_section_selections" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "landing_id" uuid NOT NULL,
  "section_key" text NOT NULL,
  "variant_id" text NOT NULL,
  CONSTRAINT "landing_section_selections_landing_section_uniq"
    UNIQUE("landing_id", "section_key")
);

ALTER TABLE "landing_section_selections"
  ADD CONSTRAINT "landing_section_selections_landing_id_landing_pages_id_fk"
  FOREIGN KEY ("landing_id")
  REFERENCES "public"."landing_pages"("id")
  ON DELETE cascade
  ON UPDATE no action;

CREATE INDEX "landing_section_selections_landing_id_idx"
  ON "landing_section_selections" USING btree ("landing_id");

INSERT INTO "landing_section_selections" ("landing_id", "section_key", "variant_id")
SELECT "id", 'hero', "template"::text
FROM "landing_pages"
ON CONFLICT ("landing_id", "section_key") DO NOTHING;
