import { NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/booking/availability";
import { resolveTenantBySlug } from "@/lib/booking/resolve-tenant";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const serviceId = searchParams.get("serviceId");
  const employeeId = searchParams.get("employeeId");
  const date = searchParams.get("date");

  if (!slug || !serviceId || !employeeId || !date) {
    return NextResponse.json(
      { error: "slug, serviceId, employeeId and date required" },
      { status: 400 },
    );
  }

  try {
    const tenant = await resolveTenantBySlug(slug);
    if (!tenant || !tenant.enabled) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const slots = await getAvailableSlots({
      tenantId: tenant.tenantId,
      serviceId,
      employeeId: employeeId === "any" ? "any" : employeeId,
      date,
      timezone: tenant.timezone,
    });

    return NextResponse.json({
      data: slots.map((slot) => ({
        startsAt: slot.startsAt.toISOString(),
        endsAt: slot.endsAt.toISOString(),
        employeeId: slot.employeeId,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
