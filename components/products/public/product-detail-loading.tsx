import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const COPY = { loading: "Cargando producto", skip: "Saltar al contenido" } as const;

export function ProductDetailLoading({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <div className={cn("bg-catalog-canvas text-ink", withHeader && "min-h-screen")} role="status" aria-busy="true">
      {withHeader ? <a href="#product-loading-main" className="sr-only focus:not-sr-only focus:block focus:p-4">{COPY.skip}</a> : null}
      <span className="sr-only">{COPY.loading}</span>
      <div id="product-loading-main" tabIndex={-1}>
        <div aria-hidden="true">
          {withHeader ? (
            <>
              <div className="mx-auto flex min-h-[74px] max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <Skeleton className="h-9 w-36 bg-border-subtle motion-reduce:animate-none" />
                <Skeleton className="order-last h-5 w-full bg-border-subtle motion-reduce:animate-none sm:order-none sm:w-44" />
                <Skeleton className="h-10 w-28 rounded-full bg-border-subtle motion-reduce:animate-none" />
              </div>
              <Separator className="bg-border-subtle" />
            </>
          ) : null}
          <div className="mx-auto max-w-7xl px-5 pt-8 md:px-8">
            <Skeleton className="h-5 w-36 bg-border-subtle motion-reduce:animate-none" />
            <div className="grid items-start gap-8 pb-20 pt-6 lg:grid-cols-[1.15fr_.85fr] lg:gap-12 lg:pb-28 lg:pt-10 xl:gap-16">
              <Skeleton className="mx-auto aspect-[3/2] w-full rounded-2xl bg-border-subtle motion-reduce:animate-none" />
              <div className="space-y-6 lg:py-2">
                <Skeleton className="h-4 w-24 bg-border-subtle motion-reduce:animate-none" />
                <Skeleton className="h-14 w-4/5 bg-border-subtle motion-reduce:animate-none" />
                <Skeleton className="h-5 w-3/5 bg-border-subtle motion-reduce:animate-none" />
                <Skeleton className="h-9 w-28 bg-border-subtle motion-reduce:animate-none" />
                <Separator className="bg-border-subtle" />
                <Skeleton className="h-4 w-20 bg-border-subtle motion-reduce:animate-none" />
                <Skeleton className="h-11 w-2/3 rounded-full bg-border-subtle motion-reduce:animate-none" />
                <Skeleton className="h-12 w-full rounded-full bg-border-subtle motion-reduce:animate-none" />
                <Skeleton className="h-12 w-full rounded-full bg-border-subtle motion-reduce:animate-none" />
                <Separator className="bg-border-subtle" />
                <Skeleton className="h-20 w-full bg-border-subtle motion-reduce:animate-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
