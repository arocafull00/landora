import { getEffectiveClientId } from "@/lib/auth";
import { getLandingPageByUserId } from "@/data/landing-pages";

export async function GET() {
  try {
    const clientId = await getEffectiveClientId();

    if (!clientId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const landing = await getLandingPageByUserId(clientId);

    if (!landing) {
      return Response.json({ error: "Landing not found" }, { status: 404 });
    }

    return Response.json(landing);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
