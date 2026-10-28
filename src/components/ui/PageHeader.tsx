import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { Petal } from "@/components/ui/Petal";

/** Breadcrumb, petal + serif title and a short line under it, closed by the heavy rule. */
export function PageHeader({
  breadcrumb,
  title,
  subtitle,
}: {
  breadcrumb: { name: string; href?: string }[];
  title: string;
  subtitle?: string;
}) {
  return (
    <Container as="section" className="pt-8">
      <Breadcrumb items={breadcrumb} />
      <div className="mt-3.5 flex flex-col gap-2 border-b-[3px] border-ink pb-5">
        <h1 className="flex items-center gap-[18px] font-serif text-[32px] font-bold leading-[1.3] sm:text-5xl">
          <Petal className="size-5 shrink-0 bg-flame" />
          {title}
        </h1>
        {subtitle && <p className="text-[17px] text-ink-2">{subtitle}</p>}
      </div>
    </Container>
  );
}
