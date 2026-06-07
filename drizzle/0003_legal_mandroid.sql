ALTER TABLE "landing_pages" ADD COLUMN "template" text DEFAULT 'toll-story' NOT NULL;
UPDATE "landing_pages" SET "template" = 'toll-story' WHERE "template" = 'toll-story';
ALTER TABLE "landing_pages" ALTER COLUMN "template" SET DEFAULT 'velar';
