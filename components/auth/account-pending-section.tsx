"use client";

import { SignOutButton } from "@clerk/nextjs";
import { UserX } from "lucide-react";
import { ACCOUNT_PENDING_COPY } from "@/components/auth/account-pending-copy";
import { Button } from "@/components/ui/button";

export function AccountPendingSection() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-lg border border-outline-variant bg-surface-container-lowest p-8 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-warning/10 text-warning">
          <UserX className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-headline text-headline-lg font-semibold text-on-surface">
          {ACCOUNT_PENDING_COPY.title}
        </h1>
        <p className="mt-2 font-body text-body-md text-on-surface-variant">
          {ACCOUNT_PENDING_COPY.description}
        </p>
        <SignOutButton redirectUrl="/sign-in">
          <Button className="mt-8" type="button" variant="outline">
            {ACCOUNT_PENDING_COPY.signOut}
          </Button>
        </SignOutButton>
      </div>
    </div>
  );
}
