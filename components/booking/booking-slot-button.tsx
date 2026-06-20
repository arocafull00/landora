import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { formatSlotTime } from "@/lib/booking/format-datetime";

export function BookingSlotButton({
  slot,
}: {
  slot: { startsAt: string; endsAt: string };
}) {
  const label = formatSlotTime(slot.startsAt);

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
