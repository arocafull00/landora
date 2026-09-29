ALTER TABLE "landing_gallery"
  ADD COLUMN "case_problem" text DEFAULT '' NOT NULL,
  ADD COLUMN "case_impact" text DEFAULT '' NOT NULL,
  ADD COLUMN "case_method" text DEFAULT '' NOT NULL;
