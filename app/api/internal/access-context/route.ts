import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getSubscriptionStatusForProxy } from "@/data/subscriptions";
import { getBookingModuleAccessContextForClerkUser } from "@/data/user-addons";
import { logger } from "@/lib/logger";
import {
  hasBookingModuleAccess,
  hasDashboardAccess,
} from "@/lib/subscription-access";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({
      authenticated: false,
      userExists: false,
      suspended: false,
      dashboardAccess: false,
      bookingAccess: false,
    });
  }

  try {
    const [subscription, booking] = await Promise.all([
      getSubscriptionStatusForProxy(userId),
      getBookingModuleAccessContextForClerkUser(userId),
    ]);

    return NextResponse.json({
      authenticated: true,
      userExists: Boolean(subscription),
      suspended: subscription?.suspended ?? false,
      dashboardAccess: hasDashboardAccess(subscription),
      bookingAccess: hasBookingModuleAccess(booking),
    });
  } catch (error) {
    logger.captureException(error, { action: "resolve-proxy-access" });
    return NextResponse.json(
      { error: "Unable to resolve access" },
      { status: 500 },
    );
  }
}
