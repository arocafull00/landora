import { getAuthorizedLanding } from "@/lib/api/landing-auth";
import { replaceLandingServices } from "@/data/landing-sections";

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

    await replaceLandingServices(
      id,
      items.map((item: Record<string, unknown>) => ({
        title: typeof item.title === "string" ? item.title : "",
        subtitle: typeof item.subtitle === "string" ? item.subtitle : "",
        label: typeof item.label === "string" ? item.label : "",
        image: typeof item.image === "string" ? item.image : "",
      }))
    );

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
