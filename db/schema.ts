import { pgTable, text, boolean, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  name: text("name").notNull(),
  type: text("type").$type<"user" | "admin">().notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const landingPages = pgTable("landing_pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  template: text("template").$type<"toll-story" | "velar">().notNull().default("velar"),
  published: boolean("published").notNull().default(false),
  contentJson: jsonb("content_json").notNull().default({}),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type LandingPage = typeof landingPages.$inferSelect;
export type NewLandingPage = typeof landingPages.$inferInsert;
