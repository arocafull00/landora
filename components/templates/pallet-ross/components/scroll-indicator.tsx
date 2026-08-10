"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

export function ScrollIndicator() {
  const scrollByViewport = (direction: -1 | 1) => {
    window.scrollBy({
      top: direction * window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="fixed z-40 flex flex-col"
      style={{ right: 24, top: "50%", transform: "translateY(-50%)" }}
    >
      <ScrollIndicatorButton
        label="Scroll up"
        onClick={() => scrollByViewport(-1)}
      >
        <ChevronUp size={16} color="var(--site-text)" />
      </ScrollIndicatorButton>
      <ScrollIndicatorButton
        label="Scroll down"
        onClick={() => scrollByViewport(1)}
      >
        <ChevronDown size={16} color="var(--site-text)" />
      </ScrollIndicatorButton>
    </div>
  );
}

function ScrollIndicatorButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center border border-[rgba(0,0,0,0.15)] bg-transparent transition-colors hover:bg-[rgba(0,0,0,0.05)]"
      style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        borderWidth: 1.5,
      }}
    >
      {children}
    </button>
  );
}
