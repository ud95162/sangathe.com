import type { Tone } from "@/lib/types";

/** Static class maps so Tailwind can see every class name. */
export const toneClasses: Record<
  Tone,
  { text: string; textOnDark: string; bg: string; border: string; stroke: string }
> = {
  flame: {
    text: "text-flame-text",
    textOnDark: "text-flame",
    bg: "bg-flame",
    border: "border-flame",
    stroke: "[-webkit-text-stroke-color:var(--color-flame)]",
  },
  sunset: {
    text: "text-sunset-text",
    textOnDark: "text-sunset",
    bg: "bg-sunset",
    border: "border-sunset",
    stroke: "[-webkit-text-stroke-color:var(--color-sunset)]",
  },
  golden: {
    text: "text-golden-text",
    textOnDark: "text-golden",
    bg: "bg-golden",
    border: "border-golden",
    stroke: "[-webkit-text-stroke-color:var(--color-golden)]",
  },
  leaf: {
    text: "text-leaf-text",
    textOnDark: "text-leaf",
    bg: "bg-leaf",
    border: "border-leaf",
    stroke: "[-webkit-text-stroke-color:var(--color-leaf)]",
  },
  charcoal: {
    text: "text-ink",
    textOnDark: "text-white",
    bg: "bg-ink",
    border: "border-ink",
    stroke: "[-webkit-text-stroke-color:var(--color-ink)]",
  },
};

export const toneCycle: Tone[] = ["flame", "sunset", "golden", "leaf"];
