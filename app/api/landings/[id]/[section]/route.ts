import { assertLandingAccess } from "@/lib/api/landing-auth";
import { SECTION_REGISTRY } from "@/lib/api/landing-section-registry";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; section: string }> }
) {
  try {
    const { id, section } = await params;
    const handler = SECTION_REGISTRY[section];

    if (!handler) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    const meta = await assertLandingAccess(id);

    if (!meta) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = handler.parse(body, meta);
    await handler.persist(id, parsed);

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
