import {
  pgTable,
  pgEnum,
  text,
  boolean,
  timestamp,
  uuid,
  integer,
  real,
  jsonb,
  index,
  unique,
  uniqueIndex,
  check,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const templateEnum = pgEnum("template", [
  "velar",
  "studio",
  "portfolio",
  "ristorante",
  "floristeria",
  "oficio-pro",
  "coffee-shop",
]);

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "trialing",
  "past_due",
  "canceled",
  "unpaid",
]);

export const domainCheckStatusEnum = pgEnum("domain_check_status", [
  "ok",
  "timeout",
  "dns_error",
  "ssl_error",
  "http_error",
]);

export const offerTypeEnum = pgEnum("offer_type", ["hero_banner", "promotion_cards"]);

export type OfferCardRow = {
  title: string;
  description: string;
  badge?: string;
  ctaText?: string;
  expiresAt?: string;
};

export type SubscriptionStatus = typeof subscriptionStatusEnum.enumValues[number];
export type DomainCheckStatus = typeof domainCheckStatusEnum.enumValues[number];
export type SubscriptionPlan = "free" | "starter" | "pro";
export type AccessType = "subscription" | "manual";
export type AddonType = "bookings";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email"),
  type: text("type").$type<"user" | "admin">().notNull().default("user"),
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionPlan: text("subscription_plan").$type<SubscriptionPlan>().notNull().default("free"),
  subscriptionStatus: subscriptionStatusEnum("subscription_status"),
  subscriptionCurrentPeriodEnd: timestamp("subscription_current_period_end", { withTimezone: true }),
  subscriptionCancelAtPeriodEnd: boolean("subscription_cancel_at_period_end").default(false),
  accessType: text("access_type").$type<AccessType>().notNull().default("subscription"),
  suspended: boolean("suspended").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (table) => [
  index("users_stripe_subscription_id_idx").on(table.stripeSubscriptionId),
]);

export const userAddons = pgTable("user_addons", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  addonType: text("addon_type").$type<AddonType>().notNull(),
  manualAccess: boolean("manual_access").notNull().default(false),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  status: subscriptionStatusEnum("status"),
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (table) => [
  unique("user_addons_user_type_unique").on(table.userId, table.addonType),
  index("user_addons_stripe_subscription_id_idx").on(table.stripeSubscriptionId),
]);

export const landingPages = pgTable("landing_pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  template: templateEnum("template").notNull().default("velar"),
  published: boolean("published").notNull().default(false),
  customDomain: text("custom_domain").unique(),
  domainVerified: boolean("domain_verified").notNull().default(false),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (table) => [
  index("landing_pages_user_id_idx").on(table.userId),
]);

export const landingSectionSelections = pgTable("landing_section_selections", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sectionKey: text("section_key").notNull(),
  variantId: text("variant_id").notNull(),
}, (table) => [
  unique("landing_section_selections_landing_section_uniq").on(
    table.landingId,
    table.sectionKey,
  ),
  index("landing_section_selections_landing_id_idx").on(table.landingId),
]);

export const landingSeo = pgTable("landing_seo", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .unique()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  title: text("title").notNull().default(""),
  description: text("description").notNull().default(""),
  favicon: text("favicon").notNull().default(""),
});

export const landingBranding = pgTable("landing_branding", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .unique()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  brand: text("brand").notNull().default(""),
  brandLogoType: text("brand_logo_type").notNull().default("text"),
  brandLogoImage: text("brand_logo_image").notNull().default(""),
  paletteId: text("palette_id").notNull().default("default"),
  typographyId: text("typography_id").notNull().default("default"),
  sectionHeadings: jsonb("section_headings")
    .$type<Record<string, { title: string; subtitle: string }>>()
    .notNull()
    .default({}),
  hiddenSections: jsonb("hidden_sections").$type<string[]>().notNull().default([]),
  sectionOrder: jsonb("section_order").$type<string[]>().notNull().default([]),
  enabledPages: jsonb("enabled_pages").$type<string[]>().notNull().default([]),
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
  fanImages: jsonb("fan_images").$type<string[]>().notNull().default([]),
  ctaLabel: text("cta_label").notNull().default(""),
});

export const landingStory = pgTable("landing_story", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .unique()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  statement: text("statement").notNull().default(""),
});

