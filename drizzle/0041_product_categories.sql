CREATE TABLE "store_product_categories" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "landing_id" uuid NOT NULL REFERENCES "landing_pages"("id") ON DELETE CASCADE,
  "name" text NOT NULL,
  CONSTRAINT "store_product_categories_name_check" CHECK ("name" = trim("name") AND length("name") BETWEEN 1 AND 160)
);
--> statement-breakpoint
CREATE UNIQUE INDEX "store_product_categories_name_unique" ON "store_product_categories" ("landing_id", lower(trim("name")));
--> statement-breakpoint
INSERT INTO "store_product_categories" ("landing_id", "name")
SELECT "landing_id", min(trim("category")) FROM "store_products"
WHERE trim("category") <> ''
GROUP BY "landing_id", lower(trim("category"));
--> statement-breakpoint
UPDATE "store_products" p SET "category" = c."name", "version" = p."version" + 1, "updated_at" = now()
FROM "store_product_categories" c
WHERE p."landing_id" = c."landing_id" AND lower(trim(p."category")) = lower(c."name") AND p."category" <> c."name";
--> statement-breakpoint
ALTER TABLE "store_product_categories" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "store_product_categories" FROM anon, authenticated;
