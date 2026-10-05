import { NuvoletsCloud } from "./nuvolets-cloud";

const tones = ["blue", "pink", "yellow", "sage", "blue"];

export function NuvoletsMarqueeItem({ text, index }: { text: string; index: number }) {
  return <li data-tone={tones[index % tones.length]} className="nuvolets-title flex items-center gap-8 whitespace-nowrap text-2xl md:gap-12 md:text-3xl">{text}<NuvoletsCloud className="nuvolets-tone-text w-10 shrink-0 md:w-12" /></li>;
}
