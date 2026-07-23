"use client";

import { AlertTriangle } from "lucide-react";
import { StatusBadge } from "@/components/ui/primitives";
import { UserAccessBadge } from "@/components/admin/user-access-badge";
import { UserActionsMenu } from "@/components/admin/user-actions-menu";
import { UserPlanBadge } from "@/components/admin/user-plan-badge";
import { UserStatusBadge } from "@/components/admin/user-status-badge";
import {
  getRelativePeriodEndLabel,
  getUserDisplayPlan,
  getUserDisplayStatus,
  isPeriodEndingSoon,
  type AdminUserWithLanding,
} from "@/lib/admin-user-display";
import { mediumDateFormatter } from "@/lib/intl-formatters";
import { getPublicLandingHost } from "@/lib/public-site-url";

export function UserTableRow({ user }: { user: AdminUserWithLanding }) {
  const displayStatus = getUserDisplayStatus(user);
  const displayPlan = getUserDisplayPlan(user);
  const createdAt = user.createdAt
    ? mediumDateFormatter.format(new Date(user.createdAt))
    : "—";
  const periodEnd = user.subscriptionCurrentPeriodEnd
    ? mediumDateFormatter.format(new Date(user.subscriptionCurrentPeriodEnd))
    : "—";
  const relativePeriodEnd = getRelativePeriodEndLabel(
    user.subscriptionCurrentPeriodEnd,
  );
  const endingSoon =
    user.accessType !== "manual" &&
    isPeriodEndingSoon(user.subscriptionCurrentPeriodEnd);

  return (
    <tr className="border-b border-outline-variant/60 transition-colors hover:bg-surface-container-low/55 last:border-b-0">
      <td className="px-4 py-3 align-top">
        <div className="flex min-w-[220px] items-start gap-3">
          <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary-fixed font-headline text-body-sm font-semibold uppercase text-primary-fixed-variant">
            {user.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-body text-body-sm font-semibold text-on-surface">
              {user.name}
            </p>
            <p className="truncate font-body text-body-sm text-on-surface-variant">
              {user.email ?? "Sin email"}
            </p>
            <p className="mt-1 font-body text-xs text-on-surface-variant/80">
              Desde {createdAt}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 align-top">
        <UserPlanBadge plan={displayPlan} />
      </td>
      <td className="px-4 py-3 align-top">
        <UserStatusBadge status={displayStatus} />
      </td>
      <td className="px-4 py-3 align-top">
        {user.accessType === "manual" ? (
          <p className="font-body text-body-sm text-on-surface-variant">—</p>
        ) : (
          <div>
            <p className="font-body text-body-sm text-on-surface">{periodEnd}</p>
            {relativePeriodEnd ? (
              <p className="font-body text-body-sm text-on-surface-variant">
                {relativePeriodEnd}
              </p>
            ) : null}
            {endingSoon ? (
              <p className="mt-1 inline-flex items-center gap-1 font-body text-body-sm text-warning">
                <AlertTriangle className="size-3.5" />
                Vence pronto
              </p>
            ) : null}
          </div>
        )}
      </td>
      <td className="px-4 py-3 align-top">
        {user.landing ? (
          <div>
            <StatusBadge status={user.landing.published ? "Published" : "Draft"} />
            <p className="mt-2 max-w-[240px] truncate font-body text-body-sm text-on-surface">
              {getPublicLandingHost(user.landing)}
            </p>
            <p className="font-body text-xs text-on-surface-variant">
              {user.landing.customDomain ? "Dominio personalizado" : "Subdominio"}
            </p>
          </div>
        ) : (
          <span className="font-body text-body-sm text-on-surface-variant">Sin landing</span>
        )}
      </td>
      <td className="px-4 py-3 align-top">
        <UserAccessBadge
          accessType={user.accessType}
          bookingManualAccess={user.bookingManualAccess}
        />
      </td>
      <td className="px-4 py-3 align-top">
        <UserActionsMenu user={user} />
      </td>
    </tr>
  );
}
