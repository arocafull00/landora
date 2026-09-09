"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { ChevronsUpDown, LogOut, UserRound } from "lucide-react";
import { DashboardAccountAvatar } from "@/components/dashboard/dashboard-account-avatar";
import { DASHBOARD_ACCOUNT_COPY } from "@/components/dashboard/dashboard-account-actions-copy";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function DashboardAccountActions({
  className,
}: {
  className?: string;
}) {
  const { isLoaded, user } = useUser();
  const { openUserProfile, signOut } = useClerk();

  if (!isLoaded || !user) {
    return null;
  }

  const displayName =
    user.fullName ?? user.firstName ?? DASHBOARD_ACCOUNT_COPY.defaultName;
  const email = user.primaryEmailAddress?.emailAddress ?? "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-3 rounded-lg bg-surface-container-low px-2 py-2 text-left transition-colors hover:bg-surface-container",
            className
          )}
        >
          <DashboardAccountAvatar imageUrl={user.imageUrl} />
          <span className="min-w-0 flex-1">
            <span className="block truncate font-body text-body-sm font-semibold text-on-surface">
              {displayName}
            </span>
            {email ? (
              <span className="block truncate font-body text-body-sm text-on-surface-variant">
                {email}
              </span>
            ) : null}
          </span>
          <ChevronsUpDown
            aria-hidden
            className="size-4 shrink-0 text-on-surface-variant"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[var(--radix-dropdown-menu-trigger-width)] border-outline-variant bg-surface-container p-1"
        side="top"
        sideOffset={8}
      >
        <DropdownMenuItem
          className="gap-2 rounded-md px-2 py-2 font-body text-body-sm text-on-surface focus:bg-surface-container-high"
          onSelect={() => openUserProfile()}
        >
          <UserRound className="size-4 text-on-surface-variant" />
          {DASHBOARD_ACCOUNT_COPY.account}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 rounded-md px-2 py-2 font-body text-body-sm text-on-surface focus:bg-surface-container-high"
          onSelect={() => signOut({ redirectUrl: "/sign-in" })}
        >
          <LogOut className="size-4 text-on-surface-variant" />
          {DASHBOARD_ACCOUNT_COPY.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
