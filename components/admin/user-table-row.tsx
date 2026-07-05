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
    <tr className="border-b border-outline-variant/60 last:border-b-0">
      <td className="px-4 py-3 align-top">
        <div className="min-w-[180px]">
          <p className="font-body text-body-sm font-medium text-on-surface">
            {user.name}
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">
            {user.email ?? "Sin email"}
          </p>
          <p className="mt-1 font-mono text-body-sm text-on-surface-variant/70">
            {user.clerkUserId.slice(0, 12)}…
          </p>
          <p className="mt-1 font-body text-body-sm text-on-surface-variant/70">
            Cliente desde {createdAt}
          </p>
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
          <StatusBadge status={user.landing.published ? "Published" : "Draft"} />
        ) : (
          <span className="font-body text-body-sm text-on-surface-variant">
            Sin landing
          </span>
        )}
      </td>
      <td className="px-4 py-3 align-top">
        {user.landing?.customDomain ? (
          <div>
            <p className="font-body text-body-sm text-on-surface">
              {user.landing.customDomain}
            </p>
            <p className="font-body text-body-sm text-on-surface-variant">
              Personalizado
            </p>
          </div>
        ) : user.landing ? (
          <div>
            <p className="font-body text-body-sm text-on-surface">
              /{user.landing.slug.replace(/^\//, "")}
            </p>
            <p className="font-body text-body-sm text-on-surface-variant">
              Subdominio
            </p>
          </div>
        ) : (
          <span className="font-body text-body-sm text-on-surface-variant">—</span>
        )}
      </td>
      <td className="px-4 py-3 align-top">
        <UserAccessBadge accessType={user.accessType} />
      </td>
      <td className="px-4 py-3 align-top">
        <UserActionsMenu user={user} />
      </td>
    </tr>
  );
}
