import { getAuthorizedLanding } from "@/lib/api/landing-auth";
import { replaceLandingWorkflow } from "@/data/landing-sections";

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

    await replaceLandingWorkflow(
      id,
      items.map((item: Record<string, unknown>) => ({
        number: typeof item.number === "string" ? item.number : "",
        title: typeof item.title === "string" ? item.title : "",
        description: typeof item.description === "string" ? item.description : "",
      }))
    );

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
