import { getEffectiveClientId } from "@/lib/auth";
import {
  getLandingPageById,
  getLandingPageByIdAndUserId,
} from "@/data/landing-pages";
import { isAdmin } from "@/lib/is-admin";

export async function getAuthorizedLanding(id: string) {
  const clientId = await getEffectiveClientId();

  if (clientId) {
    const landing = await getLandingPageByIdAndUserId(id, clientId);
    if (landing) return landing;
  }

  if (!(await isAdmin())) return null;

  return (await getLandingPageById(id)) ?? null;
}