export const landingPortfolioAbout = pgTable("landing_portfolio_about", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .unique()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  title: text("title").notNull().default(""),
  intro: text("intro").notNull().default(""),
  image: text("image").notNull().default(""),
  storyTitle: text("story_title").notNull().default(""),
  storyBody: text("story_body").notNull().default(""),
  storyImage: text("story_image").notNull().default(""),
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
  ctaLabel: text("cta_label").notNull().default(""),
  copyrightSuffix: text("copyright_suffix").notNull().default("| Todos los derechos reservados"),
  copyrightExtra: text("copyright_extra").notNull().default(""),
  socialLinks: jsonb("social_links")
    .$type<{ platform: string; url: string }[]>()
    .notNull()
    .default([]),
  whatsappEnabled: boolean("whatsapp_enabled").notNull().default(false),
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
}, (table) => [
  index("landing_benefits_landing_id_sort_idx").on(table.landingId, table.sortOrder),
]);

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
}, (table) => [
  index("landing_testimonials_landing_id_sort_idx").on(table.landingId, table.sortOrder),
  check("testimonials_rating_check", sql`${table.rating} >= 0 AND ${table.rating} <= 5`),
]);

export const landingFaq = pgTable("landing_faq", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  question: text("question").notNull().default(""),
  answer: text("answer").notNull().default(""),
}, (table) => [
  index("landing_faq_landing_id_sort_idx").on(table.landingId, table.sortOrder),
]);

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
}, (table) => [
  index("landing_stats_landing_id_sort_idx").on(table.landingId, table.sortOrder),
]);

export const landingSpaces = pgTable("landing_spaces", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  name: text("name").notNull().default(""),
  description: text("description").notNull().default(""),
  image: text("image").notNull().default(""),
}, (table) => [
  index("landing_spaces_landing_id_sort_idx").on(table.landingId, table.sortOrder),
]);

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
}, (table) => [
  index("landing_services_landing_id_sort_idx").on(table.landingId, table.sortOrder),
]);

export const landingOffers = pgTable("landing_offers", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  type: offerTypeEnum("type").notNull(),
  title: text("title").notNull().default(""),
  description: text("description").notNull().default(""),
  badge: text("badge").notNull().default(""),
  ctaText: text("cta_text").notNull().default(""),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  enabled: boolean("enabled").notNull().default(true),
  cards: jsonb("cards").$type<OfferCardRow[]>().notNull().default([]),
  image: text("image").notNull().default(""),
  features: jsonb("features").$type<string[]>().notNull().default([]),
}, (table) => [
  index("landing_offers_landing_id_sort_idx").on(table.landingId, table.sortOrder),
]);

export const landingWorkflow = pgTable("landing_workflow", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  number: text("number").notNull().default(""),
  title: text("title").notNull().default(""),
  description: text("description").notNull().default(""),
}, (table) => [
  index("landing_workflow_landing_id_sort_idx").on(table.landingId, table.sortOrder),
]);

export const landingGallery = pgTable("landing_gallery", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  image: text("image").notNull().default(""),
  video: text("video").notNull().default(""),
  title: text("title").notNull().default(""),
  description: text("description").notNull().default(""),
  tags: text("tags").notNull().default(""),
  link: text("link").notNull().default(""),
  linkType: text("link_type").notNull().default("none"),
  projectSlug: text("project_slug").notNull().default(""),
  projectBody: text("project_body").notNull().default(""),
  projectGallery: jsonb("project_gallery")
    .$type<string[]>()
    .notNull()
    .default([]),
}, (table) => [
  index("landing_gallery_landing_id_sort_idx").on(table.landingId, table.sortOrder),
  uniqueIndex("landing_gallery_landing_project_slug_uniq")
    .on(table.landingId, table.projectSlug)
    .where(sql`${table.linkType} = 'internal' AND ${table.projectSlug} <> ''`),
  check(
    "landing_gallery_link_type_check",
    sql`${table.linkType} IN ('none', 'internal', 'external')`,
  ),
]);

export const landingNav = pgTable("landing_nav", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  label: text("label").notNull().default(""),
  href: text("href").notNull().default(""),
}, (table) => [
  index("landing_nav_landing_id_sort_idx").on(table.landingId, table.sortOrder),
]);

export const landingTeam = pgTable("landing_team", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  name: text("name").notNull().default(""),
  role: text("role").notNull().default(""),
  bio: text("bio").notNull().default(""),
  image: text("image").notNull().default(""),
}, (table) => [
  index("landing_team_landing_id_sort_idx").on(table.landingId, table.sortOrder),
]);

