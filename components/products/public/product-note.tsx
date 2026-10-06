import type { ReactNode } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import { CollapsibleTrigger } from "@/components/ui/collapsible-trigger";
import { CollapsibleContent } from "@/components/ui/collapsible-content";

export function ProductNote({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <Collapsible defaultOpen>
      <h2>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="group h-auto w-full justify-start gap-4 rounded-sm p-0 py-1 text-left text-ink hover:bg-transparent hover:text-ink">
            <Icon aria-hidden className="size-6" />
            <span className="flex-1 font-headline text-2xl font-normal">{title}</span>
            <ChevronDown aria-hidden className="size-5 transition-transform duration-200 group-data-[state=closed]:-rotate-90 motion-reduce:transition-none" />
          </Button>
        </CollapsibleTrigger>
      </h2>
      <CollapsibleContent className="mt-4 text-pretty text-base leading-7 text-ink-secondary">{children}</CollapsibleContent>
    </Collapsible>
  );
}
