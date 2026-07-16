import "server-only";

import { cache } from "react";
import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { bookingServices } from "@/db/schema";

export const getBookingServices = cache(
  async (tenantId: string, options?: { activeOnly?: boolean }) => {
    try {
      const conditions = options?.activeOnly
        ? and(eq(bookingServices.tenantId, tenantId), eq(bookingServices.isActive, true))
        : eq(bookingServices.tenantId, tenantId);
      return await db.query.bookingServices.findMany({
        where: conditions,
        orderBy: [asc(bookingServices.sortOrder), asc(bookingServices.createdAt)],
      });
    } catch {
      throw new Error("Failed to fetch booking services");
    }
  },
);

export const getBookingServiceById = cache(async (tenantId: string, id: string) => {
  try {
    return await db.query.bookingServices.findFirst({
      where: and(eq(bookingServices.tenantId, tenantId), eq(bookingServices.id, id)),
    }) ?? null;
  } catch {
    throw new Error("Failed to fetch booking service");
  }
});

export async function createBookingService(
  tenantId: string,
  data: {
    name: string;
    durationMinutes: number;
    priceCents: number;
    bufferAfterMinutes: number;
    isActive?: boolean;
  },
) {
  try {
    const existing = await db.query.bookingServices.findMany({
      where: eq(bookingServices.tenantId, tenantId),
    });
    const [row] = await db
      .insert(bookingServices)
      .values({
        tenantId,
        name: data.name,
        durationMinutes: data.durationMinutes,
        priceCents: data.priceCents,
        bufferAfterMinutes: data.bufferAfterMinutes,
        isActive: data.isActive ?? true,
        sortOrder: existing.length,
      })
      .returning();
    return row;
  } catch {
    throw new Error("Failed to create booking service");
  }
}

export async function updateBookingService(
  tenantId: string,
  id: string,
  data: {
    name?: string;
    durationMinutes?: number;
    priceCents?: number;
    bufferAfterMinutes?: number;
    isActive?: boolean;
  },
) {
  try {
    const [row] = await db
      .update(bookingServices)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(bookingServices.tenantId, tenantId), eq(bookingServices.id, id)))
      .returning();
    return row ?? null;
  } catch {
    throw new Error("Failed to update booking service");
  }
}

export async function setBookingServiceActive(tenantId: string, id: string, isActive: boolean) {
  try {
    const [row] = await db
      .update(bookingServices)
      .set({ isActive, updatedAt: new Date() })
      .where(and(eq(bookingServices.tenantId, tenantId), eq(bookingServices.id, id)))
      .returning();
    return row ?? null;
  } catch {
    throw new Error("Failed to update booking service status");
  }
}

export async function reorderBookingServices(tenantId: string, orderedIds: string[]) {
  try {
    await db.transaction(async (tx) => {
      await Promise.all(
        orderedIds.map((id, i) =>
          tx
            .update(bookingServices)
            .set({ sortOrder: i, updatedAt: new Date() })
            .where(
              and(eq(bookingServices.tenantId, tenantId), eq(bookingServices.id, id)),
            ),
        ),
      );
    });
  } catch {
    throw new Error("Failed to reorder booking services");
  }
}

export async function deleteBookingService(tenantId: string, id: string) {
  try {
    await db
      .delete(bookingServices)
      .where(and(eq(bookingServices.tenantId, tenantId), eq(bookingServices.id, id)));
  } catch {
    throw new Error("Failed to delete booking service");
  }
}

export async function assertServiceBelongsToTenant(tenantId: string, serviceId: string) {
  const service = await getBookingServiceById(tenantId, serviceId);
  if (!service) {
    throw new Error("Service not found");
  }
  return service;
}
