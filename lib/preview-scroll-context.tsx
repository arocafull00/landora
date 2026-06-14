"use client";

import {
  createContext,
  use,
  useLayoutEffect,
  type ReactNode,
} from "react";

type PreviewScrollContextValue = {
  container: HTMLDivElement | null;
};

const PreviewScrollContext = createContext<PreviewScrollContextValue>({
  container: null,
});

const PREVIEW_SCROLL_CONTEXT_VALUE: PreviewScrollContextValue = {
  container: null,
};

export function PreviewScrollProvider({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyHeight = body.style.height;
    const prevBodyMinHeight = body.style.minHeight;

    html.style.overflow = "auto";
    html.style.height = "auto";
    body.style.overflow = "auto";
    body.style.height = "auto";
    body.style.minHeight = "auto";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      html.style.height = "";
      body.style.overflow = prevBodyOverflow;
      body.style.height = prevBodyHeight;
      body.style.minHeight = prevBodyMinHeight;
    };
  }, []);

  return (
    <PreviewScrollContext.Provider value={PREVIEW_SCROLL_CONTEXT_VALUE}>
      {children}
    </PreviewScrollContext.Provider>
  );
}

export function usePreviewScrollContainer() {
  return use(PreviewScrollContext).container;
}
