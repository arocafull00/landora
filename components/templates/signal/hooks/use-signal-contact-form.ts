"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { submitSignalContactAction } from "@/app/actions/signal-contact";
import { SIGNAL_CONTACT_COPY } from "@/components/templates/signal/signal-copy";
import {
  signalContactFieldsSchema,
  type SignalContactFields,
} from "@/lib/schemas/signal-contact";

export function useSignalContactForm(slug: string, enabled: boolean) {
  const form = useForm<SignalContactFields>({
    resolver: zodResolver(signalContactFieldsSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
      honeypot: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    if (!enabled) return;
    const result = await submitSignalContactAction({ ...values, slug });
    if (result.status === "sent") {
      toast.success(SIGNAL_CONTACT_COPY.sent);
      form.reset();
      return;
    }
    toast.error(result.error);
  }, () => toast.error(SIGNAL_CONTACT_COPY.invalid));

  return {
    register: form.register,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
    reset: form.reset,
  };
}
