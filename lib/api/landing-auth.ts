import { getEffectiveClientId } from "@/lib/auth";
import { getLandingPageByIdAndUserId } from "@/data/landing-pages";

export async function getAuthorizedLanding(id: string) {
  const clientId = await getEffectiveClientId();

  if (!clientId) return null;

  const landing = await getLandingPageByIdAndUserId(id, clientId);

  if (!landing) return null;

  return landing;
}
