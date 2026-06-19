"use client";

import { useEffect, useState } from "react";
import { BookingEmployeeCard } from "@/components/booking/booking-employee-card";
import { Button } from "@/components/ui/button";

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
    return <p className="font-body text-body-sm">Cargando profesionales...</p>;
  }

  return (
    <div className="space-y-3">
      <h3 className="font-body text-body-md font-semibold">Elige un profesional</h3>
      <Button variant="outline" className="w-full" onClick={onAny}>
        Cualquier profesional
      </Button>
      {employees.map((employee) => (
        <BookingEmployeeCard
          key={employee.id}
          employee={employee}
          onSelect={() => onSelect(employee)}
        />
      ))}
    </div>
  );
}