export const landingServiceMenu = pgTable("landing_service_menu", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  category: text("category").notNull().default(""),
  name: text("name").notNull().default(""),
  description: text("description").notNull().default(""),
  price: text("price").notNull().default(""),
  duration: text("duration").notNull().default(""),
  image: text("image").notNull().default(""),
}, (table) => [
  index("landing_service_menu_landing_id_sort_idx").on(table.landingId, table.sortOrder),
]);

export const landingWorkHistory = pgTable("landing_work_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull(),
  dateRange: text("date_range").notNull().default(""),
  location: text("location").notNull().default(""),
  company: text("company").notNull().default(""),
  title: text("title").notNull().default(""),
  summary: text("summary").notNull().default(""),
  highlights: text("highlights").notNull().default(""),
  technologies: text("technologies").notNull().default(""),
}, (table) => [
  index("landing_work_history_landing_id_sort_idx").on(table.landingId, table.sortOrder),
]);

export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  title: text("title").notNull().default(""),
  slug: text("slug").notNull().default(""),
  excerpt: text("excerpt").notNull().default(""),
  body: text("body").notNull().default(""),
  heroImage: text("hero_image").notNull().default(""),
  published: boolean("published").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => [
  unique("blog_posts_landing_slug_uniq").on(table.landingId, table.slug),
  index("blog_posts_landing_id_sort_idx").on(table.landingId, table.sortOrder),
  index("blog_posts_published_idx")
    .on(table.landingId, table.sortOrder)
    .where(sql`published = true`),
]);

export const blogConfig = pgTable("blog_config", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingId: uuid("landing_id")
    .notNull()
    .unique()
    .references(() => landingPages.id, { onDelete: "cascade" }),
  title: text("title").notNull().default(""),
  description: text("description").notNull().default(""),
});

export const assets = pgTable("assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  landingId: uuid("landing_id")
    .references(() => landingPages.id, { onDelete: "set null" }),
  publicId: text("public_id").notNull(),
  url: text("url").notNull(),
  name: text("name").notNull().default(""),
  mimeType: text("mime_type").notNull().default(""),
  width: integer("width"),
  height: integer("height"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (table) => [
  index("assets_user_id_idx").on(table.userId),
  index("assets_landing_id_idx").on(table.landingId),
]);

export const assetsRelations = relations(assets, ({ one }) => ({
  user: one(users, { fields: [assets.userId], references: [users.id] }),
  landing: one(landingPages, { fields: [assets.landingId], references: [landingPages.id] }),
}));

export const domainChecks = pgTable("domain_checks", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingPageId: uuid("landing_page_id").references(() => landingPages.id, {
    onDelete: "cascade",
  }),
  domain: text("domain").notNull().unique(),
  active: boolean("active").default(true),
  lastCheckedAt: timestamp("last_checked_at", { withTimezone: true }),
  lastStatus: domainCheckStatusEnum("last_status"),
  lastStatusCode: integer("last_status_code"),
  consecutiveFailures: integer("consecutive_failures").default(0),
  errorCode: text("error_code"),
}, (table) => [
  index("domain_checks_landing_page_id_idx").on(table.landingPageId),
]);

export const domainChecksRelations = relations(domainChecks, ({ one }) => ({
  landingPage: one(landingPages, {
    fields: [domainChecks.landingPageId],
    references: [landingPages.id],
  }),
}));

export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
]);

export type BookingStatus = (typeof bookingStatusEnum.enumValues)[number];

export const bookingSettings = pgTable("booking_settings", {
  tenantId: uuid("tenant_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  enabled: boolean("enabled").notNull().default(false),
  timezone: text("timezone").notNull().default("Europe/Madrid"),
  autoConfirmBookings: boolean("auto_confirm_bookings").notNull().default(true),
  minAdvanceHours: integer("min_advance_hours").notNull().default(2),
  maxAdvanceDays: integer("max_advance_days").notNull().default(60),
  slotGranularityMinutes: integer("slot_granularity_minutes").notNull().default(15),
  notificationEmail: text("notification_email").notNull().default(""),
});

export const employees = pgTable("employees", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => [
  index("employees_tenant_id_is_active_idx").on(table.tenantId, table.isActive),
]);

export const employeeHours = pgTable("employee_hours", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  dayOfWeek: integer("day_of_week").notNull(),
  isWorking: boolean("is_working").notNull().default(false),
  startTime: text("start_time").notNull().default("09:00"),
  endTime: text("end_time").notNull().default("18:00"),
}, (table) => [
  unique("employee_hours_employee_day_uniq").on(table.employeeId, table.dayOfWeek),
]);

