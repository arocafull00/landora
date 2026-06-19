import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookingDurationField({
  id,
  value,
  onChange,
  disabled,
  min = 0,
  max = 480,
  className,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-9 overflow-hidden rounded-md border border-input bg-transparent shadow-xs focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-r border-input px-3">
        <Clock className="h-4 w-4 shrink-0 text-on-surface-variant" aria-hidden />
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="w-14 min-w-0 border-0 bg-transparent py-1 font-body text-body-sm text-on-surface outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div className="flex items-center px-3 font-body text-body-sm text-on-surface-variant">
        min
      </div>
    </div>
  );
}
