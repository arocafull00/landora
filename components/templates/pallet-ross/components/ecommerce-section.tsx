"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  PalletRossPrimaryButton,
  PalletRossSecondaryButton,
} from "@/components/templates/pallet-ross/components/pallet-ross-button";
import { TagBubble } from "@/components/templates/pallet-ross/components/tag-bubble";
import { PALLET_ROSS_COPY } from "@/components/templates/pallet-ross/pallet-ross-copy";

export function EcommerceSection() {
  const { ecommerce } = PALLET_ROSS_COPY;

  const headlineWords = useMemo(() => {
    const lines = [ecommerce.line1, ecommerce.line2, ecommerce.line3] as const;
    let index = 0;
    return lines.flatMap((line, lineIndex) =>
      line.map((word) => ({
        word,
        lineIndex,
        index: index++,
      })),
    );
  }, [ecommerce.line1, ecommerce.line2, ecommerce.line3]);

  return (
    <section
      data-section="two"
      id="ecommerce"
      className="relative flex items-start overflow-hidden bg-[var(--site-surface)]"
      style={{
        minHeight: "calc(100vh - 30px)",
        padding: "80px 64px 0",
      }}
    >
      <div style={{ width: 520, paddingTop: 32 }}>
        <motion.div
          className="mb-5 font-heading font-medium tracking-[2.5px] text-[var(--site-text-subtle)] text-site-content"
          initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {ecommerce.eyebrow}
        </motion.div>

        <h2 className="m-0 font-heading font-extrabold leading-[1.05] tracking-[-1.5px] text-site-title">
          {[0, 1, 2].map((lineIndex) => (
            <span
              key={lineIndex}
              className={
                lineIndex === 1
                  ? "block text-[var(--site-accent-red)]"
                  : "block text-[var(--site-text)]"
              }
            >
              {headlineWords
                .filter((entry) => entry.lineIndex === lineIndex)
                .map(({ word, index }) => (
                  <motion.span
                    key={`${lineIndex}-${word}`}
                    className="inline-block"
                    style={{ marginRight: "0.25em" }}
                    initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: index * 0.06,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
            </span>
          ))}
        </h2>

        <motion.p
          className="mt-7 max-w-[340px] font-body font-normal leading-[1.65] text-[var(--site-text-muted)] text-site-content"
          initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        >
          {ecommerce.body}
        </motion.p>

        <motion.div
          className="mt-12 flex flex-row"
          style={{ gap: 12 }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
        >
          <PalletRossPrimaryButton label={PALLET_ROSS_COPY.hero.primaryCta} />
          <PalletRossSecondaryButton
            label={PALLET_ROSS_COPY.hero.secondaryCta}
            outlined
          />
        </motion.div>
      </div>

      <TagBubble
        label={ecommerce.howard}
        background="var(--site-accent-red)"
        positionStyle={{ top: 260, left: "calc(40% + 340px)" }}
        tailStyle={{
          bottom: -9,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "10px solid var(--site-accent-red)",
        }}
      />
      <TagBubble
        label={ecommerce.robin}
        background="var(--site-text)"
        delay={0.15}
        positionStyle={{ top: 430, left: "calc(40% + 680px)" }}
        tailStyle={{
          bottom: -9,
          left: 20,
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "10px solid var(--site-text)",
        }}
      />
    </section>
  );
}
