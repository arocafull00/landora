import { pgTable, text, boolean, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";

export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const landingPages = pgTable("landing_pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id")
    .notNull()
    .references(() => clients.id),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  published: boolean("published").notNull().default(false),
  contentJson: jsonb("content_json").notNull().default({}),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
export type LandingPage = typeof landingPages.$inferSelect;
export type NewLandingPage = typeof landingPages.$inferInsert;
