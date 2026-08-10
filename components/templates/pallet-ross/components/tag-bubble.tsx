"use client";

import { motion } from "framer-motion";

const jellyScaleX = [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1];
const jellyScaleY = [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1];

export function TagBubble({
  label,
  background,
  tailStyle,
  positionStyle,
  delay = 0,
  animateJelly = false,
}: {
  label: string;
  background: string;
  tailStyle: React.CSSProperties;
  positionStyle: React.CSSProperties;
  delay?: number;
  animateJelly?: boolean;
}) {
  if (animateJelly) {
    return (
      <motion.div
        className="absolute z-20 font-heading font-semibold text-white text-site-content"
        style={{
          ...positionStyle,
          background,
          padding: "9px 20px",
          borderRadius: 9999,
        }}
        initial={{ opacity: 0, scaleX: 1, scaleY: 1 }}
        whileInView={{ opacity: 1, scaleX: jellyScaleX, scaleY: jellyScaleY }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
      >
        {label}
        <span className="absolute" style={tailStyle} aria-hidden />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute z-20 font-heading font-semibold text-white text-site-content"
      style={{
        ...positionStyle,
        background,
        padding: "9px 20px",
        borderRadius: 9999,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {label}
      <span className="absolute" style={tailStyle} aria-hidden />
    </motion.div>
  );
}
