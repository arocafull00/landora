"use client";

import { SignalContactFields } from "@/components/templates/signal/signal-contact-fields";
import { useSignalContactForm } from "@/components/templates/signal/hooks/use-signal-contact-form";

export function SignalContactForm({ slug, enabled }: { slug: string; enabled: boolean }) {
  const form = useSignalContactForm(slug, enabled);
  return <SignalContactFields {...form} enabled={enabled} />;
}
