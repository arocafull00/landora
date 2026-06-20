import { RadioGroupItem } from "@/components/ui/radio-group";

export function BookingServiceCard({
  service,
}: {
  service: { id: string; name: string; durationMinutes: number };
}) {
  return (
    <RadioGroupItem value={service.id} className="gap-4">
      <span>{service.name}</span>
      <span className="font-body text-body-sm text-on-surface-variant">
        {service.durationMinutes} min
      </span>
    </RadioGroupItem>
  );
}
