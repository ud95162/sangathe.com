import { Petal } from "@/components/ui/Petal";
import { toneClasses } from "@/lib/tone";
import type { Tone } from "@/lib/types";

export function SectionTitle({
  children,
  tone = "flame",
  gap = "mr-3.5",
}: {
  children: React.ReactNode;
  tone?: Tone;
  gap?: string;
}) {
  return (
    <h2 className="font-serif text-2xl font-bold">
      <Petal className={`size-3 align-middle ${gap} ${toneClasses[tone].bg}`} />
      {children}
    </h2>
  );
}

/** Charcoal 3px top rule, petal + serif title, optional action on the right. */
export function SectionHeading({
  title,
  tone = "flame",
  action,
  alignBaseline = false,
}: {
  title: string;
  tone?: Tone;
  action?: React.ReactNode;
  alignBaseline?: boolean;
}) {
  return (
    <div
      className={`mb-5 flex justify-between gap-4 border-t-[3px] border-ink pt-3 ${
        alignBaseline ? "items-baseline" : "items-center"
      }`}
    >
      <SectionTitle tone={tone}>{title}</SectionTitle>
      {action}
    </div>
  );
}
