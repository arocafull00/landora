import { getAuthorizedLanding } from "@/lib/api/landing-auth";
import { upsertLandingHero } from "@/data/landing-sections";

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

    await upsertLandingHero(id, {
      eyebrow: typeof body.eyebrow === "string" ? body.eyebrow : "",
      title: typeof body.title === "string" ? body.title : "",
      subtitle: typeof body.subtitle === "string" ? body.subtitle : "",
      description: typeof body.description === "string" ? body.description : "",
      image: typeof body.image === "string" ? body.image : "",
      houseImage: typeof body.houseImage === "string" ? body.houseImage : "",
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
