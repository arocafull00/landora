"use client";

import { SignOutButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import { toast } from "react-toastify";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { SUBSCRIBE_COPY } from "@/components/dashboard/subscribe/subscribe-copy";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/primitives";

export function SubscribeSection({ paymentLink }: { paymentLink: string | null }) {
  function handleSubscribe() {
    if (!paymentLink) {
      toast.error(SUBSCRIBE_COPY.ctaError);
      return;
    }

    window.location.href = paymentLink;
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardPageHeader
        description={SUBSCRIBE_COPY.description}
        title={SUBSCRIBE_COPY.title}
      />

      <div className="flex-1 overflow-auto p-unit-lg">
        <div className="mx-auto max-w-3xl">
          <Panel className="space-y-8 p-8">
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary">
                <CreditCard className="size-6" aria-hidden="true" />
              </span>
              <p className="font-body text-body-md text-on-surface">
                {SUBSCRIBE_COPY.description}
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 border-t border-outline-variant pt-6 sm:flex-row sm:items-center sm:justify-between">
              <SignOutButton redirectUrl="/sign-in">
                <Button type="button" variant="outline">
                  {SUBSCRIBE_COPY.signOut}
                </Button>
              </SignOutButton>
              <Button disabled={!paymentLink} onClick={handleSubscribe} size="lg" type="button">
                {SUBSCRIBE_COPY.cta}
              </Button>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
