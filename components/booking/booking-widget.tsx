"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { Turnstile } from "@marsidev/react-turnstile";
import { usePublicBookingStore } from "@/stores/public-booking-store";
import { BookingSummary } from "@/components/booking/booking-summary";
import { BookingStepService } from "@/components/booking/booking-step-service";
import { BookingStepProfessional } from "@/components/booking/booking-step-professional";
import { BookingStepDate } from "@/components/booking/booking-step-date";
import { BookingStepTime } from "@/components/booking/booking-step-time";
import { BookingStepContact } from "@/components/booking/booking-step-contact";
import { BookingStepConfirmation } from "@/components/booking/booking-step-confirmation";
import { createBookingAction } from "@/app/actions/bookings";

export function BookingWidget({ slug }: { slug: string }) {
  const {
    step,
    stepIndex,
    selection,
    publicToken,
    setStep,
    goBack,
    setSelection,
    setPublicToken,
    reset,
  } = usePublicBookingStore();

  const [turnstileToken, setTurnstileToken] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    reset();
  }, [slug]);

  const summary = useMemo(
    () => ({
      serviceName: selection.serviceName,
      employeeName: selection.employeeName,
      date: selection.date,
      startsAt: selection.startsAt,
    }),
    [selection],
  );

  const submitBooking = (contact: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    notes: string;
    honeypot: string;
  }) => {
    if (
      !selection.serviceId ||
      !selection.employeeId ||
      !selection.startsAt ||
      !turnstileToken
    ) {
      toast.error("Completa todos los pasos");
      return;
    }

    startTransition(async () => {
      const result = await createBookingAction({
        slug,
        serviceId: selection.serviceId!,
        employeeId: selection.employeeId!,
        startsAt: selection.startsAt!,
        customerName: contact.customerName,
        customerPhone: contact.customerPhone,
        customerEmail: contact.customerEmail,
        notes: contact.notes,
        turnstileToken,
        honeypot: contact.honeypot,
      });

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      setPublicToken(result.publicToken);
      setStep("confirmation");
      toast.success("Reserva creada");
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
      <div className="rounded-xl border border-outline-variant bg-surface p-4 md:p-6">
        {step === "service" ? (
          <BookingStepService
            slug={slug}
            onSelect={(service) => {
              setSelection({
                serviceId: service.id,
                serviceName: service.name,
                employeeId: undefined,
                employeeName: undefined,
                date: undefined,
                startsAt: undefined,
                endsAt: undefined,
              });
              setStep("professional");
            }}
          />
        ) : null}
        {step === "professional" && selection.serviceId ? (
          <BookingStepProfessional
            slug={slug}
            serviceId={selection.serviceId}
            onSelect={(employee) => {
              setSelection({
                employeeId: employee.id,
                employeeName: employee.name,
                date: undefined,
                startsAt: undefined,
                endsAt: undefined,
              });
              setStep("date");
            }}
            onAny={() => {
              setSelection({
                employeeId: "any",
                employeeName: "Cualquier profesional",
                date: undefined,
                startsAt: undefined,
                endsAt: undefined,
              });
              setStep("date");
            }}
          />
        ) : null}
        {step === "date" && selection.serviceId && selection.employeeId ? (
          <BookingStepDate
            onSelect={(date) => {
              setSelection({ date, startsAt: undefined, endsAt: undefined });
              setStep("time");
            }}
          />
        ) : null}
        {step === "time" &&
        selection.serviceId &&
        selection.employeeId &&
        selection.date ? (
          <BookingStepTime
            slug={slug}
            serviceId={selection.serviceId}
            employeeId={selection.employeeId}
            date={selection.date}
            onSelect={(slot) => {
              setSelection({ startsAt: slot.startsAt, endsAt: slot.endsAt });
              setStep("contact");
            }}
          />
        ) : null}
        {step === "contact" ? (
          <BookingStepContact
            pending={pending}
            onBack={() => setStep("time")}
            onSubmit={submitBooking}
            turnstile={
              process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                  onSuccess={setTurnstileToken}
                />
              ) : null
            }
          />
        ) : null}
        {step === "confirmation" && publicToken ? (
          <BookingStepConfirmation publicToken={publicToken} />
        ) : null}
        {stepIndex > 0 && step !== "confirmation" ? (
          <button
            type="button"
            className="mt-4 font-body text-body-sm text-on-surface-variant underline"
            onClick={goBack}
          >
            Volver
          </button>
        ) : null}
      </div>
      <BookingSummary summary={summary} />
    </div>
  );
}
