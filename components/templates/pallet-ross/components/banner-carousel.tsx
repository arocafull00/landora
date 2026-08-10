"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBannerSlideshow } from "@/components/templates/pallet-ross/hooks/use-banner-slideshow";
import { PALLET_ROSS_BANNER_IMAGES } from "@/lib/pallet-ross-assets";
import { PALLET_ROSS_COPY } from "@/components/templates/pallet-ross/pallet-ross-copy";

export function BannerCarousel() {
  const { activeSlide, goToSlide, goToPrevious, goToNext } = useBannerSlideshow(
    PALLET_ROSS_BANNER_IMAGES.length,
  );

  return (
    <motion.div
      className="relative w-full overflow-hidden bg-[var(--site-text)]"
      style={{ borderRadius: 24, height: 600 }}
      initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
    >
      {PALLET_ROSS_BANNER_IMAGES.map((src, index) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          animate={{
            opacity: index === activeSlide ? 1 : 0,
            scale: index === activeSlide ? 1 : 1.04,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`Banner slide ${index + 1}`}
            className="h-full w-full object-cover object-top"
          />
        </motion.div>
      ))}

      <div
        className="absolute z-10 flex flex-row"
        style={{ top: 24, right: 24, gap: 5 }}
      >
        {PALLET_ROSS_BANNER_IMAGES.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToSlide(index)}
            className="cursor-pointer border-none p-0 transition-all duration-300 ease-in-out"
            style={{
              height: 6,
              width: index === activeSlide ? 18 : 6,
              borderRadius: 9999,
              background:
                index === activeSlide
                  ? "rgba(255,255,255,0.95)"
                  : "rgba(255,255,255,0.45)",
            }}
          />
        ))}
      </div>

      <div
        className="absolute z-10 inline-block"
        style={{ bottom: 28, left: 28 }}
      >
        <PulsingRing inset={-8} borderColor="rgba(255,255,255,0.40)" delay={0} />
        <PulsingRing inset={-4} borderColor="rgba(255,255,255,0.25)" delay={0.5} />
        <motion.button
          type="button"
          className="relative z-[2] flex cursor-pointer items-center border-none bg-white font-heading text-[15px] font-semibold text-[var(--site-text)]"
          style={{
            padding: "12px 28px",
            borderRadius: 9999,
            gap: 8,
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {PALLET_ROSS_COPY.class.watch}
        </motion.button>
      </div>

      <div
        className="absolute z-10 flex flex-row"
        style={{ bottom: 28, right: 28, gap: 10 }}
      >
        <BannerNavButton label="Previous slide" onClick={goToPrevious}>
          <ChevronLeft size={20} color="var(--site-text)" />
        </BannerNavButton>
        <BannerNavButton label="Next slide" onClick={goToNext}>
          <ChevronRight size={20} color="var(--site-text)" />
        </BannerNavButton>
      </div>
    </motion.div>
  );
}

function PulsingRing({
  inset,
  borderColor,
  delay,
}: {
  inset: number;
  borderColor: string;
  delay: number;
}) {
  return (
    <motion.span
      className="pointer-events-none absolute rounded-full"
      style={{
        inset,
        border: `2px solid ${borderColor}`,
      }}
      animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
        delay,
      }}
      aria-hidden
    />
  );
}

function BannerNavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center border-none"
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.90)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      }}
      whileHover={{ scale: 1.08, backgroundColor: "#FFFFFF" }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
}
