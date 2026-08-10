"use client";

import { motion } from "framer-motion";

export function AnimatedWord({
  word,
  index,
  delayMultiplier = 0.08,
  className,
}: {
  word: string;
  index: number;
  delayMultiplier?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block", marginRight: "0.25em" }}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * delayMultiplier,
      }}
    >
      {word}
    </motion.span>
  );
}
