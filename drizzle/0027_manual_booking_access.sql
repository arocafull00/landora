ALTER TABLE "user_addons" ADD COLUMN "manual_access" boolean DEFAULT false NOT NULL;

INSERT INTO "user_addons" ("user_id", "addon_type", "manual_access")
SELECT
  "id",
  'bookings',
  true
FROM "users"
WHERE "access_type" = 'manual'
ON CONFLICT ("user_id", "addon_type")
DO UPDATE SET "manual_access" = true;
