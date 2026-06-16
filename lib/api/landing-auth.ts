import { getEffectiveClientId } from "@/lib/auth";
import {
  getLandingPageById,
  getLandingPageByIdAndUserId,
  getLandingPageMetaById,
  getLandingPageMetaByIdAndUserId,
  type LandingPageMeta,
  type LandingWithSections,
} from "@/data/landing-pages";
import { isAdmin } from "@/lib/is-admin";

export async function assertLandingAccess(id: string): Promise<LandingPageMeta | null> {
  const clientId = await getEffectiveClientId();

  if (clientId) {
    const landing = await getLandingPageMetaByIdAndUserId(id, clientId);
    if (landing) return landing;
  }

  if (!(await isAdmin())) return null;

  return (await getLandingPageMetaById(id)) ?? null;
}

export async function getAuthorizedLanding(id: string): Promise<LandingWithSections | null> {
  const clientId = await getEffectiveClientId();

  if (clientId) {
    const landing = await getLandingPageByIdAndUserId(id, clientId);
    if (landing) return landing;
  }

  if (!(await isAdmin())) return null;

  return (await getLandingPageById(id)) ?? null;
}
