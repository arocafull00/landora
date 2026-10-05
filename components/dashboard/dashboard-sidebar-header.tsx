import Image from "next/image";
import { SidebarHeader } from "@/components/ui/sidebar";
import { DashboardSidebarToggle } from "@/components/dashboard/dashboard-sidebar-toggle";

export function DashboardSidebarHeader() {
  return (
    <SidebarHeader className="border-b border-sidebar-border px-unit-sm py-unit-lg">
      <div className="flex h-8 items-center gap-2.5 px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
        <Image
          src="/favicon.png"
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-lg group-data-[collapsible=icon]:hidden"
        />
        <span className="min-w-0 flex-1 truncate font-headline text-headline-md font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
          Landora
        </span>
        <DashboardSidebarToggle />
      </div>
    </SidebarHeader>
  );
}
