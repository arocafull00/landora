"use client";

import { useEffect, useState } from "react";
import { BookingServiceCard } from "@/components/booking/booking-service-card";

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
    fetch(`/api/booking/services?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((json) => {
        setServices(json.data ?? []);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <p className="font-body text-body-sm">Cargando servicios...</p>;
  }

  if (services.length === 0) {
    return <p className="font-body text-body-sm">No hay servicios disponibles.</p>;
  }

  return (
    <div className="space-y-3">
      <h3 className="font-body text-body-md font-semibold">Elige un servicio</h3>
      {services.map((service) => (
        <BookingServiceCard key={service.id} service={service} onSelect={() => onSelect(service)} />
      ))}
    </div>
  );
}
