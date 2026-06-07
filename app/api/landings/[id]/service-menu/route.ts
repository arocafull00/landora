import { getAuthorizedLanding } from "@/lib/api/landing-auth";
import { replaceLandingServiceMenu } from "@/data/landing-sections";

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

    await replaceLandingServiceMenu(
      id,
      items.map((item: Record<string, unknown>) => ({
        category: typeof item.category === "string" ? item.category : "",
        name: typeof item.name === "string" ? item.name : "",
        description: typeof item.description === "string" ? item.description : "",
        price: typeof item.price === "string" ? item.price : "",
        duration: typeof item.duration === "string" ? item.duration : "",
        image: typeof item.image === "string" ? item.image : "",
      }))
    );

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
