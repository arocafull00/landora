"use client";

import { ToastContainer } from "react-toastify";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppInteractionProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      {children}
      <ToastContainer />
    </TooltipProvider>
  );
}
