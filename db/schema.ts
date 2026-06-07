import {
  pgTable,
  text,
  boolean,
  timestamp,
  uuid,
  integer,
  real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const landingSeo = pgTable("landing_seo", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .unique()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  title: text("title").notNull().default(""),
  description: text("description").notNull().default(""),
});

export const landingBranding = pgTable("landing_branding", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .unique()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  brand: text("brand").notNull().default(""),
});

export const landingHero = pgTable("landing_hero", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .unique()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  eyebrow: text("eyebrow").notNull().default(""),
  title: text("title").notNull().default(""),
  subtitle: text("subtitle").notNull().default(""),
  description: text("description").notNull().default(""),
  image: text("image").notNull().default(""),
  houseImage: text("house_image").notNull().default(""),
});

export const landingStory = pgTable("landing_story", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .unique()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  statement: text("statement").notNull().default(""),
});

export const landingCta = pgTable("landing_cta", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .unique()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  phone: text("phone").notNull().default(""),
  email: text("email").notNull().default(""),
  address: text("address").notNull().default(""),
});

export const landingBenefits = pgTable("landing_benefits", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  title: text("title").notNull().default(""),
  description: text("description").notNull().default(""),
  icon: text("icon").notNull().default(""),
  image: text("image").notNull().default(""),
});

export const landingTestimonials = pgTable("landing_testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  author: text("author").notNull().default(""),
  date: text("date").notNull().default(""),
  rating: real("rating").notNull().default(5),
  comment: text("comment").notNull().default(""),
  verified: boolean("verified").notNull().default(false),
});

export const landingFaq = pgTable("landing_faq", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  question: text("question").notNull().default(""),
  answer: text("answer").notNull().default(""),
});

export const landingStats = pgTable("landing_stats", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  value: text("value").notNull().default(""),
  label: text("label").notNull().default(""),
  countTo: integer("count_to"),
  suffix: text("suffix").notNull().default(""),
});

export const landingSpaces = pgTable("landing_spaces", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  name: text("name").notNull().default(""),
  description: text("description").notNull().default(""),
  image: text("image").notNull().default(""),
});

export const landingServices = pgTable("landing_services", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  title: text("title").notNull().default(""),
  subtitle: text("subtitle").notNull().default(""),
  label: text("label").notNull().default(""),
  image: text("image").notNull().default(""),
});

export const landingWorkflow = pgTable("landing_workflow", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  number: text("number").notNull().default(""),
  title: text("title").notNull().default(""),
  description: text("description").notNull().default(""),
});

export const landingGallery = pgTable("landing_gallery", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  video: text("video").notNull().default(""),
});

export const landingNav = pgTable("landing_nav", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  label: text("label").notNull().default(""),
  href: text("href").notNull().default(""),
});

