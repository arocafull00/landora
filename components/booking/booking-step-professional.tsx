"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BookingEmployeeCard } from "@/components/booking/booking-employee-card";
import { BookingStepHeader } from "@/components/booking/booking-step-header";
import { BookingStepLoading } from "@/components/booking/booking-step-loading";
import { BookingEmptyState } from "@/components/booking/booking-empty-state";

type Employee = { id: string; name: string };

export function BookingStepProfessional({
  slug,
  serviceId,
  onSelect,
  onAny,
}: {
  slug: string;
  serviceId: string;
  onSelect: (employee: Employee) => void;
  onAny: () => void;
}) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `/api/booking/employees?slug=${encodeURIComponent(slug)}&serviceId=${encodeURIComponent(serviceId)}`,
    )
      .then((res) => res.json())
      .then((json) => setEmployees(json.data ?? []))
      .finally(() => setLoading(false));
  }, [slug, serviceId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <BookingStepHeader title="Elige un profesional" />
        <BookingStepLoading variant="list" />
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="space-y-4">
        <BookingStepHeader title="Elige un profesional" />
        <BookingEmptyState
          icon={Users}
          message="No hay profesionales disponibles para este servicio."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BookingStepHeader
        title="Elige un profesional"
        description="Puedes elegir una persona concreta o dejar que asignemos el primer hueco disponible."
      />
      <RadioGroup
        onValueChange={(value) => {
          if (value === "any") {
            onAny();
            return;
          }
          const employee = employees.find((item) => item.id === value);
          if (!employee) {
            return;
          }
          onSelect(employee);
        }}
      >
        <RadioGroupItem value="any">Cualquier profesional</RadioGroupItem>
        {employees.map((employee) => (
          <BookingEmployeeCard key={employee.id} employee={employee} />
        ))}
      </RadioGroup>
    </div>
  );
}
