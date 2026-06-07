import { getAuthorizedLanding } from "@/lib/api/landing-auth";
import { upsertLandingCta } from "@/data/landing-sections";

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

    await upsertLandingCta(id, {
      phone: typeof body.phone === "string" ? body.phone : "",
      email: typeof body.email === "string" ? body.email : "",
      address: typeof body.address === "string" ? body.address : "",
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
