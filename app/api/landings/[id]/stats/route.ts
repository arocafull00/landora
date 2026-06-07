import { getAuthorizedLanding } from "@/lib/api/landing-auth";
import { replaceLandingStats } from "@/data/landing-sections";

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

    await replaceLandingStats(
      id,
      items.map((item: Record<string, unknown>) => ({
        value: typeof item.value === "string" ? item.value : "",
        label: typeof item.label === "string" ? item.label : "",
        countTo: typeof item.countTo === "number" ? item.countTo : null,
        suffix: typeof item.suffix === "string" ? item.suffix : "",
      }))
    );

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
