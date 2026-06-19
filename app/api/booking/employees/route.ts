import { NextResponse } from "next/server";
import { getEmployeesForService } from "@/data/employee-services";
import { resolveTenantBySlug } from "@/lib/booking/resolve-tenant";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const serviceId = searchParams.get("serviceId");

  if (!slug || !serviceId) {
    return NextResponse.json({ error: "slug and serviceId required" }, { status: 400 });
  }

  try {
    const tenant = await resolveTenantBySlug(slug);
    if (!tenant || !tenant.enabled) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const employees = await getEmployeesForService(tenant.tenantId, serviceId);

    return NextResponse.json({
      data: employees.map((e) => ({ id: e.id, name: e.name })),
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
