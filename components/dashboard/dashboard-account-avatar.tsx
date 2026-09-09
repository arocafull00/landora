"use client";

import Image from "next/image";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardAccountAvatar({
  imageUrl,
  className,
}: {
  imageUrl: string | undefined;
  className?: string;
}) {
  if (imageUrl) {
    return (
      <Image
        alt=""
        className={cn("size-8 shrink-0 rounded-full object-cover", className)}
        height={32}
        src={imageUrl}
        width={32}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary",
        className
      )}
    >
      <UserRound className="size-4" />
    </span>
  );
}
