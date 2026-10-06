"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export const CatalogNavigationContext = createContext<((href: string) => boolean) | null>(null);

export function useCatalogNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const navigation = useRef<{ current: string | null; previous: string | null }>({ current: null, previous: null });

  useEffect(() => {
    const current = window.location.pathname;
    if (navigation.current.current === current) return;
    navigation.current = { current, previous: navigation.current.current };
  }, [pathname]);

  return useCallback((href: string) => {
    const catalogPath = new URL(href, window.location.href).pathname;
    if (navigation.current.current !== window.location.pathname || navigation.current.previous !== catalogPath) return false;
    router.back();
    return true;
  }, [router]);
}

export function useCatalogReturn(catalogHref: string) {
  const returnToCatalog = useContext(CatalogNavigationContext);

  return (event: { preventDefault: () => void }) => {
    if (returnToCatalog?.(catalogHref)) event.preventDefault();
  };
}
