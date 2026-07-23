ALTER TABLE "landing_pages"
  DROP CONSTRAINT "landing_pages_user_id_users_id_fk";

ALTER TABLE "landing_pages"
  ADD CONSTRAINT "landing_pages_user_id_users_id_fk"
  FOREIGN KEY ("user_id")
  REFERENCES "public"."users"("id")
  ON DELETE cascade
  ON UPDATE no action;
