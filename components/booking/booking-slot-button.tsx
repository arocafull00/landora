import { ToggleGroupItem } from "@/components/ui/toggle-group";

export function BookingSlotButton({
  slot,
}: {
  slot: { startsAt: string; endsAt: string };
}) {
  const label = new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(slot.startsAt));

  return (
    <ToggleGroupItem
      value={slot.startsAt}
      className="w-full"
      aria-label={`Reservar a las ${label}`}
    >
      {label}
    </ToggleGroupItem>
  );
}
