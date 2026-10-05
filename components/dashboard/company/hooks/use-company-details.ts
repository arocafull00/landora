"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useDashboardStore } from "@/stores/dashboard-store";
import { getSocialUrl } from "@/lib/footer-content";
import { companyDetailsSchema, type CompanyDetailsValues } from "@/lib/schemas/company-details";
import { COMPANY_COPY, COMPANY_SOCIAL_FIELDS } from "../company-copy";

export function useCompanyDetails() {
  const landing = useDashboardStore((state) => state.landings.find((item) => item.id === state.activeLandingId));
  const updateContact = useDashboardStore((state) => state.updateContact);
  const saveLanding = useDashboardStore((state) => state.saveLanding);
  const saveStatus = useDashboardStore((state) => state.saveStatus);
  const contact = landing?.content.contact;
  const form = useForm<CompanyDetailsValues>({
    resolver: zodResolver(companyDetailsSchema),
    defaultValues: {
      phone: contact?.phone ?? "",
      email: contact?.email ?? "",
      address: contact?.address ?? "",
      instagram: contact ? getSocialUrl(contact, "instagram") : "",
      facebook: contact ? getSocialUrl(contact, "facebook") : "",
      linkedin: contact ? getSocialUrl(contact, "linkedin") : "",
      tiktok: contact ? getSocialUrl(contact, "tiktok") : "",
      youtube: contact ? getSocialUrl(contact, "youtube") : "",
      x: contact ? getSocialUrl(contact, "x") : "",
    },
  });
  const submit = form.handleSubmit(async (values) => {
    if (!landing) return;
    const socialLinks = COMPANY_SOCIAL_FIELDS.flatMap(({ name }) => values[name] ? [{ platform: name, url: values[name] }] : []);
    updateContact(landing.id, { phone: values.phone, email: values.email, address: values.address, socialLinks });
    if (await saveLanding(landing.id)) form.reset(values);
  }, () => toast.error(COMPANY_COPY.invalid));

  return { form, submit, busy: form.formState.isSubmitting || saveStatus === "saving" };
}
