const EDITOR_FOCUS_ELEMENT_EVENT = "landora:editor-focus-element";

export function dispatchEditorFocusElement(editorId: string | null) {
  window.dispatchEvent(
    new CustomEvent(EDITOR_FOCUS_ELEMENT_EVENT, { detail: { editorId } }),
  );
}

export function addEditorFocusElementListener(
  handler: (editorId: string | null) => void,
): () => void {
  const listener = (event: Event) => {
    handler((event as CustomEvent<{ editorId: string | null }>).detail.editorId);
  };
  window.addEventListener(EDITOR_FOCUS_ELEMENT_EVENT, listener);
  return () => window.removeEventListener(EDITOR_FOCUS_ELEMENT_EVENT, listener);
}
