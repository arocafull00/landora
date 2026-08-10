"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { AnimatedWord } from "@/components/templates/pallet-ross/components/animated-word";
import { ChatBubble } from "@/components/templates/pallet-ross/components/chat-bubble";
import {
  PalletRossPrimaryButton,
  PalletRossSecondaryButton,
} from "@/components/templates/pallet-ross/components/pallet-ross-button";
import { PALLET_ROSS_COPY } from "@/components/templates/pallet-ross/pallet-ross-copy";

export function HeroSection() {
  const { hero } = PALLET_ROSS_COPY;
  const line1Words = useMemo(
    () => hero.line1.map((word, index) => ({ word, index })),
    [hero.line1],
  );
  const line2Words = useMemo(
    () =>
      hero.line2.map((word, index) => ({
        word,
        index: hero.line1.length + index,
      })),
    [hero.line1.length, hero.line2],
  );

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
    >
      <main
        className="mx-auto flex flex-col items-center text-center"
        style={{ paddingTop: 140 }}
      >
        <h1
          className="max-w-[1100px] font-heading text-[96px] font-extrabold leading-none text-[var(--site-text)]"
          style={{ letterSpacing: "-3px" }}
        >
          <span className="block">
            {line1Words.map(({ word, index }) => (
              <AnimatedWord key={word} word={word} index={index} />
            ))}
          </span>
          <span className="block">
            {line2Words.map(({ word, index }) => (
              <AnimatedWord key={word} word={word} index={index} />
            ))}
          </span>
        </h1>

        <div
          className="relative w-full"
          style={{ height: 260, marginTop: 40 }}
        >
          <ChatBubble
            label={hero.coplin}
            background="var(--site-accent-blue)"
            delay={3.05}
            positionStyle={{ left: "calc(50% - 320px)", top: -12 }}
            tailStyle={{
              bottom: -8,
              left: 16,
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: "10px solid var(--site-accent-blue)",
            }}
          />
          <ChatBubble
            label={hero.andrea}
            background="var(--site-accent-green)"
            delay={3.2}
            positionStyle={{ right: "calc(50% - 420px)", top: -20 }}
            tailStyle={{
              bottom: -8,
              right: 16,
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "10px solid var(--site-accent-green)",
            }}
          />
        </div>

        <motion.p
          className="max-w-[480px] font-body text-base font-normal leading-relaxed text-[var(--site-text-muted)]"
          style={{ marginTop: 48 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2, ease: "easeOut" }}
        >
          {hero.body}
        </motion.p>

        <motion.div
          className="flex flex-row"
          style={{ gap: 16, marginTop: 28, paddingBottom: 80 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4, ease: "easeOut" }}
        >
          <PalletRossPrimaryButton label={hero.primaryCta} />
          <PalletRossSecondaryButton label={hero.secondaryCta} />
        </motion.div>
      </main>
    </section>
  );
}
