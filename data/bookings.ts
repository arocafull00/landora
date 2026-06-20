import { cache } from "react";
import { and, asc, eq, gte, lte, ne } from "drizzle-orm";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import type { BookingStatus, NewBooking } from "@/db/schema";

type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export type BookingFilters = {
  status?: BookingStatus;
  employeeId?: string;
  rangeStart?: Date;
  rangeEnd?: Date;
};

export const getBookings = cache(async (tenantId: string, filters?: BookingFilters) => {
  try {
    const conditions = [eq(bookings.tenantId, tenantId)];

    if (filters?.status) {
      conditions.push(eq(bookings.status, filters.status));
    }
    if (filters?.employeeId) {
      conditions.push(eq(bookings.employeeId, filters.employeeId));
    }
    if (filters?.rangeStart) {
      conditions.push(gte(bookings.startsAt, filters.rangeStart));
    }
    if (filters?.rangeEnd) {
      conditions.push(lte(bookings.startsAt, filters.rangeEnd));
    }

    return await db.query.bookings.findMany({
      where: and(...conditions),
      orderBy: [asc(bookings.startsAt)],
      with: {
        employee: true,
      },
    });
  } catch {
    throw new Error("Failed to fetch bookings");
  }
});

export const getBookingsForDay = cache(
  async (tenantId: string, dayStart: Date, dayEnd: Date) => {
    try {
      return await db.query.bookings.findMany({
        where: and(
          eq(bookings.tenantId, tenantId),
          gte(bookings.startsAt, dayStart),
          lte(bookings.startsAt, dayEnd),
          ne(bookings.status, "cancelled"),
        ),
        orderBy: [asc(bookings.startsAt)],
        with: {
          employee: true,
        },
      });
    } catch {
      throw new Error("Failed to fetch bookings for day");
    }
  },
);

export const getActiveBookingsForEmployeeInRange = cache(
  async (tenantId: string, employeeId: string, rangeStart: Date, rangeEnd: Date) => {
    try {
      return await db.query.bookings.findMany({
        where: and(
          eq(bookings.tenantId, tenantId),
          eq(bookings.employeeId, employeeId),
          ne(bookings.status, "cancelled"),
          lte(bookings.startsAt, rangeEnd),
          gte(bookings.endsAt, rangeStart),
        ),
      });
    } catch {
      throw new Error("Failed to fetch active bookings for employee");
    }
  },
);

export const getBookingByPublicToken = cache(async (publicToken: string) => {
  try {
    return await db.query.bookings.findFirst({
      where: eq(bookings.publicToken, publicToken),
      with: {
        employee: true,
        service: true,
      },
    }) ?? null;
  } catch {
    throw new Error("Failed to fetch booking by token");
  }
});

export const getBookingById = cache(async (tenantId: string, id: string) => {
  try {
    return await db.query.bookings.findFirst({
      where: and(eq(bookings.tenantId, tenantId), eq(bookings.id, id)),
      with: {
        employee: true,
      },
    }) ?? null;
  } catch {
    throw new Error("Failed to fetch booking");
  }
});

export async function createBookingRecord(tx: Transaction, data: NewBooking) {
  try {
    const [row] = await tx.insert(bookings).values(data).returning();
    if (!row) {
      throw new Error("Insert returned no row");
    }
    return row;
  } catch (err) {
    console.error("[booking] createBookingRecord error:", err);
    throw err;
  }
}

export async function updateBookingStatus(
  tenantId: string,
  id: string,
  status: BookingStatus,
) {
  try {
    const [row] = await db
      .update(bookings)
      .set({ status, updatedAt: new Date() })
      .where(and(eq(bookings.tenantId, tenantId), eq(bookings.id, id)))
      .returning();
    return row ?? null;
  } catch {
    throw new Error("Failed to update booking status");
  }
}

export async function updateBookingStatusByToken(publicToken: string, status: BookingStatus) {
  try {
    const [row] = await db
      .update(bookings)
      .set({ status, updatedAt: new Date() })
      .where(eq(bookings.publicToken, publicToken))
      .returning();
    return row ?? null;
  } catch {
    throw new Error("Failed to update booking status by token");
  }
}