export const bookingServices = pgTable("booking_services", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  priceCents: integer("price_cents").notNull().default(0),
  bufferAfterMinutes: integer("buffer_after_minutes").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => [
  index("booking_services_tenant_id_sort_idx").on(table.tenantId, table.sortOrder),
]);

export const employeeServices = pgTable("employee_services", {
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  serviceId: uuid("service_id")
    .notNull()
    .references(() => bookingServices.id, { onDelete: "cascade" }),
}, (table) => [
  unique("employee_services_employee_service_uniq").on(table.employeeId, table.serviceId),
]);

export const blockedPeriods = pgTable("blocked_periods", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  employeeId: uuid("employee_id").references(() => employees.id, { onDelete: "cascade" }),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
  reason: text("reason").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => [
  index("blocked_periods_tenant_employee_range_idx").on(
    table.tenantId,
    table.employeeId,
    table.startsAt,
    table.endsAt,
  ),
]);

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id),
  serviceId: uuid("service_id")
    .notNull()
    .references(() => bookingServices.id),
  serviceNameSnapshot: text("service_name_snapshot").notNull(),
  durationMinutesSnapshot: integer("duration_minutes_snapshot").notNull(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  notes: text("notes").notNull().default(""),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
  status: bookingStatusEnum("status").notNull().default("pending"),
  publicToken: text("public_token").notNull().unique(),
  wasAnyEmployee: boolean("was_any_employee").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => [
  index("bookings_tenant_id_starts_at_idx").on(table.tenantId, table.startsAt),
  index("bookings_public_token_idx").on(table.publicToken),
]);

export const employeesRelations = relations(employees, ({ one, many }) => ({
  tenant: one(users, { fields: [employees.tenantId], references: [users.id] }),
  hours: many(employeeHours),
  services: many(employeeServices),
  bookings: many(bookings),
}));

export const employeeHoursRelations = relations(employeeHours, ({ one }) => ({
  employee: one(employees, { fields: [employeeHours.employeeId], references: [employees.id] }),
}));

export const bookingServicesRelations = relations(bookingServices, ({ one, many }) => ({
  tenant: one(users, { fields: [bookingServices.tenantId], references: [users.id] }),
  employeeServices: many(employeeServices),
  bookings: many(bookings),
}));

export const employeeServicesRelations = relations(employeeServices, ({ one }) => ({
  employee: one(employees, { fields: [employeeServices.employeeId], references: [employees.id] }),
  service: one(bookingServices, {
    fields: [employeeServices.serviceId],
    references: [bookingServices.id],
  }),
}));

export const blockedPeriodsRelations = relations(blockedPeriods, ({ one }) => ({
  tenant: one(users, { fields: [blockedPeriods.tenantId], references: [users.id] }),
  employee: one(employees, { fields: [blockedPeriods.employeeId], references: [employees.id] }),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  tenant: one(users, { fields: [bookings.tenantId], references: [users.id] }),
  employee: one(employees, { fields: [bookings.employeeId], references: [employees.id] }),
  service: one(bookingServices, { fields: [bookings.serviceId], references: [bookingServices.id] }),
}));

export const bookingSettingsRelations = relations(bookingSettings, ({ one }) => ({
  tenant: one(users, { fields: [bookingSettings.tenantId], references: [users.id] }),
}));

export const landingPagesRelations = relations(landingPages, ({ one, many }) => ({
  seo: one(landingSeo, { fields: [landingPages.id], references: [landingSeo.landingId] }),
  branding: one(landingBranding, { fields: [landingPages.id], references: [landingBranding.landingId] }),
  hero: one(landingHero, { fields: [landingPages.id], references: [landingHero.landingId] }),
  sectionSelections: many(landingSectionSelections),
  story: one(landingStory, { fields: [landingPages.id], references: [landingStory.landingId] }),
  portfolioAbout: one(landingPortfolioAbout, {
    fields: [landingPages.id],
    references: [landingPortfolioAbout.landingId],
  }),
  cta: one(landingCta, { fields: [landingPages.id], references: [landingCta.landingId] }),
  benefits: many(landingBenefits),
  testimonials: many(landingTestimonials),
  faq: many(landingFaq),
  stats: many(landingStats),
  spaces: many(landingSpaces),
  services: many(landingServices),
  offers: many(landingOffers),
  workflow: many(landingWorkflow),
  gallery: many(landingGallery),
  nav: many(landingNav),
  team: many(landingTeam),
  serviceMenu: many(landingServiceMenu),
  workHistory: many(landingWorkHistory),
  blogPosts: many(blogPosts),
  blogConfig: one(blogConfig, { fields: [landingPages.id], references: [blogConfig.landingId] }),
  domainChecks: many(domainChecks),
  assets: many(assets),
}));

