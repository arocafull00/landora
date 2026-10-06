import { Suspense, type ReactNode } from "react";
import { CatalogNavigationProvider } from "@/components/products/public/catalog-navigation-provider";
import { PublicLandingLoading } from "@/components/templates/public-landing-loading";

export default function PublicCatalogLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PublicLandingLoading />}><CatalogNavigationProvider>{children}</CatalogNavigationProvider></Suspense>;
}
