import "server-only";
import { getEffectiveClientId } from "@/lib/auth";
import { hasProductsAccess } from "@/data/product-access";
import { getUserByInternalId } from "@/data/users";
import { hasDashboardAccess } from "@/lib/subscription-access";
import { getLandingPageMetaByIdAndUserId } from "@/data/landing-pages";

export async function requireProductsAccess(landingId: string) {
  const userId = await getEffectiveClientId();
  if (!userId) return null;
  const [enabled, user, landing] = await Promise.all([hasProductsAccess(userId), getUserByInternalId(userId), getLandingPageMetaByIdAndUserId(landingId, userId)]);
  if (!enabled || !hasDashboardAccess(user) || !landing) return null;
  return { userId, landing };
}
