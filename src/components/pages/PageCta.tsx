import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FlameStripe } from "@/components/ui/FlameStripe";

/** Dark closing band with a headline, a line of text and one or two buttons. */
export function PageCta({
  title,
  text,
  links,
}: {
  title: string;
  text: string;
  links: { label: string; href: string }[];
}) {
  return (
    <section className="bg-charcoal bg-[radial-gradient(120%_90%_at_0%_100%,rgb(249_115_22/0.3)_0%,rgb(225_29_46/0.16)_40%,rgb(31_41_55/0)_72%)] text-white">
      <Container className="flex flex-col items-start gap-5 py-14 sm:py-16">
        <FlameStripe className="h-1 w-24" />
        <h2 className="max-w-2xl font-serif text-[28px] font-bold leading-[1.45] sm:text-4xl">{title}</h2>
        <p className="max-w-2xl text-[17px] leading-[1.8] text-silver">{text}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex min-h-12 items-center rounded-full px-7 text-[15px] hover:text-white ${
                i === 0 ? "bg-flame font-bold text-white" : "glass font-semibold"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
