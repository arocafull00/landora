import { getAuthorizedLanding } from "@/lib/api/landing-auth";
import { replaceLandingSpaces } from "@/data/landing-sections";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const landing = await getAuthorizedLanding(id);

    if (!landing) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const items = Array.isArray(body.items) ? body.items : [];

    await replaceLandingSpaces(
      id,
      items.map((item: Record<string, unknown>) => ({
        name: typeof item.name === "string" ? item.name : "",
        description: typeof item.description === "string" ? item.description : "",
        image: typeof item.image === "string" ? item.image : "",
      }))
    );

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
