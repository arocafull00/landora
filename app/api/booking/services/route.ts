import { NextResponse } from "next/server";
import { getBookingServices } from "@/data/booking-services";
import { resolveTenantBySlug } from "@/lib/booking/resolve-tenant";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  try {
    const tenant = await resolveTenantBySlug(slug);
    if (!tenant || !tenant.enabled) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const services = await getBookingServices(tenant.tenantId, { activeOnly: true });

    return NextResponse.json({
      data: services.map((s) => ({
        id: s.id,
        name: s.name,
        durationMinutes: s.durationMinutes,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
