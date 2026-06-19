import { cache } from "react";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { bookingSettings } from "@/db/schema";
import type { BookingSettings } from "@/db/schema";

const DEFAULT_SETTINGS: Omit<BookingSettings, "tenantId"> = {
  enabled: false,
  timezone: "Europe/Madrid",
  autoConfirmBookings: true,
  minAdvanceHours: 2,
  maxAdvanceDays: 60,
  slotGranularityMinutes: 15,
  notificationEmail: "",
};

export const getBookingSettings = cache(async (tenantId: string): Promise<BookingSettings> => {
  try {
    const row = await db.query.bookingSettings.findFirst({
      where: eq(bookingSettings.tenantId, tenantId),
    });
    if (!row) {
      return { tenantId, ...DEFAULT_SETTINGS };
    }
    return row;
  } catch {
    throw new Error("Failed to fetch booking settings");
  }
});

export async function upsertBookingSettings(
  tenantId: string,
  data: Partial<Omit<BookingSettings, "tenantId">>,
) {
  try {
    const [row] = await db
      .insert(bookingSettings)
      .values({ tenantId, ...DEFAULT_SETTINGS, ...data })
      .onConflictDoUpdate({
        target: bookingSettings.tenantId,
        set: data,
      })
      .returning();
    return row;
  } catch {
    throw new Error("Failed to update booking settings");
  }
}
