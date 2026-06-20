import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getBookingProgressLabel, PROGRESS_STEPS } from "@/lib/booking/progress-steps";
import { cn } from "@/lib/utils";
import type { BookingStep } from "@/stores/public-booking-store";

export function BookingStepProgress({
  step,
  stepIndex,
}: {
  step: BookingStep;
  stepIndex: number;
}) {
  if (step === "confirmation") {
    return null;
  }

  const progressValue = Math.min((stepIndex / (PROGRESS_STEPS.length - 1)) * 100, 100);
  const currentLabel = getBookingProgressLabel(step);

  return (
    <nav aria-label="Progreso de reserva" className="mb-6 space-y-4">
      <div className="lg:hidden">
        <p className="font-body text-body-sm text-on-surface-variant">
          Paso {stepIndex + 1} de {PROGRESS_STEPS.length} · {currentLabel}
        </p>
        <Progress value={progressValue} className="mt-2" aria-label={`Progreso: paso ${stepIndex + 1} de ${PROGRESS_STEPS.length}`} />
      </div>
      <ol className="hidden items-center gap-2 lg:flex">
        {PROGRESS_STEPS.map((item, index) => {
          const isComplete = stepIndex > index;
          const isCurrent = step === item.id;

          return (
            <li key={item.id} className="flex min-w-0 flex-1 items-center gap-2">
              <div
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-label-md font-medium transition-colors duration-150",
                  isComplete && "border-primary bg-primary text-on-primary",
                  isCurrent && !isComplete && "border-primary bg-primary-fixed text-primary-fixed-variant",
                  !isComplete && !isCurrent && "border-outline-variant bg-surface-container-lowest text-on-surface-variant",
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isComplete ? (
                  <Check className="size-3.5" aria-hidden />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "truncate font-body text-body-sm",
                  isCurrent ? "font-semibold text-on-surface" : "text-on-surface-variant",
                )}
              >
                {item.label}
              </span>
              {index < PROGRESS_STEPS.length - 1 ? (
                <div
                  className={cn(
                    "mx-1 h-px min-w-4 flex-1",
                    isComplete ? "bg-primary/40" : "bg-outline-variant",
                  )}
                  aria-hidden
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
