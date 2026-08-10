"use client";

import { motion } from "framer-motion";

const jellyScaleX = [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1];
const jellyScaleY = [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1];

export function ChatBubble({
  label,
  background,
  tailStyle,
  delay,
  positionStyle,
}: {
  label: string;
  background: string;
  tailStyle: React.CSSProperties;
  delay: number;
  positionStyle: React.CSSProperties;
}) {
  return (
    <motion.div
      className="absolute z-20 font-heading text-[15px] font-semibold text-white"
      style={{
        ...positionStyle,
        background,
        padding: "8px 18px",
        borderRadius: 9999,
      }}
      initial={{ opacity: 0, scaleX: 1, scaleY: 1 }}
      animate={{ opacity: 1, scaleX: jellyScaleX, scaleY: jellyScaleY }}
      transition={{ duration: 0.8, delay }}
    >
      {label}
      <span
        className="absolute"
        style={tailStyle}
        aria-hidden
      />
    </motion.div>
  );
}