export const landingSectionSelectionsRelations = relations(
  landingSectionSelections,
  ({ one }) => ({
    landing: one(landingPages, {
      fields: [landingSectionSelections.landingId],
      references: [landingPages.id],
    }),
  }),
);

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

export const landingPortfolioAboutRelations = relations(
  landingPortfolioAbout,
  ({ one }) => ({
    landing: one(landingPages, {
      fields: [landingPortfolioAbout.landingId],
      references: [landingPages.id],
    }),
  }),
);

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

export const landingOffersRelations = relations(landingOffers, ({ one }) => ({
  landing: one(landingPages, { fields: [landingOffers.landingId], references: [landingPages.id] }),
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

export const landingTeamRelations = relations(landingTeam, ({ one }) => ({
  landing: one(landingPages, { fields: [landingTeam.landingId], references: [landingPages.id] }),
}));

export const landingServiceMenuRelations = relations(landingServiceMenu, ({ one }) => ({
  landing: one(landingPages, { fields: [landingServiceMenu.landingId], references: [landingPages.id] }),
}));

export const landingWorkHistoryRelations = relations(landingWorkHistory, ({ one }) => ({
  landing: one(landingPages, { fields: [landingWorkHistory.landingId], references: [landingPages.id] }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  landing: one(landingPages, { fields: [blogPosts.landingId], references: [landingPages.id] }),
}));

export const blogConfigRelations = relations(blogConfig, ({ one }) => ({
  landing: one(landingPages, { fields: [blogConfig.landingId], references: [landingPages.id] }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type LandingPage = typeof landingPages.$inferSelect;
export type NewLandingPage = typeof landingPages.$inferInsert;
export type LandingSectionSelection = typeof landingSectionSelections.$inferSelect;
export type LandingHero = typeof landingHero.$inferSelect;
export type LandingBranding = typeof landingBranding.$inferSelect;
export type LandingSeo = typeof landingSeo.$inferSelect;
export type LandingStory = typeof landingStory.$inferSelect;
export type LandingPortfolioAbout = typeof landingPortfolioAbout.$inferSelect;
export type LandingCta = typeof landingCta.$inferSelect;
export type LandingBenefit = typeof landingBenefits.$inferSelect;
export type LandingTestimonial = typeof landingTestimonials.$inferSelect;
export type LandingFaqItem = typeof landingFaq.$inferSelect;
export type LandingStat = typeof landingStats.$inferSelect;
export type LandingSpace = typeof landingSpaces.$inferSelect;
export type LandingService = typeof landingServices.$inferSelect;
export type LandingOffer = typeof landingOffers.$inferSelect;
export type LandingWorkflowStep = typeof landingWorkflow.$inferSelect;
export type LandingGalleryItem = typeof landingGallery.$inferSelect;
export type LandingNavItem = typeof landingNav.$inferSelect;
export type LandingTeamMember = typeof landingTeam.$inferSelect;
export type LandingServiceMenuItem = typeof landingServiceMenu.$inferSelect;
export type LandingWorkHistoryItem = typeof landingWorkHistory.$inferSelect;
export type AssetRow = typeof assets.$inferSelect;
export type NewAsset = typeof assets.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type BlogConfigRow = typeof blogConfig.$inferSelect;
export type DomainCheck = typeof domainChecks.$inferSelect;
export type NewDomainCheck = typeof domainChecks.$inferInsert;
export type BookingSettings = typeof bookingSettings.$inferSelect;
export type NewBookingSettings = typeof bookingSettings.$inferInsert;
export type Employee = typeof employees.$inferSelect;
export type NewEmployee = typeof employees.$inferInsert;
export type EmployeeHours = typeof employeeHours.$inferSelect;
export type NewEmployeeHours = typeof employeeHours.$inferInsert;
export type BookingService = typeof bookingServices.$inferSelect;
export type NewBookingService = typeof bookingServices.$inferInsert;
export type EmployeeService = typeof employeeServices.$inferSelect;
export type NewEmployeeService = typeof employeeServices.$inferInsert;
export type BlockedPeriod = typeof blockedPeriods.$inferSelect;
export type NewBlockedPeriod = typeof blockedPeriods.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
