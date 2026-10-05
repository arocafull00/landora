"use client";

import Image from "next/image";
import Link from "next/link";
import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebarToggle } from "@/components/dashboard/dashboard-sidebar-toggle";
import { cn } from "@/lib/utils";

export function DashboardSidebarHeader() {
  const { isMobile, setOpenMobile, open } = useSidebar();

  if (isMobile) {
    return (
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-3">
          <Link
            href="/editor"
            aria-label="Landora, editor"
            onClick={() => setOpenMobile(false)}
            className="shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Image
              src="/favicon.png"
              alt=""
              width={44}
              height={44}
              className="size-11 rounded-xl"
            />
          </Link>
          <span className="flex-1 font-headline text-lg font-semibold">
            Landora
          </span>
          <DashboardSidebarToggle />
        </div>
      </SidebarHeader>
    );
  }

  return (
    <SidebarHeader
      className={cn(
        "py-4",
        open ? "px-3" : "group-data-[collapsible=icon]:!px-0"
      )}
    >
      {open ? (
        <div className="flex w-full items-center gap-3">
          <Link
            href="/editor"
            aria-label="Landora, editor"
            className="shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Image
              src="/favicon.png"
              alt=""
              width={44}
              height={44}
              className="size-11 rounded-xl"
            />
          </Link>
          <span className="min-w-0 flex-1 truncate font-headline text-lg font-semibold text-sidebar-foreground">
            Landora
          </span>
          <DashboardSidebarToggle />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center gap-2">
          <Link
            href="/editor"
            aria-label="Landora, editor"
            className="shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Image
              src="/favicon.png"
              alt=""
              width={44}
              height={44}
              className="size-11 rounded-xl"
            />
          </Link>
          <DashboardSidebarToggle />
        </div>
      )}
    </SidebarHeader>
  );
}
