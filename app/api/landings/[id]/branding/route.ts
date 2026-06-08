import { getAuthorizedLanding } from "@/lib/api/landing-auth";
import { upsertLandingBranding } from "@/data/landing-sections";

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

    const sectionHeadings =
      body.sectionHeadings && typeof body.sectionHeadings === "object" && !Array.isArray(body.sectionHeadings)
        ? (body.sectionHeadings as Record<string, { title: string; subtitle: string }>)
        : undefined;

    await upsertLandingBranding(id, {
      brand: typeof body.brand === "string" ? body.brand : "",
      sectionHeadings,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
