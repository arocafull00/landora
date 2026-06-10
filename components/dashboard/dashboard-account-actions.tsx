"use client";

import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardAccountActions({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <UserButton />
      <SignOutButton redirectUrl="/sign-in">
        <Button variant="outline" size="sm">
          Cerrar sesión
        </Button>
      </SignOutButton>
    </div>
  );
}
