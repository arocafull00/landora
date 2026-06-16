"use client";

import Image from "next/image";
import { FLORISTERIA_ASSETS } from "@/lib/floristeria-assets";

export function FloristeriaHeroFooter() {
  return (
    <div className="relative z-[1] w-full min-w-full bg-[#FAFAF7]">
      <Image
        alt="Césped y hierbas"
        className="block h-auto w-full min-w-full max-w-none"
        height={160}
        src={FLORISTERIA_ASSETS.heroGrass}
        unoptimized
        width={1920}
      />
    </div>
  );
}
