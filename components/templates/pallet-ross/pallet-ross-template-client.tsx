"use client";

import { BackgroundBlobs } from "@/components/templates/pallet-ross/components/background-blobs";
import { ClassSection } from "@/components/templates/pallet-ross/components/class-section";
import { EcommerceSection } from "@/components/templates/pallet-ross/components/ecommerce-section";
import { HeroSection } from "@/components/templates/pallet-ross/components/hero-section";
import { PalletRossContactSection } from "@/components/templates/pallet-ross/components/pallet-ross-contact-section";
import { PalletRossNav } from "@/components/templates/pallet-ross/components/pallet-ross-nav";
import { ScrollCardsOverlay } from "@/components/templates/pallet-ross/components/scroll-cards-overlay";
import { ScrollIndicator } from "@/components/templates/pallet-ross/components/scroll-indicator";
import { usePalletRossPage } from "@/components/templates/pallet-ross/hooks/use-pallet-ross-page";
import type { LandingContent } from "@/lib/dashboard-data";

export function PalletRossTemplateClient({
  content,
  copyrightYear,
  topOffset = 0,
}: {
  content: LandingContent;
  copyrightYear: number;
  topOffset?: number;
}) {
  const {
    containerRef,
    viewport,
    scrollYProgress,
    currentProgress,
    lockProgress,
    scrollableHeight,
    introDone,
    handleIntroComplete,
  } = usePalletRossPage();

  return (
    <div className="relative bg-[var(--site-surface)]">
      <BackgroundBlobs />
      <PalletRossNav topOffset={topOffset} />
      <ScrollIndicator />

      <ScrollCardsOverlay
        scrollYProgress={scrollYProgress}
        currentProgress={currentProgress}
        lockProgress={lockProgress}
        scrollableHeight={scrollableHeight}
        introDone={introDone}
        viewport={viewport}
        onIntroComplete={handleIntroComplete}
      />

      <div ref={containerRef} className="relative z-[1]">
        <HeroSection />
        <EcommerceSection />
        <ClassSection />
        <PalletRossContactSection
          content={content}
          copyrightYear={copyrightYear}
        />
      </div>
    </div>
  );
}
