"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { VelarAosInit } from "@/components/templates/velar/velar-aos-init";
import { VelarNav } from "@/components/templates/velar/velar-nav";
import { VelarHero } from "@/components/templates/velar/velar-hero";
import {
  VelarHouseAnimation,
  type VelarHouseAnimationHandle,
} from "@/components/templates/velar/velar-house-animation";
import { VelarStatementSection } from "@/components/templates/velar/velar-statement-section";
import { VelarGallerySection } from "@/components/templates/velar/velar-gallery-section";
import { VelarSpacesSection } from "@/components/templates/velar/velar-spaces-section";
import { VelarServicesSection } from "@/components/templates/velar/velar-services-section";
import { VelarWorkflowSection } from "@/components/templates/velar/velar-workflow-section";
import { VelarTestimonialsSection } from "@/components/templates/velar/velar-testimonials-section";
import { VelarContactSection } from "@/components/templates/velar/velar-contact-section";

const GRASS_GREEN = "#213138";

const smoothstep = (t: number) => t * t * (3 - 2 * t);

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

function isOverlappingTop(el: HTMLElement | null) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom > 0;
}

function getScrollTargets(el: HTMLElement | null) {
  const targets: (Window | Element)[] = [window];
  let node = el?.parentElement;

  while (node) {
    const { overflowY, overflow } = getComputedStyle(node);
    if (
      overflowY === "auto" ||
      overflowY === "scroll" ||
      overflow === "auto" ||
      overflow === "scroll"
    ) {
      targets.push(node);
    }
    node = node.parentElement;
  }

  return targets;
}

export function VelarTemplate({
  content,
  topOffset = 0,
}: {
  content: LandingContent;
  topOffset?: number;
}) {
  const [navColor, setNavColor] = useState(GRASS_GREEN);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTransform, setScrollTransform] = useState("");
  const [houseVisible, setHouseVisible] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const houseRef = useRef<VelarHouseAnimationHandle>(null);

  const updateHousePosition = useCallback(() => {
    const heroEl = heroRef.current;
    const darkEl = darkRef.current;
    const imgEl = houseRef.current?.imgRef.current;

    if (!heroEl || !darkEl || !imgEl) return;

    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const heroRect = heroEl.getBoundingClientRect();
    const darkRect = darkEl.getBoundingClientRect();
    const heroH = heroEl.offsetHeight;
    const imgH = imgEl.offsetHeight;
    const baseW = vw < 1024 ? vw : Math.max(vw, 1400);

    const triggerPoint = -(heroH * 0.3);
    const endPoint = heroRect.top - (darkRect.bottom - vh);
    const denominator = endPoint - triggerPoint;
    const progress =
      denominator === 0
        ? 0
        : clamp((heroRect.top - triggerPoint) / denominator, 0, 1);
    const t = smoothstep(smoothstep(progress));

    setHouseVisible(progress < 1);

    if (progress <= 0) {
      setIsScrolling(false);
      return;
    }

    const startX = (vw - baseW) / 2;
    const startY = vh - imgH;
    const finalScale = 1.45;
    const finalX = (vw - baseW * finalScale) / 2;
    const mobileOffset = vw < 1024 ? -250 : 4;
    const finalY = darkRect.bottom - imgH * finalScale + 500 + mobileOffset;

    const currentX = startX + (finalX - startX) * t;
    const currentY = startY + (finalY - startY) * t;
    const currentScale = 1 + (finalScale - 1) * t;

    setIsScrolling(true);
    setScrollTransform(
      `translate(${currentX}px, ${currentY}px) scale(${currentScale})`
    );
  }, []);

  const updateNavColor = useCallback(() => {
    const onDark =
      isOverlappingTop(darkRef.current) ||
      isOverlappingTop(galleryRef.current) ||
      isOverlappingTop(workflowRef.current) ||
      isOverlappingTop(footerRef.current);
    setNavColor(onDark ? "#ffffff" : GRASS_GREEN);
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      updateHousePosition();
      updateNavColor();
    };

    handleUpdate();

    const scrollTargets = getScrollTargets(rootRef.current);
    for (const target of scrollTargets) {
      target.addEventListener("scroll", handleUpdate, { passive: true });
    }
    window.addEventListener("resize", handleUpdate);

    return () => {
      for (const target of scrollTargets) {
        target.removeEventListener("scroll", handleUpdate);
      }
      window.removeEventListener("resize", handleUpdate);
    };
  }, [updateHousePosition, updateNavColor]);

  return (
    <div
      ref={rootRef}
      className="relative"
      style={{ backgroundColor: "#f5f0ea", overflowX: "clip" }}
    >
      <VelarAosInit rootRef={rootRef} />

      <VelarNav
        brand={content.brand || "Velar."}
        navColor={navColor}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        navLinks={content.nav}
        topOffset={topOffset}
      />

      <VelarHero content={content} heroRef={heroRef} heroVisible />

      {content.hero.houseImage && (
        <VelarHouseAnimation
          ref={houseRef}
          houseImage={content.hero.houseImage}
          isScrolling={isScrolling}
          scrollTransform={scrollTransform}
          visible={houseVisible}
          onImageLoad={updateHousePosition}
        />
      )}

      <VelarStatementSection content={content} sectionRef={darkRef} />

      <div ref={galleryRef}>
        <VelarGallerySection content={content} />
      </div>

      <VelarSpacesSection content={content} />

      <VelarServicesSection content={content} />

      <div ref={workflowRef}>
        <VelarWorkflowSection content={content} />
      </div>

      <VelarTestimonialsSection content={content} />

      <div ref={footerRef}>
        <VelarContactSection content={content} />
      </div>
    </div>
  );
}
