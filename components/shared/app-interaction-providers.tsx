"use client";

import { TooltipProvider } from "@/components/ui/tooltip";

export function AppInteractionProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
