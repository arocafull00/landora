import Image from "next/image";
import { SidebarHeader } from "@/components/ui/sidebar";

export function DashboardSidebarHeader() {
  return (
    <SidebarHeader className="border-b border-sidebar-border px-unit-sm py-unit-lg">
      <div className="flex items-center gap-2.5 px-1 group-data-[collapsible=icon]:justify-center">
        <Image
          src="/favicon.png"
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-lg"
        />
        <span className="truncate font-headline text-headline-md font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
          Landora
        </span>
      </div>
    </SidebarHeader>
  );
}
