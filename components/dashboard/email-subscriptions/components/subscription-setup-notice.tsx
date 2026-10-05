import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SUBSCRIPTION_PRIVACY_COPY as copy } from "@/lib/email-subscriptions/copy";

export function SubscriptionSetupNotice({ href }: { href?: string }) {
  return (
    <Alert className="border-warning bg-warning-subtle text-warning-strong">
      <TriangleAlert aria-hidden />
      <AlertTitle>{copy.setupTitle}</AlertTitle>
      <AlertDescription className="text-warning-strong">
        <p>{copy.setupDescription}</p>
        {href ? <Button asChild size="sm" variant="outline"><Link href={href}>{copy.setupAction}</Link></Button> : null}
      </AlertDescription>
    </Alert>
  );
}
