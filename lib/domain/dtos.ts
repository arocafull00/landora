import type { TemplateId } from "@/lib/dashboard-data";

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "unpaid";

export type DomainCheckStatus =
  | "ok"
  | "timeout"
  | "dns_error"
  | "ssl_error"
  | "http_error";

export type SubscriptionPlan = "free" | "starter" | "pro";
export type AccessType = "subscription" | "manual";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type User = {
  id: string;
  clerkUserId: string;
  name: string;
  email: string | null;
  type: "user" | "admin";
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  subscriptionPlan: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus | null;
  subscriptionCurrentPeriodEnd: Date | null;
  subscriptionCancelAtPeriodEnd: boolean | null;
  accessType: AccessType;
  suspended: boolean;
  createdAt: Date | null;
};

export type UserAddonManualAccess = {
  userId: string;
  manualAccess: boolean;
};

export type LandingPage = {
  id: string;
  userId: string;
  name: string;
  slug: string;
  template: TemplateId;
  published: boolean;
  customDomain: string | null;
  domainVerified: boolean;
  updatedAt: Date | null;
  createdAt: Date | null;
};

export type AssetDto = {
  id: string;
  publicId: string;
  url: string;
  name: string;
  mimeType: string;
  width: number | null;
  height: number | null;
  createdAt: string | null;
};

export type BlogPostDto = {
  id: string;
  landingId: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  heroImage: string;
  published: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

export type DailyViewDto = {
  day: string;
  views: number;
};

export type LandingAnalyticsDto = {
  totalViews: number;
  views7d: number;
  views30d: number;
  ctaClicks: number;
  whatsappClicks: number;
  phoneClicks: number;
  leads: number;
  dailyViews: DailyViewDto[];
  previousPeriodViews: number;
};

export type DomainDnsRecordDto = {
  type: string;
  name: string;
  value: string;
};

export type DomainStatusDto = {
  domain: string | null;
  verified: boolean;
  misconfigured: boolean;
  records: DomainDnsRecordDto[];
};

export type BookingSettings = {
  tenantId: string;
  enabled: boolean;
  timezone: string;
  autoConfirmBookings: boolean;
  minAdvanceHours: number;
  maxAdvanceDays: number;
  slotGranularityMinutes: number;
  notificationEmail: string;
};

export type Employee = {
  id: string;
  tenantId: string;
  name: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type EmployeeHours = {
  id: string;
  employeeId: string;
  dayOfWeek: number;
  isWorking: boolean;
  startTime: string;
  endTime: string;
};

export type BookingService = {
  id: string;
  tenantId: string;
  name: string;
  durationMinutes: number;
  priceCents: number;
  bufferAfterMinutes: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type BlockedPeriod = {
  id: string;
  tenantId: string;
  employeeId: string | null;
  startsAt: Date;
  endsAt: Date;
  reason: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type Booking = {
  id: string;
  tenantId: string;
  employeeId: string;
  serviceId: string;
  serviceNameSnapshot: string;
  durationMinutesSnapshot: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  notes: string;
  startsAt: Date;
  endsAt: Date;
  status: BookingStatus;
  publicToken: string;
  wasAnyEmployee: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type OfferCardRow = {
  title: string;
  description: string;
  badge?: string;
  ctaText?: string;
  expiresAt?: string;
};
