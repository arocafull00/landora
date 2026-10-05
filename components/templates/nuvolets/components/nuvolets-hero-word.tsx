import type { CSSProperties } from "react";

export function NuvoletsHeroWord({ word, index }: { word: string; index: number }) {
  if (/^\s+$/.test(word)) return word;
  return <span className="nuvolets-word-mask"><span className="nuvolets-word" style={{ "--i": index } as CSSProperties}>{word}</span></span>;
}
