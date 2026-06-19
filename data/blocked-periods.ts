import { cache } from "react";
import { and, eq, gte, lte, or, isNull } from "drizzle-orm";
import { db } from "@/db";
import { blockedPeriods } from "@/db/schema";

export const getBlockedPeriods = cache(
  async (
    tenantId: string,
    options?: { rangeStart?: Date; rangeEnd?: Date; employeeId?: string | null },
  ) => {
    try {
      const conditions = [eq(blockedPeriods.tenantId, tenantId)];

      if (options?.rangeStart && options?.rangeEnd) {
        conditions.push(
          lte(blockedPeriods.startsAt, options.rangeEnd),
          gte(blockedPeriods.endsAt, options.rangeStart),
        );
      }

      if (options?.employeeId !== undefined) {
        if (options.employeeId === null) {
          conditions.push(isNull(blockedPeriods.employeeId));
        } else {
          conditions.push(
            or(
              isNull(blockedPeriods.employeeId),
              eq(blockedPeriods.employeeId, options.employeeId),
            )!,
          );
        }
      }

      return await db.query.blockedPeriods.findMany({
        where: and(...conditions),
        orderBy: (bp, { asc }) => [asc(bp.startsAt)],
      });
    } catch {
      throw new Error("Failed to fetch blocked periods");
    }
  },
);

export async function createBlockedPeriod(
  tenantId: string,
  data: {
    employeeId: string | null;
    startsAt: Date;
    endsAt: Date;
    reason: string;
  },
) {
  try {
    const [row] = await db
      .insert(blockedPeriods)
      .values({ tenantId, ...data })
      .returning();
    return row;
  } catch {
    throw new Error("Failed to create blocked period");
  }
}

export async function updateBlockedPeriod(
  tenantId: string,
  id: string,
  data: {
    employeeId?: string | null;
    startsAt?: Date;
    endsAt?: Date;
    reason?: string;
  },
) {
  try {
    const [row] = await db
      .update(blockedPeriods)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(blockedPeriods.tenantId, tenantId), eq(blockedPeriods.id, id)))
      .returning();
    return row ?? null;
  } catch {
    throw new Error("Failed to update blocked period");
  }
}

export async function deleteBlockedPeriod(tenantId: string, id: string) {
  try {
    await db
      .delete(blockedPeriods)
      .where(and(eq(blockedPeriods.tenantId, tenantId), eq(blockedPeriods.id, id)));
  } catch {
    throw new Error("Failed to delete blocked period");
  }
}
