"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";

const RESET_MS = 2000;

type CopyMorphButtonProps = {
  value: string | (() => string | Promise<string>);
  label: string;
  successMessage: string;
  errorMessage: string;
  showLabel?: boolean;
  className?: string;
  id?: string;
};

export function CopyMorphButton({
  value,
  label,
  successMessage,
  errorMessage,
  showLabel = true,
  className,
  id,
}: CopyMorphButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (!timeoutRef.current) return;
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      const text = typeof value === "function" ? await value() : value;
      await navigator.clipboard.writeText(text);
    } catch {
      toast.error(errorMessage);
      return;
    }

    setCopied(true);
    toast.success(successMessage);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCopied(false);
      timeoutRef.current = null;
    }, RESET_MS);
  };

  return (
    <button
      type="button"
      id={id}
      aria-label={copied ? successMessage : label}
      onClick={handleCopy}
      className={cn(
        "relative inline-flex h-9 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface transition-[colors,transform] duration-150 hover:bg-surface-container-high hover:scale-[1.02] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        showLabel ? "px-3" : "size-8 px-0",
        className,
      )}
    >
      <span className="relative size-4 shrink-0" aria-hidden>
        <Copy
          className={cn(
            "absolute inset-0 size-4 transition-[opacity,transform] duration-200 ease-out",
            copied ? "scale-50 opacity-0" : "scale-100 opacity-100",
          )}
        />
        <Check
          className={cn(
            "absolute inset-0 size-4 text-success transition-[opacity,transform] duration-200 ease-out",
            copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        />
      </span>
      {showLabel ? (
        <span className="ml-2.5 font-label text-label-md font-medium tracking-tight">
          {label}
        </span>
      ) : null}
    </button>
  );
}
