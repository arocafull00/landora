import type { AccessType, LandingPage, SubscriptionPlan, User } from "@/lib/domain/dtos";
import { hasActiveSubscription } from "@/lib/subscription-access";

export type AdminUserWithLanding = User & {
  landing: LandingPage | null;
};

export type AdminUserDisplayStatus = "active" | "trial" | "expired" | "cancelled" | "suspended";

export type AdminUsersStats = {
  total: number;
  active: number;
  trial: number;
  expired: number;
  manual: number;
  publishedLandings: number;
};

export type AdminUsersFilters = {
  search: string;
  plan: "all" | SubscriptionPlan;
  status: "all" | AdminUserDisplayStatus;
  access: "all" | AccessType;
};

export function joinUsersWithLandings(
  users: User[],
  landingPages: LandingPage[],
): AdminUserWithLanding[] {
  return users.map((user) => ({
    ...user,
    landing: landingPages.find((landing) => landing.userId === user.id) ?? null,
  }));
}

export function getUserDisplayStatus(user: AdminUserWithLanding): AdminUserDisplayStatus {
  if (user.suspended) return "suspended";

  if (user.accessType === "manual") return "active";

  if (user.subscriptionStatus === "trialing") return "trial";

  if (user.subscriptionStatus === "canceled") return "cancelled";

  if (hasActiveSubscription(user.subscriptionStatus)) return "active";

  return "expired";
}

export function getUserDisplayPlan(user: AdminUserWithLanding): SubscriptionPlan {
  if (user.accessType === "manual" && user.subscriptionPlan === "free") {
    return "pro";
  }

  return user.subscriptionPlan;
}

export function computeAdminUsersStats(users: AdminUserWithLanding[]): AdminUsersStats {
  return users.reduce<AdminUsersStats>(
    (stats, user) => {
      const displayStatus = getUserDisplayStatus(user);

      return {
        total: stats.total + 1,
        active: stats.active + (displayStatus === "active" ? 1 : 0),
        trial: stats.trial + (displayStatus === "trial" ? 1 : 0),
        expired: stats.expired + (displayStatus === "expired" ? 1 : 0),
        manual: stats.manual + (user.accessType === "manual" ? 1 : 0),
        publishedLandings:
          stats.publishedLandings + (user.landing?.published ? 1 : 0),
      };
    },
    {
      total: 0,
      active: 0,
      trial: 0,
      expired: 0,
      manual: 0,
      publishedLandings: 0,
    },
  );
}

function matchesSearch(user: AdminUserWithLanding, search: string) {
  const query = search.trim().toLowerCase();
  if (!query) return true;

  const email = user.email?.toLowerCase() ?? "";
  const domain = user.landing?.customDomain?.toLowerCase() ?? "";
  const slug = user.landing?.slug.toLowerCase() ?? "";

  return (
    user.name.toLowerCase().includes(query) ||
    email.includes(query) ||
    domain.includes(query) ||
    slug.includes(query)
  );
}

export function filterAdminUsers(
  users: AdminUserWithLanding[],
  filters: AdminUsersFilters,
) {
  return users.filter((user) => {
    if (!matchesSearch(user, filters.search)) return false;

    if (filters.plan !== "all" && getUserDisplayPlan(user) !== filters.plan) {
      return false;
    }

    if (filters.status !== "all" && getUserDisplayStatus(user) !== filters.status) {
      return false;
    }

    if (filters.access !== "all" && user.accessType !== filters.access) {
      return false;
    }

    return true;
  });
}

export function getLandingPublicUrl(landing: LandingPage | null) {
  if (!landing) return null;

  if (landing.customDomain) {
    return `https://${landing.customDomain}`;
  }

  return `/${landing.slug.replace(/^\//, "")}`;
}

export function getRelativePeriodEndLabel(date: Date | null) {
  if (!date) return null;

  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Vencido";

  if (diffDays === 0) return "Hoy";

  if (diffDays === 1) return "En 1 día";

  return `En ${diffDays} días`;
}

export function isPeriodEndingSoon(date: Date | null) {
  if (!date) return false;

  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return diffDays >= 0 && diffDays <= 7;
}
