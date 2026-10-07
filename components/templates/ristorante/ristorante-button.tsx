import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TONES = {
  tomato: "bg-ristorante-tomato text-ristorante-cream hover:bg-ristorante-olive",
  olive: "bg-ristorante-olive text-ristorante-cream hover:bg-ristorante-tomato",
  outline: "border-2 border-ristorante-olive bg-transparent text-ristorante-olive hover:bg-ristorante-paper",
};

export function RistoranteButton({ children, href, tone = "tomato", className }: { children: ReactNode; href: string; tone?: keyof typeof TONES; className?: string }) {
  return <Button asChild className={cn("h-auto rounded-full px-6 py-3.5 text-xs font-black tracking-[.12em] transition-[transform,background-color] duration-150 hover:-translate-y-1 focus-visible:ring-ristorante-olive", TONES[tone], className)}><a href={href}>{children}</a></Button>;
}
