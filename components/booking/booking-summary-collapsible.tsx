"use client";

import { ChevronDown } from "lucide-react";
import { Collapsible } from "@/components/ui/collapsible";
import { CollapsibleContent } from "@/components/ui/collapsible-content";
import { CollapsibleTrigger } from "@/components/ui/collapsible-trigger";
import { BookingSummary } from "@/components/booking/booking-summary";

export function BookingSummaryCollapsible({
  summary,
  defaultOpen = false,
}: {
  summary: {
    serviceName?: string;
    employeeName?: string;
    date?: string;
    startsAt?: string;
  };
  defaultOpen?: boolean;
}) {
  return (
    <Collapsible defaultOpen={defaultOpen} className="lg:hidden">
      <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border border-outline-variant bg-surface-container px-4 py-3 text-left font-body text-body-sm font-medium text-on-surface transition-colors duration-150 hover:bg-surface-container-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        Ver resumen
        <ChevronDown
          className="size-4 text-on-surface-variant transition-transform duration-150 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden">
        <div className="pt-3">
          <BookingSummary summary={summary} embedded />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
