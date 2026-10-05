"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { toast } from "sonner";
import { subscribeEmailAction } from "@/app/actions/email-subscriptions";
import { subscriptionFormSchema, type SubscriptionForm } from "@/lib/schemas/email-subscriptions";
import { SUBSCRIPTIONS_COPY as copy } from "@/lib/email-subscriptions/copy";

export const newsletterSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function useNuvoletsNewsletter(slug: string, disabled: boolean) {
  const form = useForm<SubscriptionForm>({ resolver: zodResolver(subscriptionFormSchema), defaultValues: { email: "", consent: false, honeypot: "" } });
  const [token, setToken] = useState("");
  const widgetRef = useRef<TurnstileInstance>(null);
  const submit = form.handleSubmit(async (value) => {
    if (disabled) return;
    if (!token) { toast.error(copy.verification); return; }
    try {
      const result = await subscribeEmailAction({ ...value, consent: true, slug, turnstileToken: token });
      if ("error" in result) { toast.error(result.error); return; }
      toast.success(copy.saved);
      form.reset();
    } catch {
      toast.error(copy.failed);
    } finally {
      setToken("");
      widgetRef.current?.reset();
    }
  }, () => toast.error(copy.invalid));
  return { form, token, setToken, widgetRef, submit };
}
