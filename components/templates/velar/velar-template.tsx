"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { VelarPreloader } from "@/components/templates/velar/velar-preloader";
import { VelarNav } from "@/components/templates/velar/velar-nav";
import { VelarHero } from "@/components/templates/velar/velar-hero";
import { VelarHouseAnimation } from "@/components/templates/velar/velar-house-animation";
import { VelarStatementSection } from "@/components/templates/velar/velar-statement-section";
import { VelarGallerySection } from "@/components/templates/velar/velar-gallery-section";
import { VelarContactSection } from "@/components/templates/velar/velar-contact-section";

const GRASS_GREEN = "#213138";

function isOverlappingTop(el: HTMLElement | null) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom > 0;
}

export function VelarTemplate({ content }: { content: LandingContent }) {
  const [lifting, setLifting] = useState(false);
  const [liftDone, setLiftDone] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [navColor, setNavColor] = useState(GRASS_GREEN);
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);

  const handleNavScroll = useCallback(() => {
    const darkEl = darkRef.current;
    const onDark = isOverlappingTop(darkEl);
    setNavColor(onDark ? "#ffffff" : GRASS_GREEN);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleNavScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleNavScroll);
  }, [handleNavScroll]);

  const handleLift = useCallback(() => setLifting(true), []);
  const handleHeroReveal = useCallback(() => setHeroVisible(true), []);
  const handleDone = useCallback(() => setLiftDone(true), []);

  return (
    <div
      className="relative"
      style={{ backgroundColor: "#f5f0ea", overflowX: "clip" }}
    >
      <VelarPreloader
        onLift={handleLift}
        onHeroReveal={handleHeroReveal}
        onDone={handleDone}
      />

      <VelarNav
        brand={content.brand || "Velar."}
        navColor={navColor}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        navLinks={content.nav}
      />

      {content.hero.houseImage && (
        <VelarHouseAnimation
          houseImage={content.hero.houseImage}
          lifting={lifting}
          liftDone={liftDone}
          heroRef={heroRef}
          darkRef={darkRef}
        />
      )}

      <VelarHero
        content={content}
        heroRef={heroRef}
        heroVisible={heroVisible}
      />

      <VelarStatementSection content={content} sectionRef={darkRef} />

      <VelarGallerySection content={content} />

      <VelarContactSection content={content} />
    </div>
  );
}
