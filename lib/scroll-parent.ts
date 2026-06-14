function isScrollableOverflow(value: string) {
  return value === "auto" || value === "scroll" || value === "overlay";
}

function isScrollableElement(el: Element) {
  const { overflowY, overflow } = getComputedStyle(el);
  return isScrollableOverflow(overflowY) || isScrollableOverflow(overflow);
}

function getScrollParents(el: HTMLElement | null) {
  const targets: (Window | Element)[] = [window];
  let node = el?.parentElement;

  while (node) {
    if (isScrollableElement(node)) {
      targets.push(node);
    }
    node = node.parentElement;
  }

  return targets;
}

export function getScrollTargets(
  el: HTMLElement | null,
  explicitContainer?: HTMLElement | null
) {
  const targets = new Set<Window | Element>([window]);

  if (explicitContainer) {
    targets.add(explicitContainer);
  }

  for (const parent of getScrollParents(el)) {
    targets.add(parent);
  }

  return [...targets];
}