export const assets = pgTable("assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  publicId: text("public_id").notNull(),
  url: text("url").notNull(),
  name: text("name").notNull().default(""),
  mimeType: text("mime_type").notNull().default(""),
  width: integer("width"),
  height: integer("height"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assetsRelations = relations(assets, ({ one }) => ({
  user: one(users, { fields: [assets.userId], references: [users.id] }),
}));

export const landingPagesRelations = relations(landingPages, ({ one, many }) => ({
  seo: one(landingSeo, { fields: [landingPages.id], references: [landingSeo.landingId] }),
  branding: one(landingBranding, { fields: [landingPages.id], references: [landingBranding.landingId] }),
  hero: one(landingHero, { fields: [landingPages.id], references: [landingHero.landingId] }),
  story: one(landingStory, { fields: [landingPages.id], references: [landingStory.landingId] }),
  cta: one(landingCta, { fields: [landingPages.id], references: [landingCta.landingId] }),
  benefits: many(landingBenefits),
  testimonials: many(landingTestimonials),
  faq: many(landingFaq),
  stats: many(landingStats),
  spaces: many(landingSpaces),
  services: many(landingServices),
  workflow: many(landingWorkflow),
  gallery: many(landingGallery),
  nav: many(landingNav),
}));

export const landingSeoRelations = relations(landingSeo, ({ one }) => ({
  landing: one(landingPages, { fields: [landingSeo.landingId], references: [landingPages.id] }),
}));

export const landingBrandingRelations = relations(landingBranding, ({ one }) => ({
  landing: one(landingPages, { fields: [landingBranding.landingId], references: [landingPages.id] }),
}));

export const landingHeroRelations = relations(landingHero, ({ one }) => ({
  landing: one(landingPages, { fields: [landingHero.landingId], references: [landingPages.id] }),
}));

export const landingStoryRelations = relations(landingStory, ({ one }) => ({
  landing: one(landingPages, { fields: [landingStory.landingId], references: [landingPages.id] }),
}));

export const landingCtaRelations = relations(landingCta, ({ one }) => ({
  landing: one(landingPages, { fields: [landingCta.landingId], references: [landingPages.id] }),
}));

export const landingBenefitsRelations = relations(landingBenefits, ({ one }) => ({
  landing: one(landingPages, { fields: [landingBenefits.landingId], references: [landingPages.id] }),
}));

export const landingTestimonialsRelations = relations(landingTestimonials, ({ one }) => ({
  landing: one(landingPages, { fields: [landingTestimonials.landingId], references: [landingPages.id] }),
}));

export const landingFaqRelations = relations(landingFaq, ({ one }) => ({
  landing: one(landingPages, { fields: [landingFaq.landingId], references: [landingPages.id] }),
}));

export const landingStatsRelations = relations(landingStats, ({ one }) => ({
  landing: one(landingPages, { fields: [landingStats.landingId], references: [landingPages.id] }),
}));

export const landingSpacesRelations = relations(landingSpaces, ({ one }) => ({
  landing: one(landingPages, { fields: [landingSpaces.landingId], references: [landingPages.id] }),
}));

export const landingServicesRelations = relations(landingServices, ({ one }) => ({
  landing: one(landingPages, { fields: [landingServices.landingId], references: [landingPages.id] }),
}));

export const landingWorkflowRelations = relations(landingWorkflow, ({ one }) => ({
  landing: one(landingPages, { fields: [landingWorkflow.landingId], references: [landingPages.id] }),
}));

export const landingGalleryRelations = relations(landingGallery, ({ one }) => ({
  landing: one(landingPages, { fields: [landingGallery.landingId], references: [landingPages.id] }),
}));

export const landingNavRelations = relations(landingNav, ({ one }) => ({
  landing: one(landingPages, { fields: [landingNav.landingId], references: [landingPages.id] }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type LandingPage = typeof landingPages.$inferSelect;
export type NewLandingPage = typeof landingPages.$inferInsert;
export type LandingHero = typeof landingHero.$inferSelect;
export type LandingBranding = typeof landingBranding.$inferSelect;
export type LandingSeo = typeof landingSeo.$inferSelect;
export type LandingStory = typeof landingStory.$inferSelect;
export type LandingCta = typeof landingCta.$inferSelect;
export type LandingBenefit = typeof landingBenefits.$inferSelect;
export type LandingTestimonial = typeof landingTestimonials.$inferSelect;
export type LandingFaqItem = typeof landingFaq.$inferSelect;
export type LandingStat = typeof landingStats.$inferSelect;
export type LandingSpace = typeof landingSpaces.$inferSelect;
export type LandingService = typeof landingServices.$inferSelect;
export type LandingWorkflowStep = typeof landingWorkflow.$inferSelect;
export type LandingGalleryItem = typeof landingGallery.$inferSelect;
export type LandingNavItem = typeof landingNav.$inferSelect;
export type AssetRow = typeof assets.$inferSelect;
export type NewAsset = typeof assets.$inferInsert;
