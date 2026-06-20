"use client";

import { useEffect, useState } from "react";
import { Scissors } from "lucide-react";
import { RadioGroup } from "@/components/ui/radio-group";
import { BookingServiceCard } from "@/components/booking/booking-service-card";
import { BookingStepHeader } from "@/components/booking/booking-step-header";
import { BookingStepLoading } from "@/components/booking/booking-step-loading";
import { BookingEmptyState } from "@/components/booking/booking-empty-state";
import { getPublicBookingServicesAction } from "@/app/actions/public-booking";

type Service = { id: string; name: string; durationMinutes: number };

export function BookingStepService({
  slug,
  onSelect,
}: {
  slug: string;
  onSelect: (service: Service) => void;
}) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getPublicBookingServicesAction(slug)
      .then((result) => {
        if (cancelled) {
          return;
        }
        if ("error" in result) {
          setServices([]);
          return;
        }
        setServices(result.data);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="space-y-4">
        <BookingStepHeader title="Elige un servicio" />
        <BookingStepLoading variant="list" />
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="space-y-4">
        <BookingStepHeader title="Elige un servicio" />
        <BookingEmptyState
          icon={Scissors}
          message="No hay servicios disponibles en este momento."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BookingStepHeader
        title="Elige un servicio"
        description="Selecciona el servicio que quieres reservar."
      />
      <RadioGroup
        onValueChange={(value) => {
          const service = services.find((item) => item.id === value);
          if (!service) {
            return;
          }
          onSelect(service);
        }}
      >
        {services.map((service) => (
          <BookingServiceCard key={service.id} service={service} />
        ))}
      </RadioGroup>
    </div>
  );
}
