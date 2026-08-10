"use client";

import { motion } from "framer-motion";
import { BannerCarousel } from "@/components/templates/pallet-ross/components/banner-carousel";
import { TagBubble } from "@/components/templates/pallet-ross/components/tag-bubble";
import { PALLET_ROSS_COPY } from "@/components/templates/pallet-ross/pallet-ross-copy";

export function ClassSection() {
  const { class: classCopy } = PALLET_ROSS_COPY;

  return (
    <section
      data-section="three"
      id="class"
      className="relative overflow-hidden bg-[var(--site-surface)]"
      style={{
        minHeight: "100vh",
        padding: "80px 64px",
      }}
    >
      <div
        className="relative z-10 mb-10 max-w-[520px]"
      >
        <motion.div
          className="mb-5 font-heading text-[11px] font-medium tracking-[2.5px] text-[var(--site-text-subtle)]"
          initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {classCopy.eyebrow}
        </motion.div>

        <h2
          className="m-0 font-heading text-[80px] font-extrabold leading-none tracking-[-2.5px] text-[var(--site-text)]"
        >
          {classCopy.words.map((word, index) => (
            <motion.span
              key={word}
              className="inline-block"
              style={{ marginRight: "0.2em" }}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.07,
              }}
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </div>

      <TagBubble
        label={classCopy.reatha}
        background="var(--site-text)"
        animateJelly
        delay={0.65}
        positionStyle={{ top: 120, right: 180, padding: "10px 22px" }}
        tailStyle={{
          bottom: -9,
          right: 24,
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "4px solid transparent",
          borderTop: "10px solid var(--site-text)",
        }}
      />

      <BannerCarousel />
    </section>
  );
}
