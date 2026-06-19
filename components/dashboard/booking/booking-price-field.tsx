import { cn } from "@/lib/utils";

export function BookingPriceField({
  id,
  value,
  onChange,
  disabled,
  placeholder = "15,00",
  className,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-9 overflow-hidden rounded-md border border-input bg-transparent shadow-xs focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
        className,
      )}
    >
      <div className="flex items-center border-r border-input px-3 font-body text-body-sm text-on-surface-variant">
        €
      </div>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 border-0 bg-transparent px-3 py-1 font-body text-body-sm text-on-surface outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
