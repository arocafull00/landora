import type { WorkflowStep } from "@/lib/dashboard-data";

export function WorkflowStepCard({ step, total }: { step: WorkflowStep; total: number }) {
  return (
    <div className="relative flex flex-col items-start">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#213138] bg-[#f5f0ea]">
        <span className="font-headline text-lg font-bold text-[#213138]">
          {step.number}
        </span>
      </div>
      {parseInt(step.number) < total ? (
        <div className="absolute left-6 top-12 hidden h-full w-px bg-[#213138]/20 md:block" />
      ) : null}
      <h3 className="mt-4 font-headline text-base font-bold uppercase tracking-wide text-[#171717]">
        {step.title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-[#171717]/65">
        {step.description}
      </p>
    </div>
  );
}
