import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TONES = ["bg-tone-1", "bg-tone-2", "bg-tone-3", "bg-tone-4"] as const;

export function ProductTag({ label, index }: { label: string; index: number }) {
  return (
    <li>
      <Badge className={cn("px-4 py-2 text-xs font-semibold text-ink", TONES[index % TONES.length])}>{label}</Badge>
    </li>
  );
}
