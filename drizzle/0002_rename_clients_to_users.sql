ALTER TABLE "clients" RENAME TO "users";
--> statement-breakpoint
ALTER TABLE "users" RENAME CONSTRAINT "clients_clerk_user_id_unique" TO "users_clerk_user_id_unique";
--> statement-breakpoint
ALTER TABLE "landing_pages" DROP CONSTRAINT "landing_pages_client_id_clients_id_fk";
--> statement-breakpoint
ALTER TABLE "landing_pages" RENAME COLUMN "client_id" TO "user_id";
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "type" SET DEFAULT 'user';
--> statement-breakpoint
UPDATE "users" SET "type" = 'user' WHERE "type" = 'client';
--> statement-breakpoint
ALTER TABLE "landing_pages" ADD CONSTRAINT "landing_pages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
