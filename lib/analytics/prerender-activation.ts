declare global {
  interface Document {
    prerendering?: boolean;
    addEventListener(
      type: "prerenderingchange",
      listener: EventListener,
      options?: boolean | AddEventListenerOptions,
    ): void;
    removeEventListener(
      type: "prerenderingchange",
      listener: EventListener,
      options?: boolean | EventListenerOptions,
    ): void;
  }
}

export function runAfterActivation(callback: () => void) {
  if (!document.prerendering) {
    callback();
    return () => {};
  }

  const handleActivation = () => callback();
  document.addEventListener("prerenderingchange", handleActivation, {
    once: true,
  });
  return () =>
    document.removeEventListener("prerenderingchange", handleActivation);
}
