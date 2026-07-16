import { Check, Circle } from "lucide-react";

export function PasswordRequirement({
  label,
  met,
}: {
  label: string;
  met: boolean;
}) {
  return (
    <li className="flex items-center gap-1.5 font-body text-body-sm">
      {met ? (
        <Check aria-hidden className="size-4 text-success" />
      ) : (
        <Circle aria-hidden className="size-4 text-on-surface-variant/50" />
      )}
      <span
        className={
          met ? "text-on-surface-variant" : "text-on-surface-variant/50"
        }
      >
        {label}
      </span>
    </li>
  );
}
